const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = process.env.PORT || 3001
const app = express()

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New client connected' + socket.id)
  //console.log(socket);
  /*
  socket.on('get_messages', () => {
    io.sockets.emit('messages')
  })
  */

  socket.on('send_message', (obj) => {
    obj.status = true
    console.log('mensaje enviado correctamente')
    io.emit('new_message', obj)
    // collection_messages.insert([message]).then(() => {
    // }).catch(ups => console.log(ups))
  })
  /*
  socket.on('login_user', (user) => {
    console.log('usuario logeado correctamente')
    io.sockets.emit('logged_user', user)
    //io.sockets.emit('new_message')
  })
  */

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static('build'))

server.listen(port, () => console.log(`Listening on port ${port}`))
