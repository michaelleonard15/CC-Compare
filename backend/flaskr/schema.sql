-- -- NOTE: This schema is not what we're actually using for our project.
-- -- It's just a sample schema given by the flask tutorial.

-- -- why are we dropping the table? won't that destroy all data every time it runs?
-- DROP TABLE IF EXISTS user;
-- DROP TABLE IF EXISTS post;

-- CREATE TABLE user (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   username TEXT UNIQUE NOT NULL,
--   password TEXT NOT NULL
-- );

-- CREATE TABLE post (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   author_id INTEGER NOT NULL,
--   created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   title TEXT NOT NULL,
--   body TEXT NOT NULL,
--   FOREIGN KEY (author_id) REFERENCES user (id)
-- );

DROP TABLE IF EXISTS agreements;

CREATE TABLE agreements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id INTEGER NOT NULL,
  target_id INTEGER NOT NULL,
  major INTEGER NOT NULL,
  agreement_json TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  agreement_id INTEGER NOT NULL
);