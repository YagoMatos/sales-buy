const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

const Item = require('../models/item');

router.post('/register', async (req, res) => {
    const { title } = req.body;

    try {
        if (await Item.findOne({ title }))
        return res.status(400).send({ error: 'item já cadastrado' });

        const item = await Item.create(req.body);

        return res.send({item})
        
    } catch (err){
        return res.status(400).send({ error: 'Não foi possivel cadastrar este Item!'});
    }
});

router.get('/', async (req, res) => {
    try {
        const item = await Item.find();

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/my/:itemId', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.itemId});

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});


router.put('/:itemId', async (req, res) => {
    try {
        const { description, value, title, salesman, isAble, isAuction, participantId } = req.body;

        const item = await Item.findByIdAndUpdate(req.params.itemId, {
            description, value, title, salesman, isAble, isAuction, participantId
        }, {new: true });

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});


router.delete('/:itemId', async (req, res) => {
    try {
        const item = await Item.findByIdAndRemove({_id: req.params.itemId});

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/open', async (req, res) => {
    try {
        const item = await Item.find({ isAble: true });

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});


router.get('/avaliable', async (req, res) => {
    try {
        const item = await Item.find({ isAuction: true });
        
        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});


router.get('/close', async (req, res) => {
    try {
        const item = await Item.find({ isAble: false });

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

router.get('/part/:participantId', async (req, res) => {
    try {
        const item = await Item.find({ participantId: req.params.participantId });

        return res.send({ item })
    } catch (err){
        return res.status(400).send({ error: 'Tente mais tarde'})
    }
});

module.exports = app => app.use('/item', router);
