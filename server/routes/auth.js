const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRATION
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Hash the password before saving for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json("Wrong Email!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json("Wrong Password!");

        // Create a token that the user can use to stay logged in
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;