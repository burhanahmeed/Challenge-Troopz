const request = require('request')
var token = 'EAAF2Uk6sGhYBAAIWvHfuNBngh3ZAdRvJQKlAcCVZC8CLHPaRgKeRy5m03KphAMI9CK78ghEr9U0bkFiBcEn9zHVt4ZBZAHYZBIz2Vc5LE9MdQvOb7lWA1HBKvRZBnoXhneZA9ZA5HBPZB3JQZBYp6Jme3PJyuAtZC6xkkEL4DoGeQJyT7jnGvz4WuoK'

exports.speechHandler = (text, id, cb) => {
	var reqObj = {
    url: 'https://api.dialogflow.com/v1/query?v=20170712',
    headers: {
      "Content-Type":"application/json",
      "Authorization":"Bearer 1f9fd018d0b8414e91001e0caf073556"
    },
    method: 'POST',
    json: {
      "query":text,
      "lang":"id",
      "sessionId":id
    }
  };
  request(reqObj, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', JSON.stringify(error));
      cb(false)
    } else {
      console.log(JSON.stringify(body))
      cb(body.result);
    }
  });
}

exports.buttonTemplate = (text) => {
  return {
    "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Info",
                        "payload":"info"
                    }
                ]
            }
      }
  }
}

exports.lihattantangTemplate = (text) => {
  return {
    "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": "Tantangan yang harus diselesaikan adalah "+text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"I've done it",
                        "payload":"/done"
                    },
                    {
                        "type":"postback",
                        "title":"Just Vote",
                        "payload":"/justvote"
                    }
                ]
            }
      }
  }
}
exports.messageHandler = (text, id, cb) => {
var data = {
    recipient: {
      id: id
    },
    message: text,
    get_started:{
        payload:"GET_STARTED"
    }
  }
  var reqObj = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: data
  }
  request(reqObj, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', JSON.stringify(error));
      cb(false)
    } else if (response.body.error) {
      console.log("API Error: " + JSON.stringify(response.body.error));
      cb(false)
    } else{
      cb(true)
    }
  })
}
exports.getProfile = (id, cb) => {
  var reqObj = {
    url: 'https://graph.facebook.com/v2.6/'+id+'?access_token='+token,
    method: 'get'
  }
  request(reqObj, function(error, response, body){
    // console.log(body)
    if (error) {
      cb(false)
    } else {
      cb(body)
    }
  })
}