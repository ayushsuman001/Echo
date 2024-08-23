const socket = io()

let name;

do{
    name = prompt('Please enter your name : ')
}while(!name)

let textarea = document.querySelector('#textarea')
textarea.addEventListener('keyup', (e) => {
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user : name,
        message : message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msg)
}

let messageArea = document.querySelector('.message__area')
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}