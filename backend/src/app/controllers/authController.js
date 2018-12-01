const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

//const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe' });

        const user = await User.create(req.body);

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id })
        });

    } catch (err){
        return res.status(400).send({ error: 'Não foi possivel cadastrar Usuário!'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado!'});
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha ou Email inválido'});

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id })
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado!'});
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'yago.janu@gmail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).send({ error: 'Serviço indisponível, por favor tente mais tarde'})
            
            return res.send()
        })
    } catch (err) {
        res.status(400).send({ error: 'Por favor, tente novamente mais tarde!' })
    }
});


router.post('/reset_password', async (req, res) => {
    const { token, email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');
        
        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado!'});
        
        if(token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token inválido!'});

        const now = new Date();

        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expirado!'});
                
        user.password = password;

        await user.save();
        
        res.send({ok: true})
    } catch (err){
        res.status(400).send({ error: 'Não foi possivel recuperar a senha' })
    }
});

module.exports = app => app.use('/auth', router);