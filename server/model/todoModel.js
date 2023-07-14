const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoname:{ 
        type: String,
        require: true 
    },
    discription:{ 
        type: String,
        require: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    created:{
        type: Date,
        default: Date,
    },
    role:{
        type: String,
        default: "pending",
        enum:["approved", "pending", "cancel"]
    },
   
});

module.exports = mongoose.model('Todo', todoSchema);