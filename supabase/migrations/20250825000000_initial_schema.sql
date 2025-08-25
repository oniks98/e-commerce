
-- Create custom types
create type "user_role" as enum ('admin', 'manager', 'user');
create type "order_status" as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type "discount_type" as enum ('percentage', 'fixed_amount', 'bogo');

-- Create tables
create table "public"."regions" (
    "id" uuid primary key default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."warehouses" (
    "id" uuid primary key default gen_random_uuid(),
    "name" text not null,
    "region_id" uuid references "public"."regions"("id"),
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."categories" (
    "id" uuid primary key default gen_random_uuid(),
    "name" text not null,
    "parent_id" uuid references "public"."categories"("id"),
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."products" (
    "id" uuid primary key default gen_random_uuid(),
    "name" jsonb not null, -- { "en": "Product Name", "uk": "Назва продукту" }
    "description" jsonb,
    "sku" text not null unique,
    "price_usd" numeric(10, 2) not null,
    "price_eur" numeric(10, 2) not null,
    "price_uah" numeric(10, 2) not null,
    "vat_rate" numeric(4, 2) not null check (vat_rate in (0, 20)),
    "category_id" uuid references "public"."categories"("id"),
    "visible" boolean default true,
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."product_visibility" (
    "product_id" uuid not null references "public"."products"("id") on delete cascade,
    "region_id" uuid not null references "public"."regions"("id") on delete cascade,
    primary key ("product_id", "region_id")
);

create table "public"."inventory" (
    "product_id" uuid not null references "public"."products"("id") on delete cascade,
    "warehouse_id" uuid not null references "public"."warehouses"("id") on delete cascade,
    "quantity" integer not null default 0,
    "reserved_quantity" integer not null default 0,
    "reservation_expires_at" timestamptz(6),
    primary key ("product_id", "warehouse_id")
);

create table "public"."promo_codes" (
    "id" uuid primary key default gen_random_uuid(),
    "code" text not null unique,
    "discount_type" discount_type not null,
    "value" numeric(10, 2) not null,
    "max_uses" integer,
    "used_count" integer default 0,
    "expires_at" timestamptz(6),
    "min_order_amount" numeric(10, 2),
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."bonus_points" (
    "id" uuid primary key default gen_random_uuid(),
    "clerk_user_id" text not null,
    "points" integer not null default 0,
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now()
);

create table "public"."orders" (
    "id" uuid primary key default gen_random_uuid(),
    "clerk_user_id" text,
    "guest_email" text,
    "guest_phone" text,
    "status" order_status not null default 'pending',
    "total_amount" numeric(10, 2) not null,
    "currency" text not null,
    "shipping_address" jsonb,
    "promo_code_id" uuid references "public"."promo_codes"("id"),
    "bonus_points_used" integer,
    "created_at" timestamptz(6) default now(),
    "updated_at" timestamptz(6) default now(),
    constraint "guest_or_user_check" check (
        ("clerk_user_id" is not null and "guest_email" is null and "guest_phone" is null) or
        ("clerk_user_id" is null and "guest_email" is not null and "guest_phone" is not null)
    )
);

create table "public"."order_items" (
    "id" uuid primary key default gen_random_uuid(),
    "order_id" uuid not null references "public"."orders"("id") on delete cascade,
    "product_id" uuid not null references "public"."products"("id"),
    "quantity" integer not null,
    "price" numeric(10, 2) not null,
    "created_at" timestamptz(6) default now()
);

create table "public"."audit_logs" (
    "id" uuid primary key default gen_random_uuid(),
    "actor_id" text,
    "action" text not null,
    "target_id" text,
    "target_table" text,
    "payload" jsonb,
    "created_at" timestamptz(6) default now()
);

-- Indexes for performance
create index "idx_products_category_id" on "public"."products"("category_id");
create index "idx_orders_clerk_user_id" on "public"."orders"("clerk_user_id");
create index "idx_orders_guest_email" on "public"."orders"("guest_email");
create index "idx_order_items_order_id" on "public"."order_items"("order_id");
create index "idx_order_items_product_id" on "public"."order_items"("product_id");
