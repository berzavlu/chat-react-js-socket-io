/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Scrollbar from 'react-scrollbars-custom'
import { TiSocialFacebook } from 'react-icons/ti'
import { GoHeart } from 'react-icons/go'
import fade from 'fade'
import UserMessage from '../../components/user-message'

let socket

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState({})
  const [isOVer, setIsOver] = useState(false)

  const scrollMessages = useRef(null)

  // Defino que se inicialice el Socket.io
  useEffect(() => {
    socket = io('http://localhost:3001')
    // Cargar mensajes
    socket.emit('load_messages')

    // Chau chau
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  // Eventos a escuchar para el socket.io
  useEffect(() => {
    // A penas carga la web mostrar el log de msg
    socket.on('loaded_messages', (response) => {
      setMessages(response)
    })

    // Recibo los mensajes de los usuarios
    socket.on('new_message', (response) => {
      setMessages(response)
    })
  }, [])

  // Si los mensajes ya son más largos para poner el scroll
  useEffect(() => {
    if (messages.length > 4 && !isOVer) {
      scrollMessages.current.scrollToBottom()
    }
  }, [messages])

  const sendMessage = () => {
    const text = document.getElementsByName('userText')[0].value
    // validar si esl mensaje no es vaciío fn()

    const obj = {
      userInfo: user,
      message: text,
    }

    socket.emit('send_message', obj)
    document.getElementsByName('userText')[0].value = ''
  }

  const responseFacebook = (response) => {
    socket.emit('login_user', response)
    setUser(response)
    const el = document.querySelector('.chat__login')
    fade.out(el, () => {
      el.remove()
    })
  }

  const handleMouseEnter = () => {
    setIsOver(true)
  }

  const handleMouseLeave = () => {
    setIsOver(false)
  }

  const handleKeyPressMessage = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className='chat'>
      <div className='chat__area'>
        <div className='chat__users'>
          <ul>
            <li>
              <img alt='' src='https://graph.facebook.com/2801223526620365/picture?type=small' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53705764_2304835803071421_4142165059826614272_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=c6rku7VavBcAX-hj8O8&oh=6632a6333c338c740cde570c35169fca&oe=5EB474F5' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82529786_2256971961263588_1343001445569396736_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=qKp4qOP34MYAX8-Vzpl&oh=d844eb22af61b3025d59d67a512fa728&oe=5E9F024D' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/83025875_621437851967200_5054930581859598336_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=fq75AaLWahkAX-tK4wp&oh=178c0a1fe3a8134d306e9bccf5ccf74d&oe=5E9E4F1E' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/23101296_140732679901816_7791387746609659904_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=YtWXlc7jSd4AX8mupE9&oh=4381ff34aeae2c8c9c9194b4df4223e4&oe=5E9B7C1E' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/54513072_319701608727773_7764867337169141760_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=dMp2rK9Vd88AX9IcQWi&oh=99c3ca9e06f652df0363fe973aa3c7cf&oe=5E9AF367' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/13402224_561313060714843_108117413_a.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=JYL04r9Sb08AX-gdmh8&oh=5a90bf5fcfcd35053a31fe968667557e&oe=5EA5EB2D' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/18644843_169692096895359_8998936592361979904_a.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=l3M3tLq1nCwAX9VStT-&oh=2937c7c26a167851397b63497856192a&oe=5E9C2076' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/81272220_543460336380300_385581071250489344_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=DWJzv73l-akAX_K1Ekb&oh=c4935ab1787ed67400a5e2a3ee5560ee&oe=5E9D4E57' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/84072709_1079307225743933_7811944937557065728_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=P2d0DZ6JZmsAX_Mvah5&oh=82ce449f52e2c170a1fcda83312f9324&oe=5EA1F863' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/80812750_2461415647505687_1090722136118525952_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=j2EeDAkg9aEAX9kNpAN&oh=5bf7b58f588d19fb3bdb7a27e1726dff&oe=5EA354D4' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69427831_2525258997733091_9123406350917828608_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=V1O-YJmjyxUAX_NmCfM&oh=cbe685bd2e3968a6562af3a7ba9b4a63&oe=5E9BB6BC' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-15/e15/12912849_1600951253560277_546999998_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=RP_ZVE2UvtkAX8FixF4&oh=c989ef292a08b5e52039c56111d7c34e&oe=5EA37CFF' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-1.fna.fbcdn.net/v/t51.2885-19/s150x150/56244857_868169926863731_5239798223526166528_n.jpg?_nc_ht=instagram.flim18-1.fna.fbcdn.net&_nc_ohc=I03-mDn0VgoAX9ho-TT&oh=79568a219e36dab150252d9453e4b86e&oe=5E9DBB83' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/90043378_1070309810001588_4590653596092068482_n.jpg?_nc_ht=instagram.flim18-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=JZwYM9ocqkgAX8IkQNn&oh=4325b8810a77ea7a93bf59477f159afa&oe=5E9C8910' />
            </li>
            <li>
              <img alt='' src='https://instagram.flim18-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/84346679_184039129371191_2493815840934479316_n.jpg?_nc_ht=instagram.flim18-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=snha_dhz6wcAX-oXVml&oh=7f49e49d6478c2f123abb5ddcff396c1&oe=5E9C8726' />
            </li>
          </ul>
        </div>
        <div className='chat__messages'>
          <Scrollbar ref={scrollMessages} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <UserMessage data={messages} user={user} />
          </Scrollbar>
        </div>
        <div className='chat__writeArea'>
          <div className='chat__writeArea__options'>icono</div>
          <div className='chat__writeArea__input'>
            <textarea name='userText' placeholder='Escribe algo para enviar...' onKeyUp={handleKeyPressMessage} />
          </div>
          <div className='chat__writeArea__send' onClick={sendMessage}>
            <div className='chat__writeArea__send--icon' />
          </div>
        </div>
      </div>
      <div className='chat__login'>
        <div className='chat__login--title'>Inicia sesión con facebook</div>
        <p className='chat__login--descript'>
          Debes loguearte con Facebook para poder acceder al mejor chat <GoHeart />
        </p>
        <FacebookLogin
          appId='538747520074029'
          fields='name,email,picture'
          callback={responseFacebook}
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>
              <TiSocialFacebook />
              Continuar con Facebook
            </button>
          )}
        />
      </div>
    </div>
  )
}

export default Chat
