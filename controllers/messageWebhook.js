var processMessage = require('../helpers/processMessage')
var handler = require('./handler'),
	messageHandler = handler.messageHandler,
	speechHandler = handler.speechHandler,
	buttonTemplate = handler.buttonTemplate,
	lihattantangTemplate = handler.lihattantangTemplate,
	getProfile = handler.getProfile

const klubModelMongo = require('../models/bolaMongo')

exports.index = (req, res) => {
	// console.log(JSON.stringify(req.body))
	// messageHandler(req.body, function(result){
	// 	console.log("Async Handled: " + result)
	// })
	console.log(req.body.entry[0].messaging[0])
	const webhook = req.body.entry[0].messaging[0];
	var id = webhook.sender.id;
	if (webhook.delivery) {
	    console.log('MSG DELIVERY')
	    return false
	}
	if (webhook.read) {
	    return false
	}
	if (webhook.message) {
		var text = webhook.message.text;
		console.log('variabel text : '+text)
	} else {
		var text = webhook.postback.payload;
		console.log('payback text : '+text)
	}
	if (text == 'GET_STARTED') {
		const response = buttonTemplate('Halo selamat datang di ChallengeTroopz, ketik /info untuk melihat informasi')
		getProfile(id, function(profile) {
			// console.log(JSON.parse(profile))
			var jsonObj = JSON.parse(profile)
			var data = {
				psid: id,
				img: jsonObj.profile_pic,
				fname: jsonObj.first_name,
				lname: jsonObj.last_name
			}
			klubModelMongo.saveParticipant(data).then((result_db) => {
				messageHandler(response, id, function(result) {
					console.log('Async : ' + result)
				})
				res.send(req.body);
			}).catch((err) => {
				messageHandler(response, id, function(result) {
					console.log('Async : ' + result)
				})
				res.send(req.body);
			})
		})
		return true
// 		break;
	}

	if (text == '/lihattantangan') {
		if (!webhook.delivery) {
		 	klubModelMongo.getlisttantangincompleted().then((respon)=>{
				var tem = lihattantangTemplate(respon[0].tantangan)
				messageHandler(tem, id, function(result) {
					console.log('Async : ' + result)
				})
			}).catch((err)=> {
				var tem = {text: "Belum ada tantangan atau terjadi kesalahan"}
				messageHandler(tem, id, function(result) {
					console.log('Async : ' + result)
				})
			})   
		}
		return false
// 		break;
	}

	if (text == '/done') {
		klubModelMongo.getlisttantangincompleted().then((respon)=>{
			klubModelMongo.complete({id: respon[0].id}).then((result) => {
				const response = buttonTemplate('Selamat! Misi berhasil, terus selesaikan misi dan bantu sepakbola indonesia menjadi lebih baik :v')
				messageHandler(response, id, function(result) {
					console.log('Async : ' + result)
				})
			})
		})
		return true
	}

	if (text == '/justvote') {
		klubModelMongo.getlisttantangincompleted().then((respon)=>{
			klubModelMongo.upvote({id: respon[0].id}).then((result) => {
				messageHandler({text: "Upvote berhasil"}, id, function(result) {
					console.log('Async : ' + result)
				})
			})
		})
		return true
	}

	speechHandler(text, id, function(speech) {
		// console.log(txtRes)
		if (speech.fulfillment.messages[0].speech) {
			var txtRes = {text: speech.fulfillment.messages[0].speech}
		} else {
			var txtRes = speech.fulfillment.messages[1].payload.facebook
		}
		messageHandler(txtRes, id, function(result) {
			console.log('Async : ' + result)
		})
		if (speech.parameters.klub) {
			if (!speech.actionIncomplete) {
				var arr = {
					psid: id,
					klub: speech.parameters.klub,
					tantangan: speech.parameters.tantangan,
					status: 'incomplete',
					vote: 0
				}
				klubModelMongo.setTantangan(arr).then((result) => {
					res.send(req.body)				
				}).catch((err) => {

				})
			}
		}
	})
	res.send(req.body)
}
