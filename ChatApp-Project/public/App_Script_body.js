let socket = io()
$('#login').show()
$('#chatBox').hide()
$('#loginbtn').click(()=>{
    socket.emit('login',{
        username : $('#username').val(),
        password : $('#inppassword').val()
    })
})
socket.on('logged_in',()=>{
    $('#login').hide()
    $('#chatBox').show()
})
socket.on('login_failed',()=>{
    window.alert('Username or Password wrong')
})
$('#btnSend').click(()=>{
    socket.emit('msg_send',{
        to: $('#sendto').val(),
        msg: $('#inpMsg').val()
    })
    $('#sendto').val("") 
    $('#inpMsg').val("")
})
socket.on('msg_rcvd',(data)=>{
    $('#ulMsgList').append($('<li>').text(
       `[${data.from}] : ${data.msg}`
    ))
    
})