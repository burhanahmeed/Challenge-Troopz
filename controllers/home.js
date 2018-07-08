const model = require('../models/bola')
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
	model.get()
	.then((result) => {
		console.log(result)
		res.render('home', {
	    title: 'Home'
	  });
	})
};
