const Sales = require('../models/salesModel');

exports.getAllSales = (req, res, next) => {
    Sales.fetchCurrentMonthSales()
        .then(([sales, fieldData]) => {
            res.json({ sales: sales });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};


exports.getSaleById = (req, res, next) => {
    Sales.findById(req.params.salesId)
        .then(([sale, fieldData]) => {
            if (sale.length > 0) {
                res.json({ sale: sale[0] });
            } else {
                res.status(404).json({ message: 'Sale not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};



