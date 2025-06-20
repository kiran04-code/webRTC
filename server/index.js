const express = require("express")

const {Server} = require("socket.io")

const http = require("http")
const cors = require("cors")
const app = express()

const server = http.createServer(app)
app.use(cors())
const port = 5008

const io = new Server(server,{
 cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
 }
})

io.on("connection",(Socket)=>{
    console.log("User is Connted to Socket.io:",Socket.id)
})
server.listen(port,(req,res)=>{
    console.log(`server is Running on PORT http://localhost:${port}`)
})