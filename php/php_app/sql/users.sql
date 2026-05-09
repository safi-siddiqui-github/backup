-- Create Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Add unique email column to Users table
ALTER TABLE php_app.Users
ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL;

-- Move email column after username in Users table
ALTER TABLE php_app.Users
MODIFY COLUMN email VARCHAR(255) UNIQUE NOT NULL AFTER username;

-- Insert a user into Users table
INSERT INTO USERS (username, email, password) VALUES ('john', 'john@gmail.com', 'john');

-- Update User
UPDATE USERS SET password = 'john-doe' WHERE id = 1;

-- Delete user with id 3 (and associated notes due to ON DELETE CASCADE)
DELETE FROM users WHERE id = 3;