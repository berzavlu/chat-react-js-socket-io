/* eslint-disable prettier/prettier */
import React from 'react'
import moment from 'moment'

moment.locale('es')

const getAvatar = (e) => {
  return (
    <div className='chat__messages__user--avatar'>
      <img src={`https://graph.facebook.com/${e.user.id}/picture?type=small`} alt='' />
    </div>
  )
}

const getActions = () => {
  return (
    <div className='chat__messages__user__actions'>
      <div className='chat__messages__user__actions--dots' />
    </div>
  )
}

const getMessages = (e) => {
  return (
    <div className='chat__messages__user__content'>
      <div className='chat__messages__user__content--text'>{e.message}</div>
    </div>
  )
}

const getInfo = (e) => {
  return (
    <div className='chat__messages__user__about'>
      <div className='chat__messages__user--name'>{e.user.name}</div>
      <div className='chat__messages__user__about--separator' />
      <div className='chat__messages__user--time'>{moment(e.date).fromNow()}</div>
    </div>
  )
}

const UserMessage = ({ user, data }) => {
  return (
    <div className='chat__messages--row'>
      {data.map((e) => {
        const isLoged = e.user.id === user.userID
        return (
          <div className={`chat__messages__user${isLoged ? ' chat__messages__userlogged' : ''}`} key={e._id}>
            {isLoged ? getActions(e) : getAvatar(e)}
            {getMessages(e)}
            {isLoged ? getAvatar(e) : getActions(e)}
            {getInfo(e)}
          </div>
        )
      })}
    </div>
  )
}

export default UserMessage
