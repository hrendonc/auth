const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/signup', async (req, res, next)=>{
    const {username, password, email} = req.body
    const User = require('../models/User')

    const user = new User({
        username,
        password,
        email
    })

    user.password = await user.encryptPass(user.password) // En minuscula por que se utiliza la instancia y no el modelo
    await user.save()

    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '5m'})
    res.json({
        auth: true,
        token
    })
})

router.post('/signin', (req, res, next)=>{

    res.json({

    })
})

router.get('/me', (req, res, next)=>{
    const token = req.headers['auth']
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No se recibió un token'
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded)
    res.json({
        auth: true,
        message: 'Welcome'
    })
})

module.exports = router