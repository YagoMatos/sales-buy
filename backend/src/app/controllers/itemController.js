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

router.put('/:itemId', async (req, res) => {
    try {
        const { description, value, title, salesman } = req.body;

        const item = await Item.findByIdAndUpdate(req.params.itemId, {
            description, value, title, salesman
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

module.exports = app => app.use('/item', router);
