var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    title: String,
    cover: String,
    text: String,
    date: Date
});

var newsModel = mongoose.model('User', newsSchema);

module.exports = newsModel;