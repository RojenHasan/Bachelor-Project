alter table "public"."furniture" add column "email" character varying(255);

create policy "Allow all inserts"
on "public"."furniture"
as permissive
for insert
to public
with check (true);



