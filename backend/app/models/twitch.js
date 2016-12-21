var mongoose = require('mongoose');

var twitchSchema = new mongoose.Schema({
    id: String,
    nickname: String,
    country: String
});

var twitchModel = mongoose.model('Twitch', twitchSchema);

module.exports = twitchModel;