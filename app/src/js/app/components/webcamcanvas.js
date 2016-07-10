import React from 'react'
import handleChange from './utils/handleChange'
import getUserMedia from './utils/getUserMedia'
import GeoLocateInput from './form/geolocate'

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
    this.renderVideo()
    this.updateWebCanvas()
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
    video.play()

    video.addEventListener('play', () => {
      (function loop () {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0)
          setTimeout(loop, 1000 / 10)
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
    ctx.clearRect(0, 0, canvaswidth, canvasheight)
    ctx.font = '16pt Arial'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'rgba(225,225,225,0.4)'
    ctx.fillRect(0, canvasheight * .60, canvaswidth, 80)
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.fillText(caption, canvaswidth * .5, canvasheight * .65)
    ctx.save()
  },
  render () {
    return (
      <section>
        <video ref='video' hidden/>
        <canvas ref='webcamcanvas' width='640' height='480' className='canvas'></canvas>
        <GeoLocateInput />
        <textarea type='text' name='caption' value={this.state.caption} className='form-control'
          placeholder='Caption (Max 144 characters)' maxLength='144' onChange={this.handleChange('caption', null, [this.updateWebCanvas])} rows='4' cols='50' />
        <input type='submit' className='btn btn-primary btn-block' value='Submit' />

      </section>
    )
  }
})

export default WebCamCanvas
