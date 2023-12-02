const express = require('express');
const router = express.Router();

// Importing the controllers
const homeController = require('../controllers/homeController');
const customerController = require('../controllers/customerController');
const itemController = require('../controllers/itemController');
const salesController = require('../controllers/salesController');

// Routes for Home Data
router.get('/home', homeController.getHomePage);

// Routes for Customers
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:customerId', customerController.getCustomerById);
router.post('/customers', customerController.postAddCustomer);
router.put('/customers/:customerId', customerController.postEditCustomer); // Changed to PUT for updating

// Routes for Items
router.get('/items', itemController.getAllItems);
router.get('/items/:itemId', itemController.getItemById);
router.post('/items', itemController.postAddItem);

// Routes for Sales
router.get('/sales', salesController.getAllSales);
router.get('/sales/:salesId', salesController.getSaleById);

module.exports = router;


