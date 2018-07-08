const API_AI_TOKEN = 'cf9e9603edaa40d5a52f361fe0b20cd2';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAF2Uk6sGhYBAN0I2G7O5ORIhoEu9jnkfx1Je7cLf7MRSggCsqoEpFZCGZBIlJ7YeOKbNjD8TA3jVhA1vMnaXpZBUBQWF5i8JCyVny1zZBcZBX1XKZAySxvMJ6UaWqR0HZB5JvhG4yViZCWZBcinJTs9GirZB2DeNw7fHzgbWVqhZBGvISiBmpHauo5';
const request = require('request');

const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};

module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;

const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'troopzbot'});

apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;

sendTextMessage(senderId, result);
 });

apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};