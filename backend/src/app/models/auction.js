const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    participantId: {
        type: String,
    },
    participantName: {
        type: String,
    },
    itemId: {
        type: String,
        require: false,
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
    }
});

const Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
