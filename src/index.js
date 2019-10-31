const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

// Express middleware
app.use(cors())

// API
app.get('/api', (req, res) => res.json({ message: "My message" }))
app.post('/api/posts', (req, res) => res.json({ message: "Post created" }))
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: "pepito",
        email: "pepito@gmail.com"
    }
    const secret = 'alumno2019'

    jwt.sign({ user }, secret, (err, token) => res.json({ token }))
})

// Run server
app.listen(3000, () => console.log('API running on port 3000'))