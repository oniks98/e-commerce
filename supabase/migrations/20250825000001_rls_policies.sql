

-- Enable RLS for all tables
alter table "public"."regions" enable row level security;
alter table "public"."warehouses" enable row level security;
alter table "public"."categories" enable row level security;
alter table "public"."products" enable row level security;
alter table "public"."product_visibility" enable row level security;
alter table "public"."inventory" enable row level security;
alter table "public"."promo_codes" enable row level security;
alter table "public"."bonus_points" enable row level security;
alter table "public"."orders" enable row level security;
alter table "public"."order_items" enable row level security;
alter table "public"."audit_logs" enable row level security;

-- RLS Policies

-- Public access for some tables
create policy "Allow public read access to regions" on "public"."regions" for select using (true);
create policy "Allow public read access to warehouses" on "public"."warehouses" for select using (true);
create policy "Allow public read access to categories" on "public"."categories" for select using (true);

-- Products RLS
create policy "Allow public read access to visible products" on "public"."products" for select using (visible = true);
create policy "Allow admin full access to products" on "public"."products" for all using (auth.jwt() ->> 'user_role' = 'admin');

-- Product Visibility RLS
create policy "Allow public read access to product_visibility" on "public"."product_visibility" for select using (true);

-- Orders RLS
create policy "Allow users to see their own orders" on "public"."orders" for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Allow users to create their own orders" on "public"."orders" for insert with check (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Allow admin full access to orders" on "public"."orders" for all using (auth.jwt() ->> 'user_role' = 'admin');

-- Order Items RLS
create policy "Allow users to see their own order_items" on "public"."order_items" for select using (
    exists (select 1 from orders where orders.id = order_items.order_id and orders.clerk_user_id = auth.jwt() ->> 'sub')
);
create policy "Allow admin full access to order_items" on "public"."order_items" for all using (auth.jwt() ->> 'user_role' = 'admin');

-- Bonus Points RLS
create policy "Allow users to see their own bonus_points" on "public"."bonus_points" for select using (auth.jwt() ->> 'sub' = clerk_user_id);
create policy "Allow admin full access to bonus_points" on "public"."bonus_points" for all using (auth.jwt() ->> 'user_role' = 'admin');

-- Audit Logs RLS
create policy "Allow admin full access to audit_logs" on "public"."audit_logs" for all using (auth.jwt() ->> 'user_role' = 'admin');

-- Functions

-- Function to get user role from Clerk metadata
create or replace function get_user_role() returns text as $$
declare
  role text;
begin
  select auth.jwt() -> 'user_metadata' ->> 'role' into role;
  return role;
end;
$$ language plpgsql stable;

-- Function to handle guest orders
create or replace function create_guest_order(guest_email text, guest_phone text, order_items jsonb) returns uuid as $$
declare
  order_id uuid;
begin
  insert into public.orders (guest_email, guest_phone, total_amount, currency, shipping_address, status)
  values (guest_email, guest_phone, (order_items ->> 'total_amount')::numeric, 'UAH', (order_items ->> 'shipping_address')::jsonb, 'pending')
  returning id into order_id;

  -- here you would insert into order_items from the jsonb array

  return order_id;
end;
$$ language plpgsql volatile;
