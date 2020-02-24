const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(express.json());

// Connect to Mongo
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(console.log('MongoDB Connected...'))
	.catch(error => console.log(error));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
