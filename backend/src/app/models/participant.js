const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        require: true,
        unique: true,
    },
    celular: {
        type: String,
        require: true,
    },
    endereco: {
        type: String,
        require: true,
    },
    admin: {
        type: Boolean,
        require: true,
        default: false,
    }
});

const Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;