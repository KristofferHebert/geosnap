import React from 'react'
import handleChange from './utils/handleChange'
import makeRequest from './utils/makeRequest'
import Auth from './utils/auth'
import getUserMedia from './utils/getUserMedia'
import GeoLocateInput from './form/geolocate'

// some inspiration from http://www.purplesquirrels.com.au/2013/08/webcam-to-canvas-or-data-uri-with-html5-and-javascript/

const WebCamCanvas = React.createClass({
  getInitialState () {
    return {
      caption: '',
      geo: {
        value: '',
        timestamp: '',
        placeholder: 'GeoLocate (required)',
        loading: false
      }
    }
  },
  getUserMedia,
  handleChange,
  getCurrentPosition (options) {
    let self = this
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const opts = options || defaultOptions

    if (navigator.geolocation) {
      self.setState({
        geo: {
          placeholder: 'Loading...',
          loading: true
        }
      })
      navigator.geolocation.getCurrentPosition((result) => {
        self.setState({
          geo: {
            value: result.coords.latitude.toFixed(2) + ', ' + result.coords.longitude.toFixed(2),
            timestamp: result.timestamp,
            loading: false
          }
        })
      }, (err) => {
        console.log(err)
      }, opts)
    } else {
      console.log('Geolocation is unavailable for this browser.')
    }
  },
  getGeoCoordinates (e) {
    e.preventDefault()
    this.getCurrentPosition()
  },
  componentDidMount () {
    this.renderVideo()
  },
  renderVideo () {
    this.getUserMedia({video: true}, this.handleVideo, (e) => {
      console.log('video error', e)
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    let canvas = this.refs.webcamcanvas
    let image = canvas.toDataURL('image/jpeg', 0.5)
    let geo = this.state.geo

    let coords = geo.value.split(',')



    let postRequest = {
      image: image,
      timestamp: geo.timestamp,
      coordinates: {
        lat: coords[0],
        long: coords[1]
      },
      owner: Auth.getCurrentUser()
    }

    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(postRequest)
    }

    makeRequest('/snap/upload', options)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
  },
  handleVideo (stream) {
    const self = this
    const video = this.refs.video
    const canvas = this.refs.webcamcanvas
    const ctx = canvas.getContext('2d')
    const box = canvas.getContext('2d')

    const message = canvas.getContext('2d', {alpha: false})

    video.src = window.URL.createObjectURL(stream)
    video.play()

    video.addEventListener('play', () => {
      (function drawCanvas () {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0)
          const caption = self.state.caption

          if (caption !== '') {
            const canvaswidth = canvas.width
            const canvasheight = canvas.height

            box.fillStyle = 'rgba(0,0,0,0.6)'
            box.fillRect(0, canvasheight * 0.70, canvaswidth, 60)

            message.font = '18pt Arial'
            message.textBaseline = 'top'
            message.fillStyle = '#FFF'
            message.textAlign = 'center'
            message.fillText(caption, canvaswidth * 0.5, canvasheight * 0.73)
          }
          setTimeout(drawCanvas, 1000 / 10)
        }
      })()
    }, 0)
  },
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
          <video ref='video' hidden/>
          <div className='form-group'>
            <canvas ref='webcamcanvas' width='640' height='480' className='canvas'></canvas>
          </div>
          <div className='form-group'>
            <GeoLocateInput geo={this.state.geo} getGeoCoordinates={this.getGeoCoordinates} />
          </div>
          <div className='form-group'>
            <textarea type='text' name='caption' value={this.state.caption} className='form-control'
              placeholder='Caption (Max 50 characters)' maxLength ='50' onChange={this.handleChange('caption')} rows='4' cols='50' />
          </div>
          <div className='form-group'>
            <input type='submit' className='btn btn-primary btn-block' value='Save' />
          </div>
      </form>
    )
  }
})

export default WebCamCanvas
