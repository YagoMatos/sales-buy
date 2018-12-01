const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

const Auction = require('../models/auction');

router.post('/register', async (req, res) => {
    const { itemId } = req.body;

    try {
        if (await Auction.findOne({ itemId }))
            return res.status(400).send({ error: 'Produto em Leilão já Criado' });

        const auction = await Auction.create(req.body);

        return res.send({auction})
        
    } catch (err){
        return res.status(400).send({ error: 'Não foi possivel criar o leilão!'});
    }
});

router.delete('/:auctionId', async (req, res) => {
    try {
        const auction = await Auction.findByIdAndRemove(req.params.auctionId);

        return res.send({ auction })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.put('/:auctionId', async (req, res) => {
    try {

        const { closeAt, value, participantName, participantId, isOpen } = req.body;
        
        const auction = await Auction.findByIdAndUpdate(req.params.auctionId, {
            closeAt, value, participantName, participantId, isOpen
        }, {new: true });

        return res.send({ auction })

    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/', async (req, res) => {
    try {
        const auction = await Auction.find();

        return res.send({ auction })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/open', async (req, res) => {
    try {
        const auction = await Auction.find({ isOpen: true });

        return res.send({ auction })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/close', async (req, res) => {
    try {
        const auction = await Auction.find({ isOpen: false });

        return res.send({ auction })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

module.exports = app => app.use('/auction', router);