const express= require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
io.on('connection',(socket)=>{
    console.log('connected with socket id => ',socket.id);
    socket.on('boom',()=>{
        console.log("boom recieved from ",socket.id);
    })
    setInterval(()=>{
        socket.emit('whizz')
    },2000)
})
server.listen(4433,()=>{
    console.log("Server started on http://localhost:4433");
})
app.use('/',express.static(__dirname+'/public'))
