create table "public"."Edges" (
    "id" uuid not null default gen_random_uuid(),
    "source" uuid default gen_random_uuid(),
    "target" uuid default gen_random_uuid()
);


alter table "public"."Edges" enable row level security;

create table "public"."Nodes" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "file_link" text not null
);


alter table "public"."Nodes" enable row level security;

create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "file_link" text not null
);


alter table "public"."files" enable row level security;

CREATE UNIQUE INDEX "Edges_pkey" ON public."Edges" USING btree (id);

CREATE UNIQUE INDEX "Nodes_file_key" ON public."Nodes" USING btree (file_link);

CREATE UNIQUE INDEX "Nodes_pkey" ON public."Nodes" USING btree (id);

CREATE UNIQUE INDEX files_file_link_key ON public.files USING btree (file_link);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

alter table "public"."Edges" add constraint "Edges_pkey" PRIMARY KEY using index "Edges_pkey";

alter table "public"."Nodes" add constraint "Nodes_pkey" PRIMARY KEY using index "Nodes_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."Edges" add constraint "Edges_source_fkey" FOREIGN KEY (source) REFERENCES "Nodes"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Edges" validate constraint "Edges_source_fkey";

alter table "public"."Edges" add constraint "Edges_target_fkey" FOREIGN KEY (target) REFERENCES "Nodes"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Edges" validate constraint "Edges_target_fkey";

alter table "public"."Nodes" add constraint "Nodes_file_key" UNIQUE using index "Nodes_file_key";

alter table "public"."files" add constraint "files_file_link_fkey" FOREIGN KEY (file_link) REFERENCES "Nodes"(file_link) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."files" validate constraint "files_file_link_fkey";

alter table "public"."files" add constraint "files_file_link_key" UNIQUE using index "files_file_link_key";

grant delete on table "public"."Edges" to "anon";

grant insert on table "public"."Edges" to "anon";

grant references on table "public"."Edges" to "anon";

grant select on table "public"."Edges" to "anon";

grant trigger on table "public"."Edges" to "anon";

grant truncate on table "public"."Edges" to "anon";

grant update on table "public"."Edges" to "anon";

grant delete on table "public"."Edges" to "authenticated";

grant insert on table "public"."Edges" to "authenticated";

grant references on table "public"."Edges" to "authenticated";

grant select on table "public"."Edges" to "authenticated";

grant trigger on table "public"."Edges" to "authenticated";

grant truncate on table "public"."Edges" to "authenticated";

grant update on table "public"."Edges" to "authenticated";

grant delete on table "public"."Edges" to "service_role";

grant insert on table "public"."Edges" to "service_role";

grant references on table "public"."Edges" to "service_role";

grant select on table "public"."Edges" to "service_role";

grant trigger on table "public"."Edges" to "service_role";

grant truncate on table "public"."Edges" to "service_role";

grant update on table "public"."Edges" to "service_role";

grant delete on table "public"."Nodes" to "anon";

grant insert on table "public"."Nodes" to "anon";

grant references on table "public"."Nodes" to "anon";

grant select on table "public"."Nodes" to "anon";

grant trigger on table "public"."Nodes" to "anon";

grant truncate on table "public"."Nodes" to "anon";

grant update on table "public"."Nodes" to "anon";

grant delete on table "public"."Nodes" to "authenticated";

grant insert on table "public"."Nodes" to "authenticated";

grant references on table "public"."Nodes" to "authenticated";

grant select on table "public"."Nodes" to "authenticated";

grant trigger on table "public"."Nodes" to "authenticated";

grant truncate on table "public"."Nodes" to "authenticated";

grant update on table "public"."Nodes" to "authenticated";

grant delete on table "public"."Nodes" to "service_role";

grant insert on table "public"."Nodes" to "service_role";

grant references on table "public"."Nodes" to "service_role";

grant select on table "public"."Nodes" to "service_role";

grant trigger on table "public"."Nodes" to "service_role";

grant truncate on table "public"."Nodes" to "service_role";

grant update on table "public"."Nodes" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";


