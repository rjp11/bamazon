var mysql = require("mysql");
var inquirer = require("inquirer");
var isNumber = require('is-number');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
    multipleStatements: true
});

var requestQty;
var availableQty;
var orderID;

// connect to database and launch application
connection.connect(function (err) {
    if (err) throw err;
    launchBamazon();
});

function launchBamazon() {
    // confirm launch of Bamazon
    console.log(`
    -------------------------------
    Welcome to Bamazon!
    Our current inventory is below
    -------------------------------`);
    // display available items & price
    printInventory();
}

function printInventory() {
    var query = "SELECT * FROM products;";
    connection.query(query, function (err, response) {
        if (err) throw err;
        // loop to iterate over the inventory databse and print results
        for (var i = 0; i < response.length; i++) {
            // only display items that are in stock  
            if (response[i].stock_quantity > 0 ){
                console.log(`\nID: ${response[i].id} || Product: ${response[i].product_name} || Price: $${response[i].price}`);
            };
        };
        // prompt user for ID of item to purchase
        promptItemID()
    });

};

// prompts user for ID 3 of item to purchase
// queries the database and stores the available quantity of that item
function promptItemID() {
    inquirer.prompt({
        name: "orderID",
        type: "input",
        message: "Enter ID of item you'd like to purchase: ",
        validate: function (orderID) {
            if (isNumber(orderID) && orderID <= 10 && orderID > 0){
                return true;
            } else {
                return false;
            };
        }
    })
    .then(function (answer) {
        orderID = answer.orderID;
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {
            id: orderID,
        }, function (err, response) {
            availableQty = response[0].stock_quantity;
            quantityCheck();
        });
    });
};

// propmt user for quantity of order and checks against 
// quantity in database
function quantityCheck() {
    inquirer.prompt({
        name: "quantityPrompt",
        type: "input",
        message: "Enter the quantity you'd like to purchase: ",
        validate: function (quantityPrompt){
            if (isNumber(quantityPrompt) && quantityPrompt > 0) {
                return true;
            } else {
                return false;
            };
        }
    })
    .then(function (answer) {
        requestQty = answer.quantityPrompt
        // check inventory quantity is sufficient to execute the order
        if (requestQty <= availableQty) {
            successfulOrder();
        } else {
            console.log(`Insufficient quantity in warehouse. There are ${availableQty} available.`)
            adjustOrder();
        };
    });

};

function successfulOrder() {
    // update quantity in database;
    var newQty = availableQty - requestQty;
    var query = `UPDATE products SET stock_quantity = ${newQty} WHERE id = ${orderID}`;
    connection.query(`${query}`, function (err) {
        if (err) throw err;
        calculateCost();
    });
};

// funciton to calculate the cost of the order
function calculateCost() {
    // get unit quantity for item
    var query = `SELECT price FROM products WHERE id = ${orderID};`;
    connection.query(`${query}`, function (err, response) {
        if (err) throw err;
        var databasePrice = response[0].price;
        var cost = databasePrice * requestQty;
        console.log(`Successful Order! Total cost: $${cost}`);
        anotherPurchase();
    });
};

// function to adjust user order quantity if request 
// was higher than inventory quantity
function adjustOrder() {
    inquirer.prompt({
        name: "adjustOrder",
        type: "confirm",
        message: "Would you like adjust your order?"
    }).then(function (answer) {
        if (answer.adjustOrder) {
            quantityCheck();
        } else {
            console.log("Sorry we don't have the quantity that you need. Come back soon as we frequently restock our warehouse!")
            process.exit();
        };
    });
};

function anotherPurchase() {
    inquirer.prompt({
        name: "done",
        type: "confirm",
        message: "Would you like to place another order?"
    }).then(function (answer) {
        if (answer.done) {
            printInventory();
        } else {
            console.log("Thank you for shopping with Bamazon today!")
            process.exit();
        };
    });
};