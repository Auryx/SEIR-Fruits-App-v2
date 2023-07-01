const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

router.post('/signup', async (req, res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        await User.create(req.body);
        res.redirect('/user/login');
    }catch{
        res.send('there was an error');
    }
});

router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username})
   
    if(!user) {
        res.send('user does not exist')
    } else {
        const passMatch = bcrypt.compareSync(req.body.password, user.password)
   
        if(passMatch){
            req.session.username = req.body.username
            req.session.loggedIn = true
    
            
            res.redirect('/fruits')
        }else{
            res.send('incorrect password')
        }
    }
    
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
})

module.exports = router