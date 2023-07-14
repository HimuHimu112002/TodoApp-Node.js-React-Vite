const express = require('express')
const router = express.Router()

const {GetAlltodoItem,PostTodoController,TodoStatusController,TodoDataUpdate,TodoDataDelete} = require("../../controller/todoController.js")

router.post("/NewTask",PostTodoController)
router.post("/todoStatus",TodoStatusController)
router.post("/todoUpdate",TodoDataUpdate)
router.post("/todoDelete",TodoDataDelete)
router.get("/getAllTodo",GetAlltodoItem)

module.exports = router