SET check_function_bodies = false;
INSERT INTO public.hashers (id, email, name, login, login_expires, email_verified) VALUES (1, 'server@drunkcircle.com', 'Drunk Circle Server', NULL, NULL, NULL);
INSERT INTO public.permission_enum (permission, description) VALUES ('update_trails', 'Update Trails - Add / Edit / Delete trails regardless of who the hares are');
INSERT INTO public.permission_enum (permission, description) VALUES ('mismanage', 'Mismanage: Add / Remove hashers from management roles');
INSERT INTO public.permission_enum (permission, description) VALUES ('cash', 'Ability to set hash fee, and to mark hashers as having paid for trail');
SELECT pg_catalog.setval('public.hashers_id_seq', 1, true);
