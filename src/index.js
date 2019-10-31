const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

// Express middleware
app.use(cors())

// API
app.get('/api', (req, res) => res.json({ message: "My message" }))
app.post('/api/posts', (req, res) => res.json({ message: "Post created" }))

// Run server
app.listen(3000, () => console.log('API running on port 3000'))