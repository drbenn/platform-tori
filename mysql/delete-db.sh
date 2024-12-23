#!/bin/bash

# Database connection details
DB_NAME="todo"
DB_USER="root"
DB_PASSWORD="pass"  # Replace with your actual password

# Set the password for the session
export DB_PASSWORD=$DB_PASSWORD

echo "|=============== REMOVE-DB STARTED ===============|"

# Must drop all tables before dropping db
mysql -u root -p$DB_PASSWORD -e "USE todo; DROP TABLE todo_data;"

# Drop db
mysql -u root -p$DB_PASSWORD -e "DROP DATABASE todo;"

echo "|=============== Database Deleted ===============|"