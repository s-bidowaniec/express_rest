const mongoose = require('mongoose')

const concertsSchema = new mongoose.Schema({
    day: {type: Number, required: true},
    performer: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Concert', concertsSchema);