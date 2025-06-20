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
const emailToSocketIdMapping = new Map()
io.on("connection",(Socket)=>{
    console.log("User is Connted to Socket.io:",Socket.id)
  Socket.on("Room:join",data=>{
    const {emailId,roomId} = data
    emailToSocketIdMapping.set(emailId,Socket.id)
    console.log(`${emailId} join this Room ${roomId}`)
    Socket.join(roomId)
    Socket.emit("joined-userstherRoom",{roomId})
    Socket.broadcast.to(roomId).emit("joined-user",{emailId})
  })



    Socket.on("disconnect",()=>{
        console.log("User is DissConnected")
    })
})
server.listen(port,(req,res)=>{
    console.log(`server is Running on PORT http://localhost:${port}`)
})