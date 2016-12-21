var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    login: String,
    pass: String
});

var adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;