const http = require('http')
const https = require('https')
const express = require('express')

const port = 3000
const port2 = 3001

const app = express()

http.createServer(
    app.listen(port, (err) => {
    if (err) { console.log(err) }
    else { console.log('HTTP Server listening on port: ' + port) }
}))

https.createServer(
    app.listen(port2, (err) => {
    if (err) { console.log(err) }
    else { console.log('HTTPS Server listening on port: ' + port2) }
}))

