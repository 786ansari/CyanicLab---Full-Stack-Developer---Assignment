const http = require("http")
const mongoose = require("mongoose")
const cors = require("cors") 
const express = require("express")
const app = express()
var bodyParser = require('body-parser')
const db = require("./dbconfig/dbconfig")
const router = require("./routes/user.routes")
const dotenv = require("dotenv")
const port= 8002
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use((req,res)=>{
//     res.setHeader('Content-Type', 'text/html');
// })
dotenv.config()
app.use(bodyParser.json())

app.use(cors("*"))
app.use("/api", router)


mongoose.connect(db.dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((result,err)=>{
    if(err){
        console.log("Error===>>>",err)
    }
    else{
        console.log("database is connected")
    }
})

 app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})