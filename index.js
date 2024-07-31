const express = require("express")
const http = require("http")
const path = require("path")
const { Server} = require("socket.io")

const app = express(); 

const server = http.createServer(app)
const io = new Server(server)

//Socket.io
// io.on("connection",(socket)=>{
// console.log("A new user has been connected", socket.id);    //socket are the clients we can say user, an devery socket has id
// });
io.on("connection", (socket) => {
    socket.on("user-message",(message)=>{
        // console.log("A new user has been connected", message);
        io.emit("message",message);

    })
});


app.use(express.static(path.resolve("./public")));

app.get('/',( req,res)=>{
    return res.sendFile("./public/index.html");
})


server.listen(6000,()=> console.log(`Server started at PORT:6000`))