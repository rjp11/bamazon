var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    launchBamazon();
});

function launchBamazon() {
    console.log("Launched!");
    printInventory();
}

function printInventory() {
    // connect 
    //var query = "SELECT position, song, year FROM top5000 WHERE ?";
    // connection.query(query, {artist: answer.artist }, function (err, res) {
    //             for (var i = 0; i < res.length; i++) {
    //                 console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //             })
    console.log("Inventory Table");
    promptItemID();
};

function promptItemID() {
    // prompt for ID
    
    console.log("Enter ID of item you'd like to purchase: ")
    // var requestID = answer.id;
    // .then call promptQty();
    quantityCheck();
};

function quantityCheck() {
    // prompt for quantity

    console.log("Enter quantity: ")
    // var requestQTY = answer.qty;
    var requestQty = 0;
    // .then query database quantity
    var databaseQty = 0;
    // store database quantity as var = databaseQty 
    if (requestQty <= databaseQty){
        successfulOrder();
    } else {
        console.log("Insufficient Quantity")
        adjustOrder();
    };
};

function successfulOrder() {
    // update quantity in database;
    // get unit quantity for item
    // var cost = databasePrice * requestQty
    var cost = 0;
    console.log(`Successful Order! Total cost: ${cost}`);
    anotherPurchase();
};

function adjustOrder() {
    // prompt for adjust qunatity?
    // Y or N
    // if Y
    quantityCheck()
    // if N
    // exit
}

function anotherPurchase() {
    //prompt for make another purchase
    // Y or N
    // .then if answer = Y
    // launchBamazon();
    // if no
    // exit
    process.exit();
};
