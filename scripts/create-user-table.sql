CREATE TABLE User (
    user_uid UUID NOT NULL PRIMARY KEY,
    firs_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    date_of_birth DATE NOT NULL,
    hash VARCHAR(MAX),
    email VARCHAR(100),
    CONSTRAINT gender_constraint CHECK (gender = 'Female' OR gender = 'Male' OR gender = 'Other'),
);