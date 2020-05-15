DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(20),
    lname VARCHAR(20),
    likes VARCHAR(20),
    dislikes VARCHAR(20),
    purchaseHistory VARCHAR(80),
    budget FLOAT(2)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    category VARCHAR(20),
    price FLOAT(2),
    imageurl TEXT  
);

CREATE TABLE invoices (
    invoiceno INT,
    invoicedate DATE,
    invoiceamount INT,
    userid INT,
    itemid INT, 
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (itemid) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
);