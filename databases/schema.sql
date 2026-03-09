-- ECOTECH Database Schema

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL,
    valid_until TEXT
);

CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_key TEXT NOT NULL,
    item_count INTEGER NOT NULL,
    points_earned INTEGER NOT NULL,
    scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Seed Data for Rewards
INSERT INTO rewards (title, provider, description, cost, valid_until) VALUES 
('Eco Tech Sticker', 'Eco Tech', 'Exclusive sticker to support the green movement.', 50, 'Dec 31, 2027'),
('Green Shopping Voucher $25', 'Eco Mart', 'Discount on eco-friendly products.', 250, 'Dec 31, 2026'),
('Mango Tree Sapling', 'Green Nursery', 'Sapling to plant at home or in the community.', 400, 'Jun 30, 2026'),
('Environmental Education 1-Month Access', 'Eco Academy', 'Access to online classes on low-waste living.', 600, 'Mar 31, 2027');
