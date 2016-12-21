var mongoose = require('mongoose');

var youtubeSchema = new mongoose.Schema({
    id: String,
    name: String,
    title: String
});

var youtubeModel = mongoose.model('Youtube', youtubeSchema);

module.exports = youtubeModel;