import React from 'react'

const GeoLocateInput = React.createClass({
  componentWillMount () {
    if (this.props.getGeoCoordinates) {
      this.props.getGeoCoordinates(false)
    }
  },
  getDefaultProps () {
    return {
      geo: {
        value: '',
        timestamp: '',
        placeholder: 'GeoLocate (required)',
        loading: false
      }
    }
  },
  render () {
    var classes = (this.props.geo.loading) ? 'form-control geo-locate loading' : 'form-control geo-locate'
    return (
      <input type='text' name='geo' ref='geo' value={this.props.geo.value}
        className={classes} placeholder={this.props.geo.placeholder}
        disabled={this.props.geo.value !== '' && this.props.geo.loading === false}
        required/>
    )
  }
})

export default GeoLocateInput
