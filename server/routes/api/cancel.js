const express = require('express')
const router = express.Router()
const {CancelControllerSection,GetAlltodoCancel,TodoDataCancel,TodoDataCancelInPending} = require("../../controller/cancelController.js")

router.post("/cancelTodo",CancelControllerSection)
router.get("/cancelTodoGet",GetAlltodoCancel)
router.post("/cancelTodoDelete",TodoDataCancel)
router.post("/cancelTodoDeleteInApproved",TodoDataCancelInPending)


module.exports = router