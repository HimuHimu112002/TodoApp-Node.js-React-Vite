const express = require('express')
const router = express.Router()
const {registrationController,GetUserName} = require("../../controller/ragistrationController.js")
const loginController = require("../../controller/loginController.js")

router.post("/registration",registrationController)
router.post("/login", loginController)
router.get("/username", GetUserName)

module.exports = router