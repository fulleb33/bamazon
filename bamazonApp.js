var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", //TOP SECRET ;D
  database: "bamazonDB"
});

connection.connect(function(err) {
	if (err) throw err;
	start();
});

function start() {
	inquirer.prompt({
		name: 'start',
		type: 'list',
		message: 'What would you like to do?',
		choices: [
			'Browse products',
			'Exit'
		]
	}).then(function(answer) {
		if (answer.start === 'Exit') {
			process.exit();
		}
		if (answer.start === 'Browse products') {
			displayProducts();
		}
	});
}

function displayProducts() {
	var prodList = [];
	var query = 'select item from products';
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			prodList.push(res[i].item);
		}
		// console.log(prodList);
		inquirer.prompt({
			name: 'display',
			type: 'list',
			message: 'What would you like to view?',
			choices: prodList
		}).then(function(answer) {
			var query = 'select stock, price from products where item = ?';
			connection.query(query, [answer.display], function(err, res) {
				if (err) throw err;
				console.log(answer.display + '\nprice: $' + res[0].price + '\nstock: ' + res[0].stock);
				var holdStock = res[0].stock - 1;
				inquirer.prompt({
					name: 'confirm',
					type: 'confirm',
					message: 'Would you like to purchase this product?'
				}).then(function(ans) {
					if (ans.confirm) {
						var query = 'update products set stock = ? where item = ?'
						connection.query(query, [holdStock, answer.display], function(err, res) {
							if (err) throw err;
						});
						console.log('Item purchased! Thank you!');
						start();
					} else {start();}
				})
			});
		});
	});
}