create or replace function get_descendant_categories(parent_id_input uuid)
returns table(id uuid, name text, parent_id uuid) as $$
begin
  return query
  with recursive category_tree as (
    select c.id, c.name, c.parent_id
    from categories c
    where c.parent_id = parent_id_input
    union all
    select c.id, c.name, c.parent_id
    from categories c
    join category_tree ct on ct.id = c.parent_id
  )
  select * from category_tree;
end;
$$ language plpgsql;
