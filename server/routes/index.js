const express = require('express')
const router = express.Router()
const routerApi = require("./api/index.js")
const api = process.env.BASE_URL

router.use(api, routerApi)
router.use(api,(req, res) => res.json("Api Dose Not Matching"))

module.exports = router