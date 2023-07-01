const mongoose = require('./connection')

const { Schema, model } = mongoose // destructured (makes Schema ~~~ mongoose.Schema)

const userSchema = new Schema({
    username: {tupe: String, required: true, unique: true},
    username: {tupe: String, required: true}
})

const User = model('user', userSchema)

module.exports = User