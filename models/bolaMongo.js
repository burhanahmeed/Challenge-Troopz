const User = require('../models/User')
const Tantangan = require('../models/Tantangan')
const Participant = require('../models/Participant')

module.exports = {
	setKlub: (params) => {
		return new Promise((resolve, reject) => {
			User.findById(params.id, (err, user) => {
				if (err) { return next(err); }
				user.profile.klub = params.klub || ''
				user.profile.logo = params.logo || ''
				user.save((err, res) => {
					if (err) {
						reject(err)
					} else {
						resolve(res)
					}
				})
			})
		})
	},
	setTantangan: (params) => {
		return new Promise((resolve, reject) => {
			Tantangan.update({psid: ''},params, { upsert : true },(err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
	},
	getlisttantang: () => {
		return new Promise((resolve, reject) => {
			Tantangan.find()
			.sort({vote:-1})
			.exec((err, res) => {
				if (err) {
					reject(err)
					return
				}
				resolve(res)
			})
		})
	},
	getlisttantangincompleted: () => {
		return new Promise((resolve, reject) => {
			Tantangan.find({status: 'incomplete'})
			.sort({vote:-1})
			.exec((err, res) => {
				if (err) {
					reject(err)
					return
				}
				resolve(res)
			})
		})
	},
	upvote: (params) => {
		return new Promise((resolve, reject) => {
			Tantangan.findById(params.id, (err, user) => {
				if (err) { return next(err); }
				user.vote = user.vote + 1 || ''
				user.save((err, res) => {
					if (err) {
						reject(err)
					} else {
						resolve(res)
					}
				})
			})
		})
	},
	complete: (params) => {
		return new Promise((resolve, reject) => {
			Tantangan.findById(params.id, (err, user) => {
				if (err) { return next(err); }
				user.status = 'Complete' || ''
				user.save((err, res) => {
					if (err) {
						reject(err)
					} else {
						resolve(res)
					}
				})
			})
		})
	},
	saveParticipant: (params) => {
		return new Promise((resolve, reject) => {
			Participant.update({psid: params.psid}, params, {upsert: true}, (err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
	},
	getlistparticipant: () => {
		return new Promise((resolve, reject) => {
			Participant.find()
			.exec((err, res) => {
				if (err) {
					reject(err)
					return
				}
				resolve(res)
			})
		})
	}
}