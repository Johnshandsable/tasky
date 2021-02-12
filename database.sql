-- Delete table
DROP TABLE "to_do_list" IF EXISTS;

-- Create table
CREATE TABLE "to_do_list" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(1024) NOT NULL,
  "complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to_do_list"
  ("task")
VALUES
  ('Clean House'),
  ('Do Dishes'),
  ('Check Email');