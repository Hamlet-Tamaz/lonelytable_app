const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUser);


//INDEX
router.get('/', (req, res) => {
	 knex('venues').then((venues) => {
		res.render('venues/index', {
			venues, 
			// message: req.flash('loginMessage')
		});
	});
});


//SHOW
router.get('/:id', (req, res) => {
	knex('venues').where('id', req.params.id).first().then((venue) =>{
		res.render('venues/show', {venue});
	});
});

//FILTER
//WILL NEED TO CORRECT MOST NAMES WITH ACTUAL DB TERMS
router.get('/venues/filter', (req, res) =>{
	knex('tables').whereRaw('seatsAvail >= ?', req.params.filter.seatNeeded).whereRaw('minCost <= ?', req.params.filter.maxPledge).where({
		VenueName: 'filter[venueName]',
		status: req.params.filter.status,
		reviews: req.params.filter.reviews,
		stars: req.params.filter.stars
	})
	res.send()
})

module.exports = router