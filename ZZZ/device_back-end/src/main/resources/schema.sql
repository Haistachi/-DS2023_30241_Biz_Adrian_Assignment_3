-- TOC entry 210 (class 1259 OID 16489)
-- Name: device; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.device (
                                id SERIAL PRIMARY KEY,
                               address character varying(255),
                               consumption DOUBLE PRECISION NOT NULL,
                               description character varying(255),
                               person int
);
SELECT setval('device_id_seq', 2);
ALTER TABLE IF EXISTS public.device OWNER TO postgres;