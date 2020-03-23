/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React from 'react'
import moment from 'moment'
import GifPlayer from 'react-gif-player'

moment.locale('es')
const TYPE_GIF = 2
const TYPE_ANUNCIO = 3

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
  if (e.type === TYPE_GIF) {
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
    <div className='chat__messages__wrap'>
      {data.map((e) => {
        const userData = Object.keys(user).length > 0
        const isLoged = userData ? e.user.id === user.userID : false
        if (e.type === TYPE_ANUNCIO) {
          return <AnuncioComponent data={e} key={e._id} />
        }
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
    const height = parseInt(msg.height, 10)
    const width = parseInt(msg.width, 10)
    return (
      <div className='chat__messages__user__content'>
        <div className='chat__messages__user__content--gif' style={{ height: `${height}px`, width: `${width}px` }}>
          <GifPlayer gif={msg.url} still={msg.preview} pauseRef={(pause) => (this.pauseGif = pause)} onTogglePlay={(toogle) => this.tooglePlay(toogle)} autoplay={playing} />
        </div>
      </div>
    )
  }
}

const AnuncioComponent = ({ data }) => {
  return (
    <div className='chat__messages__anuncio'>
      <div className='chat__messages__anuncio__log'>
        <div className='chat__messages__anuncio__log--image'>
          <img src={data.user.image} alt='' />
        </div>
        <div className='chat__messages__anuncio__log--name'>{data.user.name}</div>
        <div className='chat__messages__anuncio__log--text'>{data.message}</div>
        <div className='chat__messages__anuncio__log--time'>{moment(data.date).format('h:mm a')}</div>
      </div>
    </div>
  )
}

export default UserMessage
