const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  psid: Number,
  img: String, 
  fname: String, 
  lname: String
}, { timestamps: true });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
