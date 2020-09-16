const express = require('express')
const router = express.Router()
const games = require('../models/game')

// Route to get all games on the server
router.get('/', async (req, res) => {
    try {
        const allgames = await games.find()
        res.json(allgames)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to get one game on the server
router.get('/:id', getGameId, async (req, res) => {
    try {
    const one_game = await games.findById(req.params.id)
    res.json(one_game)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to add game to server
router.post('/', async (req, res) => {
    const game = new games({
        _id: req.body.name,
        name: req.body.name,
        developer: req.body.developer,
        publisher: req.body.publisher,
        platforms: [req.body.platforms],
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

router.delete('/:id', async (req, res) => {

})

async function getGameId(req, res, next) {
    let gameId
    try {
        gameId = await games.findById(req.params.id)
        if (gameId == null) {
            res.status(404).json({message: 'Could not find game by name'})
        }
    } catch (err) {

    }
    res.id = gameId
    next()
}

module.exports = router