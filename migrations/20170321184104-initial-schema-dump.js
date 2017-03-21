'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.sequelize.query(sql());

    done();
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.dropTable('traveler');
    queryInterface.dropTable('flight');
    queryInterface.dropTable('user');
    queryInterface.dropAllEnums();

    done();
  }
};

const sql = () => { return  `
    --
    -- PostgreSQL database dump
    --
    
    -- Dumped from database version 9.6.2
    -- Dumped by pg_dump version 9.6.2
    
    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SET check_function_bodies = false;
    SET client_min_messages = warning;
    SET row_security = off;
    
    --
    -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
    --
    
    CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    
    
    --
    -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
    --
    
    COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
    
    
    SET search_path = public, pg_catalog;
    
    --
    -- Name: enum_flight_status; Type: TYPE; Schema: public; Owner: postgres
    --
    
    CREATE TYPE enum_flight_status AS ENUM (
        'arrived',
        'delayed',
        'scheduled'
    );
    
    
    ALTER TYPE enum_flight_status OWNER TO postgres;
    
    --
    -- Name: enum_traveler_status; Type: TYPE; Schema: public; Owner: postgres
    --
    
    CREATE TYPE enum_traveler_status AS ENUM (
        'transit',
        'unconfirmed',
        'detained',
        'at risk',
        'cleared'
    );
    
    
    ALTER TYPE enum_traveler_status OWNER TO postgres;
    
    SET default_tablespace = '';
    
    SET default_with_oids = false;
    
    --
    -- Name: flight; Type: TABLE; Schema: public; Owner: postgres
    --
    
    CREATE TABLE flight (
        id integer NOT NULL,
        "flightNum" character varying(255) NOT NULL,
        "airlineCode" character varying(255) NOT NULL,
        status enum_flight_status DEFAULT 'scheduled'::enum_flight_status,
        "arrivalTime" timestamp with time zone NOT NULL,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL
    );
    
    
    ALTER TABLE flight OWNER TO postgres;
    
    --
    -- Name: flight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    
    CREATE SEQUENCE flight_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    
    ALTER TABLE flight_id_seq OWNER TO postgres;
    
    --
    -- Name: flight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    
    ALTER SEQUENCE flight_id_seq OWNED BY flight.id;
    
    
    --
    -- Name: traveler; Type: TABLE; Schema: public; Owner: postgres
    --
    
    CREATE TABLE traveler (
        id integer NOT NULL,
        name character varying(255) NOT NULL,
        nationality character varying(255),
        email character varying(255),
        phone character varying(255) NOT NULL,
        connectivity boolean,
        "secondaryContactPhone" character varying(255),
        "secondaryContactName" character varying(255),
        "secondaryContactRelation" character varying(255),
        "requireInterpreter" boolean,
        "preferredLanguage" character varying(255),
        status enum_traveler_status DEFAULT 'transit'::enum_traveler_status,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL,
        flight_id integer
    );
    
    
    ALTER TABLE traveler OWNER TO postgres;
    
    --
    -- Name: traveler_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    
    CREATE SEQUENCE traveler_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    
    ALTER TABLE traveler_id_seq OWNER TO postgres;
    
    --
    -- Name: traveler_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    
    ALTER SEQUENCE traveler_id_seq OWNED BY traveler.id;
    
    
    --
    -- Name: user; Type: TABLE; Schema: public; Owner: postgres
    --
    
    CREATE TABLE "user" (
        _id integer NOT NULL,
        email character varying(255) NOT NULL,
        password character varying(255) NOT NULL,
        salt character varying(255),
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL
    );
    
    
    ALTER TABLE "user" OWNER TO postgres;
    
    --
    -- Name: user__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
    --
    
    CREATE SEQUENCE user__id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    
    ALTER TABLE user__id_seq OWNER TO postgres;
    
    --
    -- Name: user__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
    --
    
    ALTER SEQUENCE user__id_seq OWNED BY "user"._id;
    
    
    --
    -- Name: flight id; Type: DEFAULT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY flight ALTER COLUMN id SET DEFAULT nextval('flight_id_seq'::regclass);
    
    
    --
    -- Name: traveler id; Type: DEFAULT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY traveler ALTER COLUMN id SET DEFAULT nextval('traveler_id_seq'::regclass);
    
    
    --
    -- Name: user _id; Type: DEFAULT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY "user" ALTER COLUMN _id SET DEFAULT nextval('user__id_seq'::regclass);
    
    --
    -- Name: flight flight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY flight
        ADD CONSTRAINT flight_pkey PRIMARY KEY (id);
    
    
    --
    -- Name: traveler traveler_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY traveler
        ADD CONSTRAINT traveler_pkey PRIMARY KEY (id);
    
    
    --
    -- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY "user"
        ADD CONSTRAINT user_email_key UNIQUE (email);
    
    
    --
    -- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY "user"
        ADD CONSTRAINT user_pkey PRIMARY KEY (_id);
    
    
    --
    -- Name: traveler traveler_flight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
    --
    
    ALTER TABLE ONLY traveler
        ADD CONSTRAINT traveler_flight_id_fkey FOREIGN KEY (flight_id) REFERENCES flight(id) ON UPDATE CASCADE ON DELETE SET NULL;
    
    
    --
    -- PostgreSQL database dump complete
    --


    `
};
