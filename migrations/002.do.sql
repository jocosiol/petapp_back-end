CREATE TABLE IF NOT EXISTS user (
  id int PRIMARY KEY AUTO_INCREMENT,
  hashed_pass varchar(255) NOT NULL,
  first varchar(255) NOT NULL,
  last varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  admin boolean NOT NULL,
);