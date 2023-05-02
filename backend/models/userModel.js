const mongoose= require("mongoose")

 const userSchema= mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    email:{type:String},
    password:{type:String}
 },{
    versionKey:false
 })

 const UserModel=mongoose.model("user",userSchema)

 module.exports={
    UserModel
 }