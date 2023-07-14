const express = require('express')
const router = express.Router()
const {CategoryController,GetAlltodoCategory} = require("../../controller/categoryController.js")

router.post("/todocategory",CategoryController)
router.get("/todoGetcategory",GetAlltodoCategory)

module.exports = router