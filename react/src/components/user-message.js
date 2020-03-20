/* eslint-disable prettier/prettier */
import React from 'react'

const getAvatar = (e) => {
  return (
    <div className='chat__messages__user--avatar'>
      <img src={`https://graph.facebook.com/${e.userInfo.id}/picture?type=small`} alt='' />
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
      <div className='chat__messages__user--name'>{e.userInfo.name}</div>
      <div className='chat__messages__user__about--separator' />
      <div className='chat__messages__user--time'>{`${e.date}, ${e.time}`}</div>
    </div>
  )
}

const UserMessage = ({ user, data }) => {
  return (
    <div className='chat__messages--row'>
      {data.map((e) => {
        const isLoged = e.userInfo.id === user.id
        return (
          <div className={`chat__messages__user${isLoged ? ' chat__messages__userlogged' : ''}`}>
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
