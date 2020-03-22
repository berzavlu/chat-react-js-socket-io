/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Picker } from 'emoji-mart'
import Scrollbar from 'react-scrollbars-custom'
import EscapeOutside from 'react-escape-outside'
import { TiSocialFacebook } from 'react-icons/ti'
import { GoHeart } from 'react-icons/go'
import fade from 'fade'
import UserMessage from '../../components/user-message'

const langEmoji = { search: 'Buscar', categories: { search: 'Résultats de recherche', recent: 'Recientes' } }

let socket

function insertAtCursor(field, myValue) {
  // IE support
  const myField = field
  let sel
  if (document.selection) {
    myField.focus()
    sel = document.selection.createRange()
    sel.text = myValue
  } else if (myField.selectionStart || myField.selectionStart === '0') {
    const startPos = myField.selectionStart
    const endPos = myField.selectionEnd
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
    myField.selectionStart = startPos + myValue.length
    myField.selectionEnd = startPos + myValue.length
  } else {
    myField.value += myValue
  }
}

const Chat = () => {
  const [usersOnline, setUsersOnline] = useState([])
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState({})
  const [isOVer, setIsOver] = useState(false)
  const [openEmoji, setOpenEmoji] = useState(false)

  const scrollMessages = useRef(null)

  // Defino que se inicialice el Socket.io
  useEffect(() => {
    socket = io('http://localhost:3001')
    // Cargar mensajes
    socket.emit('load_messages')

    // Cardo los usuarios online
    socket.on('users_online', (usrs) => {
      setUsersOnline(usrs)
    })

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
  }, [messages, isOVer])

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

  const addEmoji = (emoji) => {
    console.log(emoji.native)
    insertAtCursor(document.getElementsByName('userText')[0], emoji.native)
    document.getElementsByName('userText')[0].focus()
  }

  const onEmoji = () => {
    setOpenEmoji(!openEmoji)
    if (!openEmoji) {
      document.getElementsByName('userText')[0].focus()
    }
  }

  const handleEscapeOutside = (e) => {
    if (e.target.id !== 'emojiIcons' && e.target.id !== 'userText') {
      setOpenEmoji(false)
      document.getElementsByName('userText')[0].focus()
    }
  }

  return (
    <div className='chat'>
      <div className='chat__area'>
        <div className='chat__users'>
          <ul>
            {usersOnline.map((e) => (
              <li key={e.fbId}>
                <img alt='' src={e.image} />
              </li>
            ))}
          </ul>
        </div>
        {/* <div className='chat__bloqueado'>Usuario bloqueado</div> */}
        <div className='chat__messages'>
          <Scrollbar ref={scrollMessages} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <UserMessage data={messages} user={user} />
          </Scrollbar>
        </div>
        <div className='chat__writeArea'>
          <div className='chat__writeArea__options'>
            <div className={`chat__writeArea__options--emoji${openEmoji ? ' chat__writeArea__options--active' : ''}`} onClick={onEmoji} id='emojiIcons' />
            <div className='chat__writeArea__options--picture' />
            {openEmoji && (
              <EscapeOutside onEscapeOutside={handleEscapeOutside}>
                <Picker sheetSize={20} emojiSize={20} native i18n={langEmoji} style={{ position: 'absolute', bottom: '110px', left: '5px' }} title='Elige tu emoji' emoji='point_up' onSelect={addEmoji} />
              </EscapeOutside>
            )}
          </div>
          <div className='chat__writeArea__input'>
            <textarea name='userText' id='userText' placeholder='Escribe algo para enviar...' onKeyUp={handleKeyPressMessage} />
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
          autoLoad
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
