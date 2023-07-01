const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = express.Router()

router.get('/singup', (req, res) => {
    res.render('user/signup.ejs')
})

router.post('/singup', (req, res) => {
    res.send('signup')
})

router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', (req, res) => {
    res.send('login')
})