// Variables to set-up developer router. Sets up a Developers variable to use developer schema in the models directory
const express = require('express')
const router = express.Router()
const Developers = require('../models/developer')

// Route to get all developers on the server
router.get('/', async (req, res) => {
    try {
        const allDevelopers = await Developers.find()
        res.json(allDevelopers)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to get single developer from the server
router.get('/:id', getDeveloper, async (req, res) => {
    try {
    await res.json(res.developer)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to add new developer to server
router.post('/', async (req, res) => {
    const developer = new Developers({
        name: req.body.name,
        notable_franchises: [req.body.notable_franchises],
        company_type: req.body.company_type,
        founders: [req.body.founders],
        found_date: req.body.found_date,
        headquarters: req.body.headquarters,
        website: req.body.website
    })
    try {
        const newDeveloper = await developer.save()
        res.status(201).json(newDeveloper)
    }
    catch (err) {
    res.status(501).json({message: err.message})
    }
})

// Route to delete developer from server by id
router.delete('/:id',getDeveloper, async (req, res) => {
    try {
        await res.developer.remove()
        res.json({message: "Developer removed"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to update a developer. Checks to see which fields are not equal to null and updates that information accordingly.
router.patch('/:id', getDeveloper, async (req, res) => {
    if (req.body.name != null) {
        res.developer.name = req.body.name
    } if (req.body.notable_franchises != null) {
        res.developer.notable_franchises = req.body.notable_franchises
    } if (req.body.company_type != null) {
        res.developer.company_type = req.body.company_type
    } if (req.body.founders != null) {
        res.developer.founders = req.body.founders
    } if (req.body.found_date != null) {
        res.developer.found_date = req.body.found_date
    } if (req.body.headquarters != null) {
        res.developer.headquarters = req.body.headquarters
    } if (req.body.website != null) {
        res.developer.website = req.body.website
    }
    try {
        const updatedDeveloper = await res.developer.save()
        res.json(updatedDeveloper)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Separate function to get a single developer by it's id in the document. This developer object is passed as middleware for REST functions.
async function getDeveloper(req, res, next) {
    let developer
    let id = req.params.id
    try {
        developer = await Developers.findById(id)
        if (developer == null) {
            return res.status(404).json({message: 'Could not find developer by name'})
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
    res.developer = developer
    next()
}

module.exports = router