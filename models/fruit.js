const {Schema, model} = require('./connection')


const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String,
})

const Fruit = model('fruit', fruitSchema)

module.exports = Fruit