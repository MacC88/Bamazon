DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(5) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(50) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, "xbox one x", "gaming", 399.99, 5),
				(2, "xbox wireless controller", "gaming", 39.99, 12),
				(3, "acer CB272", "electronics", 154.99, 8),
				(4, "COD-MW", "gaming", 59.99, 30),
				(5, "hyperX cloudII", "gaming", 84.00, 21),
				(6, "wood table", "furniture", 100.00, 11),
				(7, "blanket", "home", 49.99, 2),
				(8, "food scale", "home", 11.95, 30),
				(9, "kitchen aid", "home", 259.99, 9),
				(10, "struts", "automotive", 149.99, 7)