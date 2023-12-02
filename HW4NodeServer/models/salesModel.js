const db = require('../util/database');

class Sales {
    constructor(id, customerId, itemId, quantity, salesDate) {
        this.SalesID = id;
        this.CustomerID = customerId;
        this.ItemID = itemId;
        this.Quantity = quantity;
        this.SalesDate = salesDate;
    }

    save() {
        return db.execute('INSERT INTO sales (CustomerID, ItemID, Quantity, SalesDate) VALUES (?, ?, ?, ?)', [this.CustomerID, this.ItemID, this.Quantity, this.SalesDate]);
    }

    static fetchAll() {
        return db.execute(`
            SELECT sales.SalesID, sales.SalesDate, sales.Quantity, 
                   customer.CustomerName, item.ItemName,
                   item.ItemPrice * sales.Quantity AS TotalSales
            FROM sales
            JOIN customer ON sales.CustomerID = customer.CustomerID
            JOIN item ON sales.ItemID = item.ItemID
        `);
    }

    static findById(id) {
        return db.execute('SELECT * FROM sales WHERE SalesID = ?', [id]);
    }

    update() {
        return db.execute('UPDATE sales SET CustomerID = ?, ItemID = ?, Quantity = ?, SalesDate = ? WHERE SalesID = ?', [this.CustomerID, this.ItemID, this.Quantity, this.SalesDate, this.SalesID]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM sales WHERE SalesID = ?', [id]);
    }

    static fetchTopSalesByMonth() {
        return db.execute(`
            SELECT DATE_FORMAT(sales.SalesDate, '%Y-%m') as Date, SUM(item.ItemPrice * sales.Quantity) AS TotalSales
            FROM sales
            JOIN item ON sales.ItemID = item.ItemID
            GROUP BY DATE_FORMAT(sales.SalesDate, '%Y-%m')
            ORDER BY TotalSales DESC
            LIMIT 5;
        `);
    }
    static fetchCurrentMonthSales() {
        return db.execute(`
        SELECT sales.SalesID, sales.SalesDate, sales.Quantity, 
               customer.CustomerName, item.ItemName,
               item.ItemPrice * sales.Quantity AS TotalSales
        FROM sales
        JOIN customer ON sales.CustomerID = customer.CustomerID
        JOIN item ON sales.ItemID = item.ItemID
        WHERE MONTH(sales.SalesDate) = MONTH(CURRENT_DATE())
        AND YEAR(sales.SalesDate) = YEAR(CURRENT_DATE())
    `);
    }

}

module.exports = Sales;
