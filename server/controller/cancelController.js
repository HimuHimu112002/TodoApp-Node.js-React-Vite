const CancelModel = require("../model/cancelModel.js")
const Todo = require("../model/todoModel.js")
let CancelControllerSection = async (req, res)=>{

    const {cancelname,canceldiscription,cancelcategory,cancelstatus} = req.body;
    let cancel = new CancelModel({
        cancelname,
        canceldiscription,
        cancelcategory,
        cancelstatus,
    });
    cancel.save();
    res.send({category: "success cancel"});

}

async function GetAlltodoCancel(req, res) {
    const data = await CancelModel.find({})
    res.send(data)
}

async function TodoDataCancel(req, res) {
    const {id} = req.body
    await Todo.findByIdAndDelete(id)
    res.send("delete hoise")
}

async function TodoDataCancelInPending(req, res) {
    const {id} = req.body
    await CancelModel.findByIdAndDelete(id)
    res.send("delete hoise")
}

module.exports = {CancelControllerSection,GetAlltodoCancel,TodoDataCancel,TodoDataCancelInPending}