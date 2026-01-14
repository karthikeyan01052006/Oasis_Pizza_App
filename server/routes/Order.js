const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST route to save new order history
router.post('/save', async (req, res) => {
    try {
        const { userId, items, totalAmount, paymentId } = req.body;
        
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            paymentId
        });

        await newOrder.save();
        res.status(201).json({ message: "Order saved successfully!", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: "Failed to save order history" });
    }
});

module.exports = router;