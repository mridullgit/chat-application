const { log } = require('console')
const express = require('express')
const { path } = require('express/lib/application')
const app = express()
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
let users = {
}
let socketMap = {}
server.listen(4433 , ()=>{
    console.log('server started on http://localhost:4433');
})
io.on('connection',(socket)=>{
    console.log("Connected with socket ID : ",socket.id);
     // console.log("recieved ",data.msg);
        //io.emit emits the msg to all the socket connected to itsss
        // socket.broadcast.emit send msgs to all other socketss leaving itself
        // see screenshot 107
    socket.on('msg_send',(data)=>{
        data.from = socketMap[socket.id]
        if(data.to){
            io.to(data.to).emit('msg_rcvd',data)
        }else{
            socket.broadcast.emit('msg_rcvd',data)
        }
       
     
    })
    function login(s,u){//s--->socket u-->username
        s.join(u)          //here username are acting like room for different socket if of one user
        s.emit('logged_in')
        socketMap[s.id] = u
    }
    socket.on('login',(data)=>{
        if(users[data.username]){
            if(users[data.username]==data.password){
               login(socket,data.username)
            }else{
                socket.emit('login_failed')
            }
        }else{
            users[data.username]=data.password
            login(socket,data.username)
        }
    
    })
    

    
})

app.use(express.static(__dirname +'/public/App_html_body.html'))
app.get('/public',function(res,req){
    req.sendFile(__dirname+'/public/App_html_body.html')
})
// console.log(path.join(__dirname+'/public'))
