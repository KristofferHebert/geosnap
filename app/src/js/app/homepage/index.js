import React from 'react'

import makeRequest from '../components/utils/makeRequest'
import UserForm from '../components/form/userform'

const HomePage = React.createClass({
  render () {
    return (
      <section>
          <h1>Homepage</h1>
          <UserForm type={'signup'} endpoint={'/user'} />
      </section>
    )
  }
})

export default HomePage
