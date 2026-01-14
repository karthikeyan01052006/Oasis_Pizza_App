const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const cors = require('cors');
require('dotenv').config();
const authRoute = require('./routes/auth');

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use('/api/auth', authRoute);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
    res.send("Pizza Delivery Server is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
});