
-- Drop dependent policies first

-- Orders RLS
drop policy "Allow users to see their own orders" on "public"."orders";
drop policy "Allow users to create their own orders" on "public"."orders";

-- Order Items RLS
drop policy "Allow users to see their own order_items" on "public"."order_items";

-- Bonus Points RLS
drop policy "Allow users to see their own bonus_points" on "public"."bonus_points";

-- Update orders table
alter table "public"."orders" drop constraint "guest_or_user_check";
alter table "public"."orders" drop column "clerk_user_id";
alter table "public"."orders" add column "user_id" uuid references auth.users(id);
alter table "public"."orders" add constraint "guest_or_user_check" check (
    ("user_id" is not null and "guest_email" is null and "guest_phone" is null) or
    ("user_id" is null and "guest_email" is not null and "guest_phone" is not null)
);

-- Update bonus_points table
alter table "public"."bonus_points" drop column "clerk_user_id";
alter table "public"."bonus_points" add column "user_id" uuid not null references auth.users(id);

-- Recreate policies with supabase auth

-- Orders RLS
create policy "Allow users to see their own orders" on "public"."orders" for select using (auth.uid() = user_id);
create policy "Allow users to create their own orders" on "public"."orders" for insert with check (auth.uid() = user_id);

-- Order Items RLS
create policy "Allow users to see their own order_items" on "public"."order_items" for select using (
    exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

-- Bonus Points RLS
create policy "Allow users to see their own bonus_points" on "public"."bonus_points" for select using (auth.uid() = user_id);

-- Update get_user_role function to use supabase auth
create or replace function get_user_role() returns text as $$
begin
  return (select raw_user_meta_data ->> 'role' from auth.users where id = auth.uid());
end;
$$ language plpgsql stable;

