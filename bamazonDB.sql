drop database if exists bamazonDB;
create database bamazonDB;
use bamazonDB;
create table products (
	id int not null auto_increment,
	item varchar(50) not null,
	stock int not null,
	price decimal(10,2) not null,
    primary key (id)
);
insert into products (item, stock, price)
values ('shirts', 20, 10.00), 
('pants', 20, 8.00), 
('hats', 20, 5.50), 
('shoes', 20, 15.00);