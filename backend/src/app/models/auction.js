const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    participantId: {
        type: String,
    },
    participantName: {
        type: String,
    },
    itemDescription: {
        type: String,
        require: true,
    },
    itemId: {
        type: String,
        require: true,
    },
    itemName: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    closeAt: {
        type: Date,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    value: {
        type: Number,
        require: true,
    },
    salesman: {
        type: String,
        require: true,
    }
});

const Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
