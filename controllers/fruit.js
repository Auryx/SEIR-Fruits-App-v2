const express = require('express')
const Fruit = require('../models/fruit')

const router = express.Router()

router.use((req, res, next) => {
    //req,session
    //check if user is logged in via .session.loggedIn (controller/user.js)
    //if user loggedIn, use next(), gives access to all following routes
    //else redirect to login & signup
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect('/')
    }
})

router.get('/', async (req, res) => {
    const allFruits = await Fruit.find({username: req.session.username})
    res.render('./fruits/index.ejs', {fruits: allFruits, user: req.session.username})
})

router.get('/new', (req, res) => {
    res.render('./fruits/new.ejs')
})

router.post('/', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    }else{
        req.body.readyToEat = false
    }

    req.body.username = req.session.username

    await Fruit.create(req.body)
    res.redirect('/fruits')
})

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id
    const fruit = await Fruit.findById(id)
    res.render('./fruits/edit.ejs', {fruit})
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    console.log(req.body)
    await Fruit.findByIdAndUpdate(id, req.body)
    res.redirect('/fruits')
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    await Fruit.findByIdAndDelete(id)
    res.redirect('/fruits')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fruit = await Fruit.findById(id)
    res.render('./fruits/show.ejs', {fruit})
})

module.exports = router