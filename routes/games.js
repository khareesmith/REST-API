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
router.get('/:id', (req, res) => {
    res.send(req.params)
})


module.exports = router