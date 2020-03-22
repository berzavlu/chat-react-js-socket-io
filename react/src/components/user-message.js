/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React from 'react'
import moment from 'moment'
import GifPlayer from 'react-gif-player'

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
  if (e.type === 2) {
    return <GifComponent data={e} />
  }
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

class GifComponent extends React.Component {
  constructor(props) {
    super(props)
    const { data } = this.props
    const now = moment(new Date())
    const end = moment(data.date)
    const duration = moment.duration(now.diff(end))
    const timeAgo = duration.asSeconds() < 60
    this.state = { playing: timeAgo }
  }

  componentDidMount() {
    const _this = this
    if (_this.state.playing) {
      setTimeout(() => {
        _this.setState({ playing: false })
        _this.pauseGif()
      }, 16000)
    }
  }

  tooglePlay(toogle) {
    this.setState({ playing: toogle })
    const _this = this
    if (toogle) {
      setTimeout(() => {
        _this.setState({ playing: false })
        _this.pauseGif()
      }, 16000)
    }
  }

  render() {
    const { playing } = this.state
    const { data } = this.props
    const msg = JSON.parse(data.message)
    return (
      <div className='chat__messages__user__content'>
        <div className='chat__messages__user__content--gif'>
          <GifPlayer gif={msg.url} still={msg.preview} pauseRef={(pause) => (this.pauseGif = pause)} onTogglePlay={(toogle) => this.tooglePlay(toogle)} autoplay={playing} />
        </div>
      </div>
    )
  }
}

export default UserMessage
