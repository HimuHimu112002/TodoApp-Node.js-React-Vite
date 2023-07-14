const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        //unique: true,
        require: true,
    },
    password:{
        type: String,
        require: true
    },
    emailVarified:{
        type: Boolean,
        default: false
    },
    randomOtp:{
        type: String,
    },
    
     
})

module.exports = mongoose.model("User", userSchema)