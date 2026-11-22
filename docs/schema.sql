-- FUTURE STUB. Not applied. No database is connected to this demo.
-- Intended free-tier database (TODO: choose one, for example Cloudflare D1
-- or a similar free tier). Do not put secrets in this file.
--
-- Parish / church card images do NOT belong in these tables.
-- The faith row stores only a verified flag, the parish name, and the time.

-- create table faith_verifications (
--   id text primary key,
--   verified integer not null,          -- 0 or 1
--   parish_name text not null,
--   verified_at text not null           -- ISO-8601 timestamp
-- );

-- Donor leaderboard: store a display name only when the donor opts in.
-- Default is opted out. Anonymous gifts have a null public_name.
-- create table donations (
--   id text primary key,
--   amount_cents integer not null,
--   public_name text,                   -- null unless leaderboard opt-in
--   created_at text not null
-- );

-- create table ride_requests (
--   id text primary key,
--   status text not null,
--   riders integer not null,
--   coverage_reason text not null,      -- plain-language "why you got this"
--   created_at text not null
-- );

-- Sober Driver Crew waitlist. Dispatch stays off until the feature flag
-- may legally be enabled. See js/flags.js.
-- create table crew_waitlist (
--   id text primary key,
--   display_name text not null,
--   email text not null,
--   town text not null,
--   created_at text not null
-- );
