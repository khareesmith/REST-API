const mongoose = require('mongoose')

// Sets basic Schema for games that takes in properties for name, developer, publisher, platforms, release date, genre, description of game, and image of game.
const gamesSchema = new mongoose.Schema({
    _id: {type: String},
    name: {type: String, required: true},
    developer: {type: String, required: true},
    publisher: {type: String, required: true},
    platforms: [{type: String, name: String, required: true}],
    release_date: {type: Date, default: Date.now},
    genre: {type: String, required: true},
    description: {type: String, required: true}
})

module.exports = mongoose.model('Game', gamesSchema)