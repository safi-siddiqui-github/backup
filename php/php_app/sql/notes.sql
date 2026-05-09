-- Create Notes table with user_id as a foreign key
CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES php_app.Users(id) ON DELETE CASCADE
);

-- Insert a user into notes table
INSERT INTO NOTES (title, description, user_id) VALUES ('Meeting', 'Discuss project details', 1);

-- Drop the existing foreign key constraint
ALTER TABLE php_app.Notes
DROP FOREIGN KEY fk_user_id;

-- Add the new foreign key constraint with ON DELETE CASCADE
ALTER TABLE php_app.Notes
ADD CONSTRAINT fk_user_id
    FOREIGN KEY (user_id) 
    REFERENCES php_app.Users(id) 
    ON DELETE CASCADE;
