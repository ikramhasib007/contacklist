/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// retriveing contacts
router.get('/contacts', (req, res, next) => {
	Contact.find(function(err, contacts){
		res.json(contacts);
	});
});

// adding contact
router.post('/contact', (req, res, next) => {
	let newContact = new Contact({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone
	});

	newContact.save((err, done) => {
		if(err){
			res.json({msg: 'Failed to add contact'});
		} else {
			res.json({msg: 'Contact added successfully!'});
		}
	});
});

// deleting contact
router.delete('/contact:id', (req, res, next) => {
	Contact.remove({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	});
});


module.exports = router;