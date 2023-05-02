const   Mongoose  = require("mongoose");
require('dotenv').config()


const connection = Mongoose.connect(process.env.URL)

module.exports={
    connection
}