// const klubModel = require('../models/bola')
const klubModelMongo = require('../models/bolaMongo')

exports.index = (req, res) => {
	res.render('contact', {
		title: 'Start'
	})
}

exports.football = (req, res) => {
	// klubModel.get().then((result) => {
	// 	console.log(req.user)
	// 	res.render('troops/footballteam', {
	// 		title: 'Choose Football Team',
	// 		klub: result,
	// 		favorite: req.user.profile.klub,
	// 		logo: req.user.profile.logo
	// 	})
	// }).catch((err) => {
	// 	res.render('troops/footballteam', {
	// 		title: 'Error'
	// 	})
	// })
	res.render('troops/footballteam', {
		title: 'Choose Football Team',		
		favorite: req.user.profile.klub,
		logo: req.user.profile.logo
	})
}

exports.participant = (req, res) => {
	klubModelMongo.getlistparticipant().then((result) => {
		res.render('troops/participant', {
			title: 'View Participant',		
			participant: result
		})
	}).catch((err) => {
		res.render('troops/participant', {
			title: 'View Participant',		
			participant: err
		})
	})
}

exports.challenge = (req, res) => {
	klubModelMongo.getlisttantang().then((result)=> {
		console.log(result)
		res.render('troops/challenge', {
			title: 'Challenge',
			chal: result
		})
	})
}

exports.setKlub = (req, res) => {
	var sendParams = {
		id: req.user.id,
		klub: req.body.vklub,
		logo: req.body.vlogo
	}
	// console.log(req.body)
	klubModelMongo.setKlub(sendParams).then((result) => {
		res.redirect('/football')
	}).catch((err) => {
		res.redirect('/football')
	})
}

exports.voteChal = (req, res) => {
	var sendParams = {
		id: req.body.cid,
	}
	// console.log(req.body)
	klubModelMongo.upvote(sendParams).then((result) => {
		res.redirect('/challenge')
	}).catch((err) => {
		res.redirect('/challege')
	})
}