// Allows storage of environment variables to be used by .env file
require('dotenv').config()

/** Basic variables to set-up creation of REST API application.
 * Express is used as middleware for the application,
 * and Mongoose allows for interaction with MongoDB database.
 */
const express = require('express')
const mongoose = require('mongoose')

// Variables for two local ports. One for HTTP and the other for HTTPS.
const port = 3000

// Variable to create the Express application and create a new schema for Mongoose.
const app = express()

/** Sets up new connection to local mongoose database using the new URL parser and unified topology options (current versions are deprecated for now). On error, console will display error and string for database connnection error. Success log different string for database connection.
 */
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (err) =>{ console.error(err, 'DB connection error') })
db.once('open', () => {
    console.log('Database connected!')
})

// Allows information passed through application to be used as JSON object
app.use(express.json())

// Variables to allow routing for different REST endpoints. Currently routes to index, games, and developers
const indexRouter = require('./routes/index')
const gameRouter = require('./routes/games')
const developerRouter = require('./routes/developers')

// Tells application to use the indexRouter to point to root, gameRouter to point to the '/games' route, and developerRouter to point to '/developers' route
app.use('/', indexRouter)
app.use('/games', gameRouter)
app.use('/developers', developerRouter)

// Creates a server that listens with the app variable on the port; success displays message in console. On error, resulting error is logged to console
app.listen(port, (err) => {
    if (err) { console.error(err) }
    else { console.log('Server listening on port: ' + port) }
})

