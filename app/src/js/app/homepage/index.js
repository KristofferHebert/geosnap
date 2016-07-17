import React from 'react'

import makeRequest from '../components/utils/makeRequest'
import UserForm from '../components/form/userform'
import SnapList from '../components/snaplist'

const HomePage = React.createClass({
  render () {
    return (
      <section>
          <h1>Feed</h1>
          <SnapList />
          <UserForm type={'signup'} endpoint={'/user'} successRedirect={'/#/snap'}/>
      </section>
    )
  }
})

export default HomePage
