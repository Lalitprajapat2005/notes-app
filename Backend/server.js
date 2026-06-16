require('dotenv').config()
const app = require('./src/app')
const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")
const { request } = require('express')

connectToDb()

app.listen(3000, ()=>{
    console.log("Server running port 3000")
})
