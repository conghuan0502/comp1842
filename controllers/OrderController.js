const express = require('express');
const Order = require('../models/order');

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one order
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Create an order
router.post('/', async (req, res) => {
    const order = new Order({
        customerName: req.body.customerName,
        item: req.body.item,
        quantity: req.body.quantity,
        price: req.body.price
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an order
router.patch('/:id', getOrder, async (req, res) => {
    if (req.body.customerName != null) {
        res.order.customerName = req.body.customerName;
    }
    if (req.body.item != null) {
        res.order.item = req.body.item;
    }
    if (req.body.quantity != null) {
        res.order.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
        res.order.price = req.body.price;
    }

    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Deleted Order' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.order = order;
    next();
}

module.exports = router;