const express = require('express');
const orderController = require('../controllers/OrderController');

const router = express.Router();

// Get all orders
router.get('/', role(["admin"]), orderController.getAllOrders);

// Get a single order by ID
router.get('/:orderId', orderController.getOrderById);

// Create a new order
router.post('/', orderController.createOrder);

// Update an order by ID
router.put('/:orderId', orderController.updateOrder);

// Delete an order by ID
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;