const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json());

// Connect to Mongo
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(console.log('MongoDB Connected...'))
	.catch(error => console.log(error));

// Use Routes
app.use('/api/items', require('./routes/api/items'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
