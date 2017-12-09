/* jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

const route = require('./routes/route');

// connect to mongodb
mongoose.createConnection('mongodb://localhost:27017/contactlist');
mongoose.connection.on('connected', () => {
	console.log('Connected to database mongodb @ 27017');
});
mongoose.connection.on('error', (err) => {
	if(err){
		console.log('Error in database eonnection. '+err);
	}
});


//set view engine
app.set('view engine', 'ejs');

// adding middlewire - cors
app.use(cors());

// body - parser
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', route);

// tesing server
app.get('/', (req, res) => {
	res.send('Hi, i m starting..');
});

app.listen(port, () => {
	console.log('Server started at port: '+port);
});