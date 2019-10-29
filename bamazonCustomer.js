var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {

    inquirer.prompt([{
        
		type: "confirm",
		name: "confirm",
        message: "Welcome, do you wish to continue?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            product();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}

function product() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [8, 20, 20, 12, 8]
    });

    displayProduct();

    function displayProduct() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log(table.toString());
            PurchasePrompt();
        });
    }
}

function PurchasePrompt() {

    inquirer.prompt([{
      
		name: "continue",
		type: "confirm",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectProduct();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}

function selectProduct() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many item would you like to purchase?",

        }
    ]).then(function(userPurchase) {

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {
                    console.log("Insufficient quantity!");
                    start();
                } else {
                    console.log("Your total cost is: " + res[i].price * userPurchase.inputNumber);

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    confirmPurchase(newStock, purchaseId);
                }
            }
        });
    });
}

function confirmPurchase(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Do you wish to finalize the purchase?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("Thank you for your order.");
            start();
        } else {
            console.log("Please visit us again");
            start();
        }
    });
}