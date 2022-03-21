CREATE TABLE IF NOT EXISTS saved (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  pet_id int,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (pet_id) REFERENCES pet(id)
);
