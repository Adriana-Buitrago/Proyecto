CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    event_type VARCHAR(80) NOT NULL,
    date TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    duration_hours INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS equipment (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    price_per_day INTEGER NOT NULL,
    description TEXT NOT NULL
);
