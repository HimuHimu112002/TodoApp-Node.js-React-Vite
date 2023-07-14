const express = require('express')
const router = express.Router()
const {ApprovedControllerSection,GetAlltodoApproved,TodoDataApprovedInPending} = require("../../controller/approvedController.js")

router.post("/approvedTodo",ApprovedControllerSection)
router.get("/approvedTodoGet",GetAlltodoApproved)
router.post("/approvedDeleteInPending",TodoDataApprovedInPending)


module.exports = router