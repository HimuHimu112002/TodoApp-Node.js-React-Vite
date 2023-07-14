const express = require('express')
const app = express()
const dbBase = require("./database/database.js")
require('dotenv').config()
const cors = require('cors')
const routes = require("./routes/index.js")

app.use(cors())
app.use(express.json())
dbBase()

app.use(routes)


app.get('/TodoTest', function (req, res) {
  res.send('Hello World')
})

app.listen(8000)