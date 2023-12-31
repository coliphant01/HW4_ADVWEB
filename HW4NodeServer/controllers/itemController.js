const Item = require('../models/itemModel');

exports.getAllItems = (req, res, next) => {
    Item.fetchAll()
        .then(([items, fieldData]) => {
            res.json({ items: items });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};


exports.getItemById = (req, res, next) => {
    Item.findById(req.params.itemId)
        .then(([item, fieldData]) => {
            if (item.length > 0) {
                res.json({ item: item[0] });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};


exports.postAddItem = (req, res, next) => {
    const item = new Item(null, req.body.name, req.body.price);
    item.save()
        .then(() => {
            res.status(201).json({ message: 'Item added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};

exports.postEditItem = (req, res, next) => {
    const item = new Item(req.body.id, req.body.name, req.body.price);
    item.update()
        .then(() => {
            res.json({ message: 'Item updated successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};

exports.deleteItemById = (req, res, next) => {
    Item.deleteById(req.params.itemId)
        .then(() => {
            res.json({ message: 'Item deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
}

