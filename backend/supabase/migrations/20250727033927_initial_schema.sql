revoke delete on table "public"."Edges" from "anon";

revoke insert on table "public"."Edges" from "anon";

revoke references on table "public"."Edges" from "anon";

revoke select on table "public"."Edges" from "anon";

revoke trigger on table "public"."Edges" from "anon";

revoke truncate on table "public"."Edges" from "anon";

revoke update on table "public"."Edges" from "anon";

revoke delete on table "public"."Edges" from "authenticated";

revoke insert on table "public"."Edges" from "authenticated";

revoke references on table "public"."Edges" from "authenticated";

revoke select on table "public"."Edges" from "authenticated";

revoke trigger on table "public"."Edges" from "authenticated";

revoke truncate on table "public"."Edges" from "authenticated";

revoke update on table "public"."Edges" from "authenticated";

revoke delete on table "public"."Edges" from "service_role";

revoke insert on table "public"."Edges" from "service_role";

revoke references on table "public"."Edges" from "service_role";

revoke select on table "public"."Edges" from "service_role";

revoke trigger on table "public"."Edges" from "service_role";

revoke truncate on table "public"."Edges" from "service_role";

revoke update on table "public"."Edges" from "service_role";

revoke delete on table "public"."files" from "anon";

revoke insert on table "public"."files" from "anon";

revoke references on table "public"."files" from "anon";

revoke select on table "public"."files" from "anon";

revoke trigger on table "public"."files" from "anon";

revoke truncate on table "public"."files" from "anon";

revoke update on table "public"."files" from "anon";

revoke delete on table "public"."files" from "authenticated";

revoke insert on table "public"."files" from "authenticated";

revoke references on table "public"."files" from "authenticated";

revoke select on table "public"."files" from "authenticated";

revoke trigger on table "public"."files" from "authenticated";

revoke truncate on table "public"."files" from "authenticated";

revoke update on table "public"."files" from "authenticated";

revoke delete on table "public"."files" from "service_role";

revoke insert on table "public"."files" from "service_role";

revoke references on table "public"."files" from "service_role";

revoke select on table "public"."files" from "service_role";

revoke trigger on table "public"."files" from "service_role";

revoke truncate on table "public"."files" from "service_role";

revoke update on table "public"."files" from "service_role";

alter table "public"."Edges" drop constraint "Edges_source_fkey";

alter table "public"."Edges" drop constraint "Edges_target_fkey";

alter table "public"."files" drop constraint "files_file_link_fkey";

alter table "public"."files" drop constraint "files_file_link_key";

alter table "public"."Edges" drop constraint "Edges_pkey";

alter table "public"."files" drop constraint "files_pkey";

drop index if exists "public"."Edges_pkey";

drop index if exists "public"."files_file_link_key";

drop index if exists "public"."files_pkey";

drop table "public"."Edges";

drop table "public"."files";

create table "public"."Files" (
    "id" uuid not null default gen_random_uuid(),
    "file_link" text not null
);


alter table "public"."Files" enable row level security;

create table "public"."Links" (
    "id" uuid not null default gen_random_uuid(),
    "source" uuid default gen_random_uuid(),
    "target" uuid default gen_random_uuid()
);


alter table "public"."Links" enable row level security;

CREATE UNIQUE INDEX "Edges_pkey" ON public."Links" USING btree (id);

CREATE UNIQUE INDEX files_file_link_key ON public."Files" USING btree (file_link);

CREATE UNIQUE INDEX files_pkey ON public."Files" USING btree (id);

alter table "public"."Files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."Links" add constraint "Edges_pkey" PRIMARY KEY using index "Edges_pkey";

alter table "public"."Files" add constraint "files_file_link_fkey" FOREIGN KEY (file_link) REFERENCES "Nodes"(file_link) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Files" validate constraint "files_file_link_fkey";

alter table "public"."Files" add constraint "files_file_link_key" UNIQUE using index "files_file_link_key";

alter table "public"."Links" add constraint "Edges_source_fkey" FOREIGN KEY (source) REFERENCES "Nodes"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Links" validate constraint "Edges_source_fkey";

alter table "public"."Links" add constraint "Edges_target_fkey" FOREIGN KEY (target) REFERENCES "Nodes"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Links" validate constraint "Edges_target_fkey";

grant delete on table "public"."Files" to "anon";

grant insert on table "public"."Files" to "anon";

grant references on table "public"."Files" to "anon";

grant select on table "public"."Files" to "anon";

grant trigger on table "public"."Files" to "anon";

grant truncate on table "public"."Files" to "anon";

grant update on table "public"."Files" to "anon";

grant delete on table "public"."Files" to "authenticated";

grant insert on table "public"."Files" to "authenticated";

grant references on table "public"."Files" to "authenticated";

grant select on table "public"."Files" to "authenticated";

grant trigger on table "public"."Files" to "authenticated";

grant truncate on table "public"."Files" to "authenticated";

grant update on table "public"."Files" to "authenticated";

grant delete on table "public"."Files" to "service_role";

grant insert on table "public"."Files" to "service_role";

grant references on table "public"."Files" to "service_role";

grant select on table "public"."Files" to "service_role";

grant trigger on table "public"."Files" to "service_role";

grant truncate on table "public"."Files" to "service_role";

grant update on table "public"."Files" to "service_role";

grant delete on table "public"."Links" to "anon";

grant insert on table "public"."Links" to "anon";

grant references on table "public"."Links" to "anon";

grant select on table "public"."Links" to "anon";

grant trigger on table "public"."Links" to "anon";

grant truncate on table "public"."Links" to "anon";

grant update on table "public"."Links" to "anon";

grant delete on table "public"."Links" to "authenticated";

grant insert on table "public"."Links" to "authenticated";

grant references on table "public"."Links" to "authenticated";

grant select on table "public"."Links" to "authenticated";

grant trigger on table "public"."Links" to "authenticated";

grant truncate on table "public"."Links" to "authenticated";

grant update on table "public"."Links" to "authenticated";

grant delete on table "public"."Links" to "service_role";

grant insert on table "public"."Links" to "service_role";

grant references on table "public"."Links" to "service_role";

grant select on table "public"."Links" to "service_role";

grant trigger on table "public"."Links" to "service_role";

grant truncate on table "public"."Links" to "service_role";

grant update on table "public"."Links" to "service_role";


