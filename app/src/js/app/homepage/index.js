import React from 'react'

import makeRequest from '../components/utils/makeRequest'
import Offline from '../components/utils/offline'

const HomePage = React.createClass({
  render () {
    return (
      <section>
          <h1>Homepage</h1>
          <Offline>
            your online!
          </Offline>
      </section>
    )
  }
})

export default HomePage
