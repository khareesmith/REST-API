const mongoose = require('mongoose')

// Sets basic Schema for developers that takes in properties for name, developer, publisher, platforms, release date, genre, description of game, and image of game.
const developersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    notable_franchises: {type: Array, name: String},
    company_type: {type: String, required: true},
    founders: {type: Array, name: String, required: true},
    found_date: {type: Date, default: Date.now},
    headquarters: {type: String},
    website: {type: String}
})

module.exports = mongoose.model('Developers', developersSchema)