alter table public.yunarunes_player_data
  drop constraint if exists yunarunes_player_data_data_key_check;

alter table public.yunarunes_player_data
  add constraint yunarunes_player_data_data_key_check
  check (data_key in ('favorites', 'teams', 'decks'));
