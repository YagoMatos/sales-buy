const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        require: true,
    },
    salesman: {
        type: String,
        require: true,
    },
    participantName: {
        type: String,
    },
    isAble: {
        type: Boolean,
        default: true
    },
    isAuction: {
        type: Boolean,
        default: true
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
