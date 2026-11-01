import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://uxwbbaeupemihonwyszu.supabase.co";
const SUPABASE_KEY = "sb_publishable_6A3yVOK07l0h6bmdjZ0U3A_CjzobvMX";
const TABLE = "yunarunes_player_data";
const STORAGE = {
  favorites: "yunarunes-favorites",
  teams: "yunarunes-saved-teams",
  decks: "yunarunes-decks"
};

// Dados pessoais que já eram guardados no navegador e agora também ficam
// associados à conta. Não incluir chaves internas de autenticação do Supabase.
const PLAYER_STATE_KEYS = [
  "yunarunes-language",
  "yunarunes-monster-progress-v1",
  "yunarunes-rune-calculator",
  "yunarunes-inventory",
  "yunarunes-selected-build",
  "yunarunes_monster",
  "yunarunes_set",
  "yunarunes-history",
  ...Array.from({ length: 6 }, (_, i) => "yunarunes_slot_" + (i + 1))
];
const PLAYER_STATE_KEY_SET = new Set(PLAYER_STATE_KEYS);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

let syncing = false;
const timers = new Map();
const originalSetItem = Storage.prototype.setItem;
const originalRemoveItem = Storage.prototype.removeItem;

function readLocal(key) {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE[key]) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeLocal(key, value) {
  try {
    originalSetItem.call(localStorage, STORAGE[key], JSON.stringify(Array.isArray(value) ? value : []));
  } catch (error) {
    console.warn("YunaRunes: não foi possível atualizar o armazenamento local.", error);
  }
}

function readPlayerState() {
  const result = [];
  for (const key of PLAYER_STATE_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null) result.push({ key, value });
  }
  return result;
}

function restorePlayerState(payload) {
  const values = new Map(
    (Array.isArray(payload) ? payload : [])
      .filter(item => item && PLAYER_STATE_KEY_SET.has(item.key) && typeof item.value === "string")
      .map(item => [item.key, item.value])
  );

  for (const key of PLAYER_STATE_KEYS) {
    if (values.has(key)) originalSetItem.call(localStorage, key, values.get(key));
    else originalRemoveItem.call(localStorage, key);
  }
}

async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user || null;
}

async function upsertRow(user, dataKey, payload) {
  const { error } = await supabase.from(TABLE).upsert({
    user_id: user.id,
    data_key: dataKey,
    payload,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id,data_key" });
  if (error) throw error;
}

async function saveKey(key, payload) {
  if (syncing) return;
  const user = await currentUser();
  if (!user) return;
  await upsertRow(user, key, Array.isArray(payload) ? payload : []);
}

async function savePlayerState() {
  if (syncing) return;
  const user = await currentUser();
  if (!user) return;
  await upsertRow(user, "player_state", readPlayerState());
}

async function syncAll() {
  if (syncing) return;
  const user = await currentUser();
  if (!user) return;

  syncing = true;
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data_key,payload")
      .eq("user_id", user.id);
    if (error) throw error;

    // A nuvem é a fonte principal quando já existe um registo.
    // Os dados locais são migrados apenas na primeira sincronização daquela chave.
    for (const key of Object.keys(STORAGE)) {
      const row = data?.find(item => item.data_key === key);
      if (row) {
        writeLocal(key, row.payload);
      } else {
        await upsertRow(user, key, readLocal(key));
      }
    }

    const stateRow = data?.find(item => item.data_key === "player_state");
    if (stateRow) {
      restorePlayerState(stateRow.payload);
    } else {
      await upsertRow(user, "player_state", readPlayerState());
    }

    window.dispatchEvent(new CustomEvent("yunarunes-cloud-sync"));
  } finally {
    syncing = false;
  }
}

function scheduleSave(kind) {
  if (syncing) return;
  if (timers.has(kind)) clearTimeout(timers.get(kind));
  const timer = setTimeout(async () => {
    timers.delete(kind);
    try {
      if (kind === "player_state") await savePlayerState();
      else await saveKey(kind, readLocal(kind));
    } catch (error) {
      console.warn("YunaRunes: falha ao sincronizar " + kind + ".", error?.message || error);
      window.dispatchEvent(new CustomEvent("yunarunes-cloud-error", {
        detail: { key: kind, message: error?.message || "Erro de sincronização" }
      }));
    }
  }, 450);
  timers.set(kind, timer);
}

function watchedKey(key) {
  const storageEntry = Object.entries(STORAGE).find(([, value]) => value === key);
  if (storageEntry) return storageEntry[0];
  if (PLAYER_STATE_KEY_SET.has(key)) return "player_state";
  return null;
}

Storage.prototype.setItem = function(key, value) {
  originalSetItem.call(this, key, value);
  if (this === localStorage && !syncing) {
    const kind = watchedKey(String(key));
    if (kind) scheduleSave(kind);
  }
};

Storage.prototype.removeItem = function(key) {
  originalRemoveItem.call(this, key);
  if (this === localStorage && !syncing) {
    const kind = watchedKey(String(key));
    if (kind) scheduleSave(kind);
  }
};

window.addEventListener("storage", event => {
  if (!event.key) return;
  const kind = watchedKey(event.key);
  if (kind) scheduleSave(kind);
});

async function saveTeam(monsters) {
  const user = await currentUser();
  if (!user) throw new Error("Inicia sessão na tua conta YunaRunes para guardar equipas.");
  const teams = readLocal("teams");
  const team = {
    id: crypto.randomUUID(),
    monsters: Array.isArray(monsters) ? monsters : [],
    saved_at: new Date().toISOString()
  };
  teams.unshift(team);
  writeLocal("teams", teams.slice(0, 100));
  await saveKey("teams", readLocal("teams"));
  return team;
}

async function removeTeam(id) {
  const teams = readLocal("teams").filter(team => team.id !== id);
  writeLocal("teams", teams);
  await saveKey("teams", teams);
}

window.YunaRunesCloud = {
  client: supabase,
  syncAll,
  currentUser,
  saveTeam,
  removeTeam,
  savePlayerState,
  getFavorites: () => readLocal("favorites"),
  getTeams: () => readLocal("teams"),
  getDecks: () => readLocal("decks"),
  getPlayerState: readPlayerState
};

window.YunaRunesCloudReady = (async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await syncAll();

  supabase.auth.onAuthStateChange((event, sessionNow) => {
    if (sessionNow && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED")) {
      setTimeout(() => syncAll().catch(error => {
        console.warn("YunaRunes: sincronização após autenticação falhou.", error?.message || error);
      }), 0);
    }
  });
  return window.YunaRunesCloud;
})();
