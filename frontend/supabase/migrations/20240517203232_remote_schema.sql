create extension if not exists "vector" with schema "extensions";


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_furniture(query_embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id bigint, name text, description text, price text, type text, similarity double precision)
 LANGUAGE sql
 STABLE
AS $function$
  select
    furniture.id,
    furniture.name,
		furniture.description,
    furniture.price,
    furniture.type,
    1 - (furniture.embedding <=> query_embedding) as similarity
  from furniture
  where 1 - (furniture.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$function$
;


