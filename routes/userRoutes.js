const express=require("express")
const { UserModel } = require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,age,name}=req.body
try {
    bcrypt.hash(password, 5, async(err, hash)=> {
       if(hash){
        const User= new UserModel({email,age,name,password:hash})
        await User.save()
        res.status(200).send({"msg":"New User Registered."}) 
       }else{
        res.status(400).send({"err":err.message})
       }  
    });
    
} catch (error) {
   res.send({err:error}) 
}


})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
    const loggeduser=await UserModel.findOne({email})
    if(loggeduser){
        bcrypt.compare(password, loggeduser.password, (err, result)=> {
            if(result){
                const token=jwt.sign({authorId:loggeduser._id,author:loggeduser.name},"backend")
                res.status(200).send({"msg":"Login successfull","token":token})
            }else{
                rs.send({"msg":"Wrong Credential"})
            }
        });
       
    }else{
        res.status(200).send({"msg":"Wrong Credential"})
    }

} catch (error) {
    res.status(400).send({
        "msg":error
    })
}
})

module.exports={
    userRouter
}