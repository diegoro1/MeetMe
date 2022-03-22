CREATE TABLE IF NOT EXISTS users (
    user_uuid UUID NOT NULL PRIMARY KEY,
    firts_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    date_of_birth DATE NOT NULL,
    hash VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT gender_constraint CHECK (gender = 'Female' OR gender = 'Male' OR gender = 'Other')
);