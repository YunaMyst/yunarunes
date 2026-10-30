create table if not exists public.yunarunes_player_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  data_key text not null check (data_key in ('favorites', 'teams')),
  payload jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint yunarunes_player_data_user_key unique (user_id, data_key),
  constraint yunarunes_player_data_payload_array check (jsonb_typeof(payload) = 'array')
);

alter table public.yunarunes_player_data enable row level security;
revoke all on table public.yunarunes_player_data from anon;
grant select, insert, update, delete on table public.yunarunes_player_data to authenticated;

create policy "YunaRunes players read own data"
  on public.yunarunes_player_data for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "YunaRunes players insert own data"
  on public.yunarunes_player_data for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "YunaRunes players update own data"
  on public.yunarunes_player_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "YunaRunes players delete own data"
  on public.yunarunes_player_data for delete to authenticated
  using ((select auth.uid()) = user_id);
