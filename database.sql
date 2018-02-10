CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(255),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	city VARCHAR(50),
	state CHAR(2)
);

INSERT INTO users (username, password,first_name,last_name,city,state)
VALUES ('darrenrector','betelguice', 'Darren', 'Rector', 'New Hope', 'MN');

select * from users;