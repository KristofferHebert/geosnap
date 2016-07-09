import React from 'react'
import handleChange from './utils/handleChange'
import getUserMedia from './utils/getUserMedia'

// some inspiration from http://www.purplesquirrels.com.au/2013/08/webcam-to-canvas-or-data-uri-with-html5-and-javascript/

const WebCamCanvas = React.createClass({
  getInitialState () {
    return {
      caption: ''
    }
  },
  getUserMedia,
  handleChange,
  componentDidMount () {
    this.updateWebCanvas()
    this.renderVideo()
  },
  renderVideo () {
    this.getUserMedia({video: true}, this.handleVideo, (e) => {
      console.log('video error', e)
    })
  },
  handleVideo (stream) {
    const video = this.refs.video
    const canvas = this.refs.webcamcanvas
    const ctx = canvas.getContext('2d')
    video.src = window.URL.createObjectURL(stream)

    video.addEventListener('play', () => {
      const vid = this; // cache
      (function loop () {
        if (!vid.paused && !vid.ended) {
          ctx.drawImage(vid, 0, 0)
          setTimeout(loop, 1000 / 30) // drawing at 30fps
          console.log('called')
        }
      })()
    }, 0)
  },
  updateWebCanvas () {
    const canvas = this.refs.webcamcanvas
    const ctx = canvas.getContext('2d')
    const canvaswidth = canvas.width
    const canvasheight = canvas.height
    const caption = this.state.caption || ''
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '16pt Arial'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'rgba(225,225,225,0.4)'
    var width = ctx.measureText(caption).width
    ctx.fillRect(0, canvasheight * .60, canvaswidth, 80)
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.fillText(caption, canvaswidth * .5, canvasheight * .65)
    ctx.save()
  },
  render () {
    return (
      <section>
        <video ref='video' />
        <canvas ref='webcamcanvas' width='640' height='480' className='canvas'></canvas>
        <input type='text' name='geo' value={this.state.geo} className='form-control geo-locate' placeholder='geolocation'/>
        <textarea type='text' name='caption' value={this.state.caption} className='form-control'
          placeholder='Caption (Max 144 characters)' maxLength='144' onChange={this.handleChange('caption', null, [this.updateWebCanvas])} rows='4' cols='50' />
        <input type='submit' className='btn btn-primary btn-block' value='Submit' />

      </section>
    )
  }
})

export default WebCamCanvas
