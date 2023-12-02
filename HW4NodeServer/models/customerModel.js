const db = require('../util/database');

class Customer {
    constructor(id, name, email) {
        this.CustomerID = id;
        this.CustomerName = name;
        this.CustomerEmail = email;
    }

    save() {
        return db.execute('INSERT INTO customer (CustomerName, CustomerEmail) VALUES (?, ?)', [this.CustomerName, this.CustomerEmail]);
    }

    static fetchAll() {
        return db.execute(`
        SELECT customer.CustomerID, customer.CustomerName, customer.CustomerEmail, SUM(item.ItemPrice * sales.Quantity) AS TotalSales
        FROM customer
        LEFT JOIN sales ON sales.CustomerID = customer.CustomerID
        LEFT JOIN item ON sales.ItemID = item.ItemID
        GROUP BY customer.CustomerID, customer.CustomerName, customer.CustomerEmail
    `);
    }

    static findById(id) {
        return db.execute('SELECT * FROM customer WHERE CustomerID = ?', [id]);
    }

    update() {
        return db.execute('UPDATE customer SET CustomerName = ?, CustomerEmail = ? WHERE CustomerID = ?', [this.CustomerName, this.CustomerEmail, this.CustomerID]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM customer WHERE CustomerID = ?', [id]);
    }

    static fetchTopCustomersBySales() {
        return db.execute(`
            SELECT customer.CustomerName, SUM(item.ItemPrice * sales.Quantity) AS TotalSales
            FROM sales
            JOIN customer ON sales.CustomerID = customer.CustomerID
            JOIN item ON sales.ItemID = item.ItemID
            GROUP BY customer.CustomerName
            ORDER BY TotalSales DESC
            LIMIT 5;
        `);
    }
}

module.exports = Customer;

