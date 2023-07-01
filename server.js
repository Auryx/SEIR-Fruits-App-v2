require('dotenv').config()
const express = require('express')
const app = express()
const FruitRouter = require('./controllers/fruit')
const UserRouter = require('./controllers/user')
const methodOverride = require("method-override")
const session = require('express-session')
const MongoStore = require('connect-mongo')

const PORT = process.env.PORT

//middleware

app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.urlencoded())

app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true, 
    resave: false,
}));

app.use('/fruits', FruitRouter)
app.use('/user', UserRouter)

//controllers
app.get('/', (req, res) => {
    res.render('index.ejs')
})
//end of controllers

app.listen(PORT, () => {
    console.log('app is listening (fruits v2)')
})