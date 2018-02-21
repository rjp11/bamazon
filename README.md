# bamazon
NU CBC Homework #10 - Week #12 - Node.js &amp; MySQL Retailer App

Bamazon is a node CLI app built with a MySQL database. My version of bamazon contains some essential camping and outdoor gear for your next big adventure.
There are two CLIs for bamazon:
* customer interface
* manager interface

## Customer Interface:
To make a purchase from Bamazon:
* download the repository and call that directory in the terminal.
* Enter `node bamazonCustomer.js` into the command line. A table of products will be displayed with their ID # and cost.
* Follow the prompts on the screen!
* You will be alerted if you request to purchase more items than we have in stock.
    
![bamazon customer example](https://github.com/rjp11/bamazon/blob/master/images/bamCustomer.png)

## Manager Interface:
To utilize the manager functionality:
* dowload the repository and call that directory in the terminal
* Enter `node bamazon.js` into the command line. Managers will be presented with five options node
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    * Exit
* these options are presented to the manager at the completion of each command

### View Products for Sale
* displays a table from the database with ID #, Product Name, Price and Quantity

![bamazon manager view products](https://github.com/rjp11/bamazon/blob/master/images/bamManager1.png)

### View Low Inventory
* displays a table of items with a quantity less than 5.
* if no items currently have a quantity less than 5, returns "No Low Inventory"

![bamazon manager low inventory](https://github.com/rjp11/bamazon/blob/master/images/bamManager2.png)

### Add to Inventory
* manager is prompted to insert the ID of the product to increase and the number of units to add
* manager receives confirmation of update

![bamazon manager add inventory](https://github.com/rjp11/bamazon/blob/master/images/bamManager3.png)

### Add New Product
* manager is prompted to enter the name of the item (the ID # is automatically populated)
* manager selects the department from the list

![bamazon manager add product departments](https://github.com/rjp11/bamazon/blob/master/images/bamManager4.png)

* manager then enters the price and quantity of the item
* manager receives confirmation of product addition

![bamazon manager add product ](https://github.com/rjp11/bamazon/blob/master/images/bamManager5.png)

## Components
This CLI app is built with
* MySQL
* NPM mysql
* NPM inquirer
* NPM is-number
* NPM table

download the repository
github username rjp11

