const bcrypt = require('bcrypt');
const User = require("../model/userModel.js")
const emailVelidation = require("../helpers/emailValidation.js")
const EmailVarification = require("../helpers/emailSend.js")
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationController =  async (req, res)=>{

    const {fullname, email, phone, password} = req.body

    if(!fullname){
        res.send({error: "Please Enter Your Fullname"})
    }else if(!email){
        res.send({error: "Please Enter Your Email"})
    }else if(!emailVelidation(email)){
        res.send({error: "Please enter the valid email"})
    }else if(!phone){
        res.send({error: "Please Enter Your Phone Number"})
    }else if(!password){
        res.send({error: "Please Enter The Password"})
    }
    else {

        let duplicateEmail = await User.find({email})
    
        if(duplicateEmail > 0){
            return res.send({error: "This email already in used"})
        }
        bcrypt.hash(password, 10, async function(err, hash) {
            let user = new User({
                fullname: fullname,
                email: email,
                phone: phone,
                password: hash,
                
            })

            user.save()
            
            const generator2 = aleaRNGFactory(Date.now());
            let randomOtpNumber = generator2.uInt32().toString().substring(0, 4)
        
            EmailVarification(email,randomOtpNumber)
            res.send({success: "Registration Successfull Thank You"})

        });
        
    }
}

async function GetUserName(req, res) {
    const data = await User.find({})
    res.send(data)
}

module.exports = {registrationController,GetUserName};