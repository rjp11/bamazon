var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) throw err;
    runManager();
});

function runManager() {
    inquirer.prompt({
            name: "managerOptions",
            type: "list",
            message: "Select an option",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add To Inventory",
                "Add New Products",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.managerOptions) {
                case "View Products for Sale":
                    printInventory();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add To Inventory":
                    addInventory();
                    break;
                case "Add New Products":
                    addProduct();
                    break;
                case "Exit":
                    process.exit();
                    break;
            }
        });
};

function printInventory() {

    var query = "SELECT * FROM products;";

    connection.query(query, function (err, response) {
        if (err) throw err;
        // loop to iterate over the inventory databse and print results
        for (var i = 0; i < response.length; i++) {
            console.log(`\nID: ${response[i].id} || Product: ${response[i].product_name} || Price: $${response[i].price} || Quantity: ${response[i].stock_quantity}`);
        };

        runManager();

    });
};

function lowInventory() {

    var query = "Select * FROM products WHERE stock_quantity <= 5";

    connection.query(query, function (err, response) {
        if (err) throw err;

        if (response.length === 0) {
            console.log("No low inventory")
        } else {
            console.log(`---------------\nWarehouse Stock:\n---------------`)
            for (var i = 0; i < response.length; i++) {
                console.log(`${response[i].product_name}: ${response[i].stock_quantity}\n`);
            };
        };

        runManager();

    });
};

function addInventory() {
    console.log("Add to inventory");
    runManager();
};

function addProduct() {
    console.log("Add New Products");
    process.exit();
};