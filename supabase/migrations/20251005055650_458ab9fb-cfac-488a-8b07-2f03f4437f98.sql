-- Create profiles table for user progression
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  level integer not null default 1,
  current_xp integer not null default 0,
  total_xp integer not null default 0,
  augmentation_points integer not null default 0,
  gridcoin integer not null default 0,
  data_fragments integer not null default 0,
  exploit_shards integer not null default 0,
  signature_keys integer not null default 0,
  prestige_level integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Create augmentations table to track unlocked skills
create type public.augmentation_branch as enum ('architect', 'ghost', 'sentinel', 'gridrunner');
create type public.augmentation_path as enum ('none', 'exploit_dev', 'malware_analyst', 'network_infiltrator', 'covert_ops', 'threat_hunter', 'incident_responder');

create table public.augmentations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  augmentation_id text not null,
  branch augmentation_branch not null,
  tier integer not null,
  unlocked_at timestamp with time zone not null default now(),
  unique(user_id, augmentation_id)
);

alter table public.augmentations enable row level security;

create policy "Users can view their own augmentations"
  on public.augmentations
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own augmentations"
  on public.augmentations
  for insert
  with check (auth.uid() = user_id);

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();