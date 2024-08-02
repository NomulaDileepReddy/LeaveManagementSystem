const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoutes = require("./routes/user")
const userLeavesRoutes = require("./routes/userleave")

const app = express()
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/myLeave_app")

var jsonParser = bodyParser.json()

app.get("/",function(req,res){
    res.send("Leave app server running")
})


app.use("/user",jsonParser,userRoutes)
app.use("/userleave",jsonParser,userLeavesRoutes)

app.listen(5000,function(req,res){
    console.log("Server running at port 5000")
})