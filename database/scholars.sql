\c scholarship;

CREATE TABLE scholars (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  rank INTEGER
);

CREATE INDEX rank_index
ON scholars (rank);