let socket = io()
let btnboom = document.getElementById('boom')
btnboom.onclick = function(){
    socket.emit('boom')
}
socket.on('whizz',()=>{
    let div = document.createElement('div')
    div.innerText = 'whizz'
    document.body.appendChild(div)
}) 