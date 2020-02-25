const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

require('dotenv').config();

// Item Model
const User = require('../../models/User');

// @route Post api/auth
// @desc Auth user
// @access Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	try {
		// Check for existing user
		const user = await User.findOne({ email });
		if (!user) throw Error('User does not exist');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw Error('Invalid credentials');

		const token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
			expiresIn: 3600
		});
		if (!token) throw Error('Couldnt sign the token');

		res.status(200).json({
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email
			}
		});
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// @route GET api/auth/user
// @desc Get user date
// @access Private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
});
module.exports = router;
