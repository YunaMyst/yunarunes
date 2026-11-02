create table if not exists public.yunarunes_support_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Jogador',
  email text,
  category text not null check (category in ('problem', 'usage', 'idea', 'other')),
  message text not null,
  attachment_base64 text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.yunarunes_support_requests enable row level security;
revoke all on table public.yunarunes_support_requests from anon, authenticated;
grant all on table public.yunarunes_support_requests to service_role;
comment on table public.yunarunes_support_requests is 'Private YunaRunes support requests. Accessible only through protected Edge Functions.';
