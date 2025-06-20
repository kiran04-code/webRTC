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
const socketToEmailMapping = new Map()
io.on("connection",(socket)=>{
    console.log("User is Connted to Socket.io:",socket.id)
    socket.on("Room:join",data=>{
    const {emailId,roomId} = data
    emailToSocketIdMapping.set(emailId,socket.id)
    socketToEmailMapping.set(socket.id,emailId)
    console.log(`${emailId} join this Room ${roomId}`)
    socket.join(roomId)
    socket.emit("joined-userstherRoom",{roomId})
    socket.broadcast.to(roomId).emit("joined-user",{emailId,roomId})
  })

socket.on("user:call",data=>{
    const {to,offer} = data
    io.to(to).emit("incomming:call'",{from:socket.id,offer})
})

    socket.on("disconnect",()=>{
        console.log("User is DissConnected")
    })
})
server.listen(port,(req,res)=>{
    console.log(`server is Running on PORT http://localhost:${port}`)
})