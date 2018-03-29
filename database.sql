CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state CHAR(2) NOT NULL
);

CREATE TABLE events (
	eventid SERIAL PRIMARY KEY NOT NULL,
	date DATE NOT NULL,
	userid INT REFERENCES users,
	species VARCHAR(50) NOT NULL,
	event_city VARCHAR(50),
	event_state CHAR(2),
	rod VARCHAR(50),
	reel VARCHAR(50),
	tackle_bait VARCHAR(50),
	body_of_water VARCHAR(100) NOT NULL,
	image_url VARCHAR(255)
);
