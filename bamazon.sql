DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock_quantity INTEGER(5) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tent", "camping", 50.43, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sleeping bag", "camping", 45.23, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tarp", "camping", 32.84, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lantern", "camping", 25.49, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hiking boots", "apparel", 98.75, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wool socks", "apparel", 12.67, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("water bottle", "accessories", 7.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pocket knife", "accessories", 15.45, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headlamp", "accessories", 22.18, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cooler", "accessories", 54.39, 45);

SELECT * FROM products;