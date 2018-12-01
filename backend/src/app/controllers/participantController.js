const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

const Participant = require('../models/participant');

router.post('/register', async (req, res) => {
    const { cpf } = req.body;

    try {
        if (await Participant.findOne({ cpf }))
            return res.status(400).send({ error: 'Participant já cadastrado' });

        const participant = await Participant.create(req.body);

        return res.send({participant})
        
    } catch (err){
        return res.status(400).send({ error: 'Não foi possivel cadastrar Participant!'});
    }
});

router.get('/:participantId', async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.participantId);

        return res.send({ participant })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/', async (req, res) => {
    try {
        const participant = await Participant.find();

        return res.send({ participant })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.put('/:participantId', async (req, res) => {
    try {
        const { name, cpf, email, admin, endereco, celular, password } = req.body;
        const participant = await Participant.findByIdAndUpdate(req.params.participantId, {
            name, cpf, email, admin, endereco, celular, password
        }, {new: true });

        return res.send({ participant })

    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

module.exports = app => app.use('/participant', router);