import React from 'react'

import makeRequest from '../components/utils/makeRequest'
import Offline from '../components/utils/offline'
import UserForm from '../components/form/userform'


const HomePage = React.createClass({
  render () {
    return (
      <section>
          <h1>Homepage</h1>
          <Offline>
            <UserForm type={'signup'} />
          </Offline>
      </section>
    )
  }
})

export default HomePage
