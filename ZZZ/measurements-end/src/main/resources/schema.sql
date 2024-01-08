--
-- TOC entry 209 (class 1259 OID 16482)
-- Name: active; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.measurement (
                                id SERIAL PRIMARY KEY,
                                id_device integer,
                                timest timestamp without time zone,
                                val double precision
);
SELECT setval(PG_GET_SERIAL_SEQUENCE('"measurement"', 'id_measurement'), 24);
ALTER TABLE IF EXISTS public.measurement OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16489)
-- Name: device; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.treshhold (
                                id SERIAL PRIMARY KEY,
                                current double precision,
                                id_device integer,
                                treshhold double precision
);
SELECT setval(PG_GET_SERIAL_SEQUENCE('"treshhold"', 'id_treshhold'), 2);
ALTER TABLE IF EXISTS public.treshhold OWNER TO postgres;