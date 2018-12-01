const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auction', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;