SET check_function_bodies = false;
CREATE FUNCTION public.bitcount(i integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE n integer;
DECLARE amount integer;
  BEGIN
    amount := 0;
    FOR n IN 1..16 LOOP
      amount := amount + ((i >> (n-1)) & 1);
    END LOOP;
    RETURN amount;
  END
$$;
CREATE FUNCTION public.truncate_tables() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    statements CURSOR FOR
        SELECT tablename FROM pg_tables
        WHERE schemaname = 'public';
BEGIN
    FOR stmt IN statements LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' RESTART IDENTITY CASCADE;';
    END LOOP;
END;
$$;
CREATE TABLE public.account_links (
    provider text NOT NULL,
    provider_id text NOT NULL,
    user_id integer NOT NULL
);
CREATE TABLE public.attendance (
    trail integer NOT NULL,
    hasher integer NOT NULL,
    attended boolean,
    paid boolean,
    note text
);
CREATE TABLE public.hashers (
    id integer NOT NULL,
    email text,
    name text,
    login text,
    login_expires timestamp with time zone,
    email_verified timestamp with time zone
);
CREATE SEQUENCE public.hashers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.hashers_id_seq OWNED BY public.hashers.id;
CREATE TABLE public.kennels (
    id integer NOT NULL,
    name text,
    short_name text,
    description text,
    area text,
    frequency integer,
    web text,
    gm_verify text,
    dc_verify text,
    gm_email text,
    timezone text DEFAULT 'America/Los_Angeles'::text NOT NULL,
    google_token text,
    google_calendar text,
    next timestamp with time zone,
    google_refresh text,
    price double precision
);
CREATE SEQUENCE public.kennels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.kennels_id_seq OWNED BY public.kennels.id;
CREATE TABLE public.trails (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    directions text,
    kennel integer DEFAULT nextval('public.kennels_id_seq'::regclass) NOT NULL,
    latitude double precision,
    longitude double precision,
    number integer,
    draft integer,
    google_calendar text,
    start timestamp with time zone NOT NULL,
    calculated_number integer,
    gcal_dirty boolean DEFAULT true NOT NULL,
    verification text,
    "createdById" integer
);
CREATE SEQUENCE public.trails_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.trails_id_seq OWNED BY public.trails.id;
CREATE TABLE public.hares (
    hasher integer DEFAULT nextval('public.hashers_id_seq'::regclass) NOT NULL,
    trail integer DEFAULT nextval('public.trails_id_seq'::regclass) NOT NULL
);
CREATE SEQUENCE public.hares_hasher_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.hares_hasher_seq OWNED BY public.hares.hasher;
CREATE SEQUENCE public.hares_trail_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.hares_trail_seq OWNED BY public.hares.trail;
CREATE TABLE public.management (
    id integer NOT NULL,
    hasher integer DEFAULT nextval('public.hashers_id_seq'::regclass) NOT NULL,
    kennel integer DEFAULT nextval('public.kennels_id_seq'::regclass) NOT NULL,
    title text,
    role bit(32) DEFAULT '00000000000000000000000000000000'::"bit" NOT NULL
);
CREATE SEQUENCE public.management_hasher_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.management_hasher_seq OWNED BY public.management.hasher;
CREATE SEQUENCE public.management_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.management_id_seq OWNED BY public.management.id;
CREATE SEQUENCE public.management_kennel_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.management_kennel_seq OWNED BY public.management.kennel;
CREATE TABLE public.permission_enum (
    permission text NOT NULL,
    description text NOT NULL
);
CREATE TABLE public.permissions (
    role integer NOT NULL,
    permission text NOT NULL
);
CREATE TABLE public.sessions (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id integer NOT NULL,
    expires timestamp with time zone NOT NULL
);
CREATE TABLE public.ticks (
    tick timestamp without time zone
);
CREATE SEQUENCE public.trails_draft_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.trails_draft_seq OWNED BY public.trails.draft;
CREATE SEQUENCE public.trails_kennel_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.trails_kennel_seq OWNED BY public.trails.kennel;
ALTER TABLE ONLY public.hashers ALTER COLUMN id SET DEFAULT nextval('public.hashers_id_seq'::regclass);
ALTER TABLE ONLY public.kennels ALTER COLUMN id SET DEFAULT nextval('public.kennels_id_seq'::regclass);
ALTER TABLE ONLY public.management ALTER COLUMN id SET DEFAULT nextval('public.management_id_seq'::regclass);
ALTER TABLE ONLY public.trails ALTER COLUMN id SET DEFAULT nextval('public.trails_id_seq'::regclass);
ALTER TABLE ONLY public.account_links
    ADD CONSTRAINT account_links_pkey PRIMARY KEY (user_id, provider);
ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (trail, hasher);
ALTER TABLE ONLY public.hashers
    ADD CONSTRAINT hashers_email_key UNIQUE (email);
ALTER TABLE ONLY public.hashers
    ADD CONSTRAINT hashers_name_key UNIQUE (name);
ALTER TABLE ONLY public.hashers
    ADD CONSTRAINT hashers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.kennels
    ADD CONSTRAINT kennels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.management
    ADD CONSTRAINT management_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.permission_enum
    ADD CONSTRAINT permission_enum_pkey PRIMARY KEY (permission);
ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (role, permission);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.trails
    ADD CONSTRAINT trails_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX hare_index ON public.hares USING btree (hasher, trail);
ALTER TABLE ONLY public.account_links
    ADD CONSTRAINT account_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.hashers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_hasher_fkey FOREIGN KEY (hasher) REFERENCES public.hashers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_trail_fkey FOREIGN KEY (trail) REFERENCES public.trails(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.hares
    ADD CONSTRAINT hares_hasher_fkey FOREIGN KEY (hasher) REFERENCES public.hashers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.hares
    ADD CONSTRAINT hares_trail_fkey FOREIGN KEY (trail) REFERENCES public.trails(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.kennels
    ADD CONSTRAINT kennels_gm_email_fkey FOREIGN KEY (gm_email) REFERENCES public.hashers(email) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.management
    ADD CONSTRAINT management_hasher_fkey FOREIGN KEY (hasher) REFERENCES public.hashers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.management
    ADD CONSTRAINT management_kennel_fkey FOREIGN KEY (kennel) REFERENCES public.kennels(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_permission_fkey FOREIGN KEY (permission) REFERENCES public.permission_enum(permission) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_role_fkey FOREIGN KEY (role) REFERENCES public.management(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.hashers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.trails
    ADD CONSTRAINT trails_draft_fkey FOREIGN KEY (draft) REFERENCES public.trails(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.trails
    ADD CONSTRAINT trails_kennel_fkey FOREIGN KEY (kennel) REFERENCES public.kennels(id) ON UPDATE CASCADE ON DELETE CASCADE;
