// Variables to set-up game router. Sets up a Games variable to use the game schema in the models directory
const express = require('express')
const router = express.Router()
const Games = require('../models/game')

// Route to get all games on the server
router.get('/', async (req, res) => {
    try {
        const allgames = await Games.find()
        res.json(allgames)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to get one game on the server
router.get('/:id', getGame, async (req, res) => {
    try {
    await res.json(res.game)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to add game to server
router.post('/', async (req, res) => {
    const game = new Games({
        name: req.body.name,
        developer: req.body.developer,
        publisher: req.body.publisher,
        platforms: [req.body.platforms],
        release_date: req.body.release_date,
        genre: req.body.genre,
        description: req.body.description
    })
    try {
        const newGame = await game.save()
        res.status(201).json(newGame)
    }
    catch (err) {
    res.status(501).json({message: err.message})
    }
})

// Route to delete game from server by id
router.delete('/:id',getGame, async (req, res) => {
    try {
        await res.game.remove()
        res.json({message: "Game removed"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to update a game
router.patch('/:id', getGame, async (req, res) => {
    if (req.body.name != null) {
        res.game.name = req.body.name
    } if (req.body.developer != null) {
        res.game.developer = req.body.developer
    } if (req.body.publisher != null) {
        res.game.publisher = req.body.publisher
    } if (req.body.platforms != null) {
        res.game.platforms = req.body.platforms
    } if (req.body.release_date != null) {
        res.game.release_date = req.body.release_date
    } if (req.body.genre != null) {
        res.game.genre = req.body.genre
    } if (req.body.description != null) {
        res.game.description = req.body.description
    }
    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Separate function to get a single game by it's id in the document. This game object is passed as middleware for REST functions.
async function getGame(req, res, next) {
    let game
    let id = req.params.id
    try {
        game = await Games.findById(id)
        if (game == null) {
            return res.status(404).json({message: 'Could not find game by name'})
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
    res.game = game
    next()
}

module.exports = router