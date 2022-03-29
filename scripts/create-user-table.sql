CREATE TABLE IF NOT EXISTS location (
    location_uuid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    longitude VARCHAR(20),
    latitude VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS RSO (
    rso_uuid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS university (
    university_uuid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    num_students INTEGER,
    description VARCHAR(100) NOT NULL,
    location UUID,
    FOREIGN KEY(location) REFERENCES location(location_uuid)
);

CREATE TABLE IF NOT EXISTS users (
    user_uuid UUID NOT NULL PRIMARY KEY,
    firts_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    date_of_birth DATE NOT NULL,
    hash VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL,
    university_uuid UUID,
    FOREIGN KEY(university_uuid) REFERENCES university(university_uuid),
    CONSTRAINT gender_constraint CHECK (gender = 'Female' OR gender = 'Male' OR gender = 'Other')
);

CREATE TABLE IF NOT EXISTS admin (
    admin_uuid UUID NOT NULL PRIMARY KEY,
    user UUID,
    university UUID,
    FOREIGN KEY(user) REFERENCES users(user_uuid),
    FOREIGN KEY(university) REFERENCES university(university_uuid)
);

CREATE TABLE IF NOT EXISTS super_admin (
    super_admin_uuid UUID NOT NULL PRIMARY KEY,
    user_uuid UUID,
    FOREIGN KEY(user_uuid) REFERENCES users(user_uuid)
);

CREATE TABLE IF NOT EXISTS user_going_to (
    user_going_to UUID NOT NULL PRIMARY KEY,
    user UUID,
    event UUID,
    FOREIGN KEY(user) REFERENCES users(user_uuid),
    FOREIGN KEY(event) REFERENCES RSO(event_uuid)
);

CREATE TABLE IF NOT EXISTS rso_member (
    rso_member UUID NOT NULL PRIMARY KEY,
    user UUID,
    rso UUID,
    FOREIGN KEY(user) REFERENCES users(user_uuid),
    FOREIGN KEY(rso) REFERENCES RSO(rso_uuid)
);

CREATE TABLE IF NOT EXISTS create_rso (
    create_rso UUID NOT NULL PRIMARY KEY,
    user UUID,
    rso UUID,
    FOREIGN KEY(user) REFERENCES users(user_uuid),
    FOREIGN KEY(rso) REFERENCES RSO(rso_uuid)
);

CREATE TABLE IF NOT EXISTS admin_owns_rso (
    admin_owns_rso UUID NOT NULL PRIMARY KEY,
    admin_uuid UUID,
    rso_uuid UUID,
    FOREIGN KEY(admin_uuid) REFERENCES admin(admin_uuid),
    FOREIGN KEY(rso_uuid) REFERENCES RSO(rso_uuid)
);

CREATE TABLE IF NOT EXISTS events (
    events_uuid UUID NOT NULL PRIMARY KEY,
    time DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    admin_uuid UUID,
    super_admin_uuid UUID,
    rso_uuid UUID,
    university_uuid UUID,
    location UUID,
    FOREIGN KEY(location) REFERENCES location(location_uuid),
    FOREIGN KEY(admin_uuid) REFERENCES admin(admin_uuid),
    FOREIGN KEY(super_admin_uuid) REFERENCES super_admin(super_admin_uuid),
    FOREIGN KEY(rso_uuid) REFERENCES rso(rso_uuid),
    FOREIGN KEY(university_uuid) REFERENCES university(university_uuid)
);

CREATE TABLE IF NOT EXISTS ratings (
    rating_uuid UUID NOT NULL PRIMARY KEY,
    events_uuid UUID,
    user_uuid UUID,
    rating INTEGER,
    FOREIGN KEY(events_uuid) REFERENCES events(events_uuid),
    FOREIGN KEY(user_uuid) REFERENCES users(user_uuid),
    CONSTRAINT rating_constraint CHECK (rating <= 5 AND rating >=1)
);

CREATE TABLE IF NOT EXISTS comments (
    comment_uuid UUID NOT NULL PRIMARY KEY,
    events_uuid UUID,
    user_uuid UUID,
    comment VARCHAR(100) NOT NULL,
    FOREIGN KEY(events_uuid) REFERENCES events(events_uuid),
    FOREIGN KEY(user_uuid) REFERENCES users(user_uuid)
);
