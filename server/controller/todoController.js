const Todo = require("../model/todoModel.js")

function PostTodoController(req, res){
    const{todoname,discription,category} = req.body

    let AddTodo = new Todo({
        todoname:todoname,
        discription:discription,
        category:category
        
    })

    AddTodo.save()
    res.send({Success: "Successfull Add Your New ATask"})
    
}

async function TodoStatusController(req, res){
    const{id, role} = req.body
   
   if(role == "pending" || role == "cancel"){
        await Todo.findOneAndUpdate({_id:id}, {$set:{role: role}}, {new: true})
        return res.send({status: "Status Updated"})

   }else if(role == "approved"){
        await Todo.findOneAndUpdate({_id:id},{$set:{role: role}}, {new: true})
        return res.send({status: "Status Updated"})

   }
}

async function GetAlltodoItem(req, res) {
    const data = await Todo.find({}).populate("category")
    res.send(data)
}

async function TodoDataUpdate(req, res) {
    const {id,todoname} = req.body
    //await Todo.findOneAndUpdate({_id:id},{todoname},{new:true})
    await Todo.findOneAndUpdate({_id:id},{$set:{todoname: todoname}}, {new: true})
    
}

async function TodoDataDelete(req, res) {
    const {id} = req.body
    await Todo.findByIdAndDelete(id)
}

module.exports = {PostTodoController,GetAlltodoItem,TodoStatusController,TodoDataUpdate,TodoDataDelete}