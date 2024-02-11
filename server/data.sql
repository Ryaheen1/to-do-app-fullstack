CREATE todoapp;
CREATE TABLE todos(
    id VARCHAR(255) PRIMARY key,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);
 CREATE TABLE users(
   email id VARCHAR(255) PRIMARY key, 
   hased_password VARCHAR(255)
 )
