CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    username VARCHAR(10),
    avatar_code INTEGER,
    password VARCHAR(8)
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE
);

CREATE TABLE post_like(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);
