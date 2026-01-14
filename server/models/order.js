const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        name: String,
        price: Number,
        details: String
    }],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    status: { type: String, default: 'Paid' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);