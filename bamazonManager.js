var mysql = require("mysql");
var inquirer = require("inquirer");
var isNumber = require('is-number');
const {table} = require('table');
let data, 
    output,
    config;

resetData();

function resetData(){
    data = [
        ["ID", "PRODUCT", "PRICE", "QUANTITY"]
    ];
};


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
            data[ i + 1 ] = [response[i].id, response[i].product_name, `$${response[i].price}`, response[i].stock_quantity];
        };
        output = table(data, config);
        console.log(output);

        runManager();

    });
};


function lowInventory() {
    resetData();
    var query = "Select * FROM products WHERE stock_quantity <= 5";

    connection.query(query, function (err, response) {
        if (err) throw err;

        if (response.length === 0) {
            console.log("\nNo low inventory\n")
        } else {
            console.log(`---------------------\nWarehouse Stock:\n---------------------`)
            for (var i = 0; i < response.length; i++) {
                data[ i + 1 ] = [response[i].id, response[i].product_name, `$${response[i].price}`, response[i].stock_quantity];
            };
            output = table(data, config);
            console.log(output);
        };

        runManager();

    });
};


function addInventory() {
    inquirer.prompt([{
            name: "addInventory",
            type: "input",
            message: "Insert product item id to increase inventory: ",
        },
        {
            name: "addQty",
            type: "input",
            message: "Insert the number of items to add to the inventory: ",
            validate: function(addQty) {
                if (isNumber(addQty) && addQty > 0){
                    return true;
                } else {
                    return false;
                };
            }
        }
    ])
    .then(function (answer) {
        var query = `UPDATE products
        SET stock_quantity = stock_quantity + ${answer.addQty}
        WHERE id = "${answer.addInventory}";`;

        connection.query(query, function (err) {
            if (err) throw err;
                console.log("\nInventory Updated!\n")
            runManager();
            }

        )
    })
};


function addProduct() {
    inquirer.prompt([{
            name: "newProduct",
            type: "input",
            message: "Enter new product name: "
        },
        {
            name: "newDept",
            type: "list",
            message: "Enter department of new item: ",
            choices: [
                "camping",
                "accessories",
                "apparel"
            ]
        },
        {
            name: "newPrice",
            type: "input",
            message: "Enter price of new item: "
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Enter quantity of new item: ",
            validate: function(newQuantity) {
                if (isNumber(newQuantity) && newQuantity > 0){
                    return true;
                } else {
                    return false;
                };
            }
        }
    ])
    .then(function (answer) {
        var query = `INSERT INTO products (product_name, department_name, price, stock_quantity) 
        VALUES ("${answer.newProduct}", "${answer.newDept}", ${Number(answer.newPrice)}, ${answer.newQuantity});`

        connection.query(query, function (err) {
            if (err) throw err;
            console.log("Item added successfully!");

            runManager();
        });
    })
};