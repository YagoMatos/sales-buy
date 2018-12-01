const mongoose = require('../../database');

const AuctioneerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    admin:{
        type: Boolean,
        default: true, 
    }
});

const Auctioneer = mongoose.model('Auctioneer', AuctioneerSchema);
module.exports = Auctioneer;