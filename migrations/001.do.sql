CREATE TABLE IF NOT EXISTS pet (
  id int PRIMARY KEY AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  status varchar(255) NOT NULL,
  pic varchar(255),
  height float,
  weight float,
  color varchar(255),
  bio varchar(255),
  hypoallergenic boolean,
  dietary_restriction varchar(255),
  breed varchar(255),
  lastUserId int
);