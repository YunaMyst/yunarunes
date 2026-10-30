import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://uxwbbaeupemihonwyszu.supabase.co";
const SUPABASE_KEY = "sb_publishable_6A3yVOK07l0h6bmdjZ0U3A_CjzobvMX";
const TABLE = "yunarunes_player_data";
const STORAGE = { favorites: "yunarunes-favorites", teams: "yunarunes-saved-teams", decks: "yunarunes-decks" };
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
let syncing = false;
let timer = null;

function readLocal(key) {
  try { const value = JSON.parse(localStorage.getItem(STORAGE[key]) || "[]"); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
function writeLocal(key, value) {
  try { originalSetItem.call(localStorage, STORAGE[key], JSON.stringify(value)); } catch {}
}
function merge(local, remote, key) {
  const result = [], seen = new Set();
  for (const item of [...(remote || []), ...(local || [])]) {
    const id = typeof item === "string" ? item : (item?.id || JSON.stringify(item));
    if (!seen.has(id)) { seen.add(id); result.push(item); }
  }
  return key === "favorites" ? result.slice(0, 100) : result.slice(0, 100);
}
async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user || null;
}
async function saveKey(key, payload) {
  if (syncing) return;
  const user = await currentUser();
  if (!user) return;
  const { error } = await supabase.from(TABLE).upsert({
    user_id: user.id, data_key: key, payload, updated_at: new Date().toISOString()
  }, { onConflict: "user_id,data_key" });
  if (error) throw error;
}
async function syncAll() {
  if (syncing) return;
  const user = await currentUser();
  if (!user) return;
  syncing = true;
  try {
    const { data, error } = await supabase.from(TABLE).select("data_key,payload").eq("user_id", user.id);
    if (error) throw error;
    for (const key of Object.keys(STORAGE)) {
      const remote = data?.find(row => row.data_key === key)?.payload || [];
      const combined = merge(readLocal(key), remote, key);
      writeLocal(key, combined);
      const { error: saveError } = await supabase.from(TABLE).upsert({
        user_id: user.id, data_key: key, payload: combined, updated_at: new Date().toISOString()
      }, { onConflict: "user_id,data_key" });
      if (saveError) throw saveError;
    }
    window.dispatchEvent(new CustomEvent("yunarunes-cloud-sync"));
  } finally { syncing = false; }
}
function scheduleSave(key) {
  clearTimeout(timer);
  timer = setTimeout(() => saveKey(key, readLocal(key)).catch(err => console.warn("YunaRunes cloud sync:", err.message)), 500);
}
const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
  originalSetItem.call(this, key, value);
  if (this === localStorage && !syncing) {
    const entry = Object.entries(STORAGE).find(([, storageKey]) => storageKey === key);
    if (entry) scheduleSave(entry[0]);
  }
};
async function saveTeam(monsters) {
  const user = await currentUser();
  if (!user) throw new Error("Inicia sessão na tua conta YunaRunes para guardar equipas.");
  const teams = readLocal("teams");
  const team = { id: crypto.randomUUID(), monsters, saved_at: new Date().toISOString() };
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
  client: supabase, syncAll, currentUser, saveTeam, removeTeam,
  getFavorites: () => readLocal("favorites"),
  getTeams: () => readLocal("teams"), getDecks: () => readLocal("decks")
};
window.YunaRunesCloudReady = (async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await syncAll();
  supabase.auth.onAuthStateChange((event, sessionNow) => {
    if (sessionNow && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
      setTimeout(() => syncAll().catch(err => console.warn("YunaRunes cloud sync:", err.message)), 0);
    }
  });
  return window.YunaRunesCloud;
})();
