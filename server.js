// Allows storage of environment variables to be used by .env file
require('dotenv').config()

/** Basic variables to set-up creation of REST API application.
 * HTTP and HTTPS are used for server creation, 
 * Express is used as middleware for the application,
 * and Mongoose allows for interaction with MongoDB database.
 */
const https = require('https')
const express = require('express')
const mongoose = require('mongoose')

// Variables for two local ports. One for HTTP and the other for HTTPS.
const port = 3000

// Variable to create the Express application and create a new schema for Mongoose.
const app = express()
const { schema } = mongoose

// Sets basic Schema for games that takes in properties for name, developer, publisher, platforms, release date, genre, description of game, and image of game.
const gamesSchema = new mongoose.Schema({
    name: String,
    developer: String,
    publisher: String,
    platforms: [{type: String, name: String}],
    release_date: Date,
    genre: String,
    description: String,
    img: {type: Buffer, contentType: String}
})

/** Sets up new connection to local mongoose database using the new URL parser and unified topology options (current versions are deprecated for now). On error, console will display error and string for database connnection error. Success log different string for database connection.
 */
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (err) =>{ console.error(err, 'DB connection error') })
db.once('open', () => {
    console.log('Database connected!')
})

// Creates an HTTP server that listens with the app variable on the second port; success displays message in console. On error, resulting error is logged to console
https.createServer(
    app.listen(port, (err) => {
    if (err) { console.error(err) }
    else { console.log('HTTPS Server listening on port: ' + port) }
}))

