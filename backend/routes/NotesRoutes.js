const express =require("express")
const {NoteModel} =require("../models/NoteModels")


const noteRouter=express.Router()

noteRouter.post("/create",async(req,res)=>{
try {
    const Note= new NoteModel(req.body)
   await Note.save()
    res.status(200).send({"msg":"New Note Added "})
} catch (error) {
    res.status(400).send({"msg":error})
}
}) 

noteRouter.get("/",async(req,res)=>{
try {
    const notes= await NoteModel.find({authorId:req.body.authorId})
    res.status(200).send(notes)
} catch (error) {
    res.status(400).send({"msg":error.message})
}
})

noteRouter.patch("/update/:noteId",async(req,res)=>{
const {noteId}=req.params
const note=await NoteModel.findOne({_id:noteId})
try {
    if(req.body.authorId!==note.authorId ){
res.send({"msg":"you are not authorised"})
    }else{
        await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
    res.send({"msg":`Note with id ${noteId} has been updated`})
    }
} catch (error) {
    res.send({"msg":error.message})
}
})
noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params
    const note=await NoteModel.findOne({_id:noteId})
    try {
        if(req.body.authorId!==note.authorId ){
    res.send({"msg":"you are not authorised"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteId},req.body)
        res.send({"msg":`Note with id ${noteId} has been deleted`})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={
    noteRouter
}