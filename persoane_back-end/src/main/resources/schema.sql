--
-- TOC entry 212 (class 1259 OID 16503)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."person" (
                               id SERIAL PRIMARY KEY,
                               role character varying(255),
                               user_password character varying(255),
                               username character varying(255)
);

SELECT setval('person_id_seq', 11);
ALTER TABLE IF EXISTS public."user" OWNER TO postgres;