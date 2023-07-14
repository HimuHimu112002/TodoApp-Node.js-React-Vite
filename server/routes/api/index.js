const express = require('express')
const router = express.Router()
const todo = require("./todo.js")
const User = require("./auth.js")
const Category = require("./category.js")
const Approved = require("./approved.js")
const Cancel = require("./cancel.js")

router.use("/Addtodo",todo)
router.use("/authentication",User)
router.use("/category",Category)
router.use("/approve",Approved)
router.use("/cancel",Cancel)

module.exports = router