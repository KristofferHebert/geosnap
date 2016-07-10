import React from 'react'

const GeoLocateInput = React.createClass({
  getInitialState () {
    return {
      geo: ''
    }
  },
  getGeoCoordinates (e) {
    e.preventDefault()

  },
  render () {
    return (
      <input type='text' name='geo' ref='geo' value={this.state.geo} className='form-control geo-locate' placeholder='geolocation' onFocus={this.getGeoCoordinates}/>
    )
  }
})

export default GeoLocateInput
