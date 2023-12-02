const db = require('../util/database');

class Item {
    constructor(id, name, price) {
        this.ItemID = id;
        this.ItemName = name;
        this.ItemPrice = price;
    }

    save() {
        return db.execute('INSERT INTO item (ItemName, ItemPrice) VALUES (?, ?)', [this.ItemName, this.ItemPrice]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM item');
    }

    static findById(id) {
        return db.execute('SELECT * FROM item WHERE ItemID = ?', [id]);
    }

    update() {
        return db.execute('UPDATE item SET ItemName = ?, ItemPrice = ? WHERE ItemID = ?', [this.ItemName, this.ItemPrice, this.ItemID]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM item WHERE ItemID = ?', [id]);
    }

    static fetchTopProductsBySales() {
        return db.execute(`
            SELECT item.ItemName, SUM(item.ItemPrice * sales.Quantity) AS TotalSales
            FROM sales
            JOIN item ON sales.ItemID = item.ItemID
            GROUP BY item.ItemName
            ORDER BY TotalSales DESC
            LIMIT 5;
        `);
    }
}

module.exports = Item;
