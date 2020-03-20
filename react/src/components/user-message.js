/* eslint-disable prettier/prettier */
import React from 'react'

const UserMessage = ({ logged, data }) => {
  if (logged) {
    return (
      <div className='chat__messages__user chat__messages__userlogged'>
        <div className='chat__messages__user__actions'>
          <div className='chat__messages__user__actions--dots' />
        </div>
        <div className='chat__messages__user__content'>
          <div className='chat__messages__user__content--text'>{data.message}</div>
        </div>
        <div className='chat__messages__user--avatar'>
          <img src={`https://graph.facebook.com/${data.userInfo.id}/picture?type=small`} alt='' />
        </div>
        <div className='chat__messages__user__about'>
          <div className='chat__messages__user--name'>{data.name}</div>
          <div className='chat__messages__user__about--separator' />
          <div className='chat__messages__user--time'>{`${data.date}, ${data.time}`}</div>
        </div>
      </div>
    )
  }
  return (
    <div className='chat__messages__user'>
      <div className='chat__messages__user--avatar'>
        <img src={`https://graph.facebook.com/${data.userInfo.id}/picture?type=small`} alt='' />
      </div>
      <div className='chat__messages__user__content'>
        <div className='chat__messages__user__content--text'>{data.message}</div>
      </div>
      <div className='chat__messages__user__actions'>
        <div className='chat__messages__user__actions--dots' />
      </div>
      <div className='chat__messages__user__about'>
        <div className='chat__messages__user--name'>{data.name}</div>
        <div className='chat__messages__user__about--separator' />
        <div className='chat__messages__user--time'>{`${data.date}, ${data.time}`}</div>
      </div>
    </div>
  )
}

export default UserMessage
