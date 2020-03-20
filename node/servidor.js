const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketIO = require('socket.io')
const config = require('./config/keys')

// Modelos para el mongo
const User = require('./models/User')
const Messages = require('./models/Messages')

const port = process.env.PORT || 3001
const app = express()

// Conexión a mongoDB
mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('conectado'))
  .catch((err) => console.log(err))

const server = http.createServer(app)

const io = socketIO(server)

let arr = []

io.on('connection', (socket) => {
  console.log('New client connected' + socket.id)
  //console.log(socket);

  // Cargo los mensajes
  socket.on('load_messages', () => {
    io.sockets.emit('loaded_messages', arr)
  })

  // Detecto login del usuario
  socket.on('login_user', ({ name, email, id: fbId }) => {
    const objUsuario = {
      name,
      email,
      fbId,
    }
    User.findOne({ fbId })
      .then((objUser) => {
        if (!objUser) {
          const newUser = new User(objUsuario)
          newUser
            .save()
            .then(() => {
              console.log('usuario registrado correctamente')
            })
            .catch(() => {
              console.log('ups, ocurrió un error al registrar el usuario')
            })
        } else {
          console.log('ya existía el usuario, solo logeo')
        }
      })
      .catch(() => {
        console.log('ocurrió un error en el modelo usuario')
      })
  })

  socket.on('send_message', (obj) => {
    obj.status = true
    arr.push(obj)
    console.log('mensaje enviado correctamente')
    io.emit('new_message', arr)
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
