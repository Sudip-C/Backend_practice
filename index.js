const express=require("express")
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/userRoutes")
require('dotenv').config()
const jwt=require("jsonwebtoken")
const { auth } = require("./middleware/Authmiddleware")
const { noteRouter } = require("./routes/NotesRoutes")

 
const app=express()
app.use(express.json())
app.use("/users",userRouter)
//protected
app.use(auth)
app.use("/notes",noteRouter)



app.listen(process.env.PORT,async()=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log(error)
}
})