const Customer = require('../models/customerModel');
const Sales = require('../models/salesModel');


exports.getAllCustomers = (req, res, next) => {
    Customer.fetchAll()
        .then(([customers, fieldData]) => {
            res.json({ customers: customers });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};


exports.getCustomerById = (req, res, next) => {
    console.log("Received ID:", req.params.customerId); // Log the received ID

    const customerId = parseInt(req.params.customerId);

    console.log("Parsed Customer ID:", customerId); // Log the parsed ID

    // Check if customerId is a valid number
    if (isNaN(customerId)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
    }

    Customer.findById(customerId)
        .then(([customer, fieldData]) => {
            if (customer.length > 0) {
                res.json({ customer: customer[0] });
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};






exports.postEditCustomer = (req, res, next) => {
    const customer = new Customer(req.body.id, req.body.name, req.body.email);
    customer.update()
        .then(() => {
            res.json({ message: 'Customer updated successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};




exports.postAddCustomer = (req, res, next) => {
    const customer = new Customer(null, req.body.name, req.body.email);
    customer.save()
        .then(() => {
            res.status(201).json({ message: 'Customer added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
};

exports.deleteCustomerById = (req, res, next) => {
    Customer.deleteById(req.params.customerId)
        .then(() => {
            res.json({ message: 'Customer deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
}





