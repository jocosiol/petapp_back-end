CREATE TABLE IF NOT EXISTS user_has_pet (
  id int PRIMARY KEY AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  description varchar(255),
  saved boolean DEFAULT false,
  end_date date,
  user_id int,
  pet_id int,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (pet_id) REFERENCES pet(id)
);
