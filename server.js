//require
const express = require('express')

//instance 
const app = express()
//require dotenv
require('dotenv').config()
//middleware
app.use(express.json())
//DB connect
const connectDB = require('./config/connectDB')
connectDB()

//routes 
app.use('/api/user', require('./routes/user'))
//PORT
PORT = process.env.PORT

//server
app.listen(PORT, (error)=>{
   error?
   console.log(error):
   console.log(`The server is running on http://localhost:${PORT}`)
})