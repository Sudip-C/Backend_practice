const mongoose= require("mongoose")

 const noteSchema= mongoose.Schema({
    title:{type:String},
    body:{type:String},
    author:{type:String},
    category:{type:String},
    authorId:{type:String}
 },{
    versionKey:false
 })

 const NoteModel=mongoose.model("notes",noteSchema)

 module.exports={
    NoteModel
 }