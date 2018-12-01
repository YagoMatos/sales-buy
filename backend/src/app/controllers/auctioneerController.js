const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

const Auctioneer = require('../models/auctioneer');

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await Auctioneer.findOne({ email }))
            return res.status(400).send({ error: 'Leiloeiro já cadastrado' });

        const auctioneer = await Auctioneer.create(req.body);

        return res.send({auctioneer})
        
    } catch (err){
        return res.status(400).send({ error: 'Não foi possivel cadastrar Leiloeiro!'});
    }
});

router.get('/', async (req, res) => {
    try {
        const auctioneer = await Auctioneer.find();

        return res.send({ auctioneer })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

module.exports = app => app.use('/auctioneer', router);

