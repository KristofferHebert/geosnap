import React from 'react'

import WebCamCanvas from '../components/webcamcanvas.js'

const SnapHomepage = React.createClass({
  render () {
    return (
      <section>
        <h1>Snap</h1>
        <WebCamCanvas />
      </section>
    )
  }
})

export default SnapHomepage
