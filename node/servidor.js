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

let userBlocked = []

User.find({ active: '0' })
  .then((resBlock) => {
    userBlocked = resBlock
  })
  .catch((errBlock) => {
    console.log(errBlock)
  })

io.on('connection', (socket) => {
  console.log('New client connected' + socket.id)
  //console.log(socket);

  // Cargo los mensajes
  socket.on('load_messages', () => {
    Messages.find({})
      .then((res) => {
        io.sockets.emit('loaded_messages', res)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  // Detecto login del usuario
  socket.on('login_user', ({ name, email, id: fbId }) => {
    const objUsuario = {
      name,
      email,
      fbId,
      active: '1',
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
    // Valida si el usuario está bloqueado
    const blocked = userBlocked.some((e) => e.fbId === obj.userInfo.id)

    const objMessage = {
      message: obj.message,
      user: {
        name: obj.userInfo.name,
        email: obj.userInfo.email,
        id: obj.userInfo.id,
        image: obj.userInfo.picture.data.url,
      },
    }
    const message = new Messages(objMessage)
    if (!blocked) {
      message
        .save()
        .then(() => {
          console.log('mensaje enviado correctamente')
          Messages.find({})
            .then((resAlls) => {
              io.emit('new_message', resAlls)
            })
            .catch(() => {
              console.log('ups, ocurrió un error al consumir los mensajes')
            })
        })
        .catch(() => {
          console.log('ups, ocurrió un error al guardar el mensaje')
        })
    }
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static('build'))

server.listen(port, () => console.log(`Listening on port ${port}`))
