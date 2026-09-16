-- Run this once in the Supabase Dashboard: Project > SQL Editor > New query.
-- Creates the `profiles` table that backs customer/admin accounts.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-creates a profile row whenever someone signs up (email/password or Google).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- To make an account an admin (so it can pass the /admin guard), after that person
-- has signed up once via /login, run:
--   update public.profiles set is_admin = true where id = '<their auth user id>';
-- (find the id in Authentication > Users in the Supabase dashboard)
