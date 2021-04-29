DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    movie_name TEXT NOT NULL,
    movie_review TEXT NOT NULL,
    review_date TEXT NOT NULL
);


