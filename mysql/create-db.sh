#!/bin/bash

echo "|=============== CREATE-TODO-DB STARTED ===============|"
ROOT_PASSWD="pass"
DB="todo"

# Create database
mysql -u root -p$ROOT_PASSWD -e "CREATE DATABASE $DB;"

# Switch to the newly created database AND Create a table named 'todo_data' with the specified columns
mysql -u root -p$ROOT_PASSWD -e "
  USE $DB; 
CREATE TABLE IF NOT EXISTS todo_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120),
  isComplete TINYINT(1) DEFAULT 0
);"
