import React from 'react'

import makeRequest from '../components/utils/makeRequest'
import Offline from '../components/utils/offline'
import UserForm from '../components/form/userform'
import SnapList from '../components/snaplist'

const HomePage = React.createClass({
  render () {
    return (
      <section>
          <h1>Feed</h1>
          <SnapList />
          <Offline>
            <UserForm type={'signup'} endpoint={'/user'} successRedirect={'/#/snap'}/>
          </Offline>
      </section>
    )
  }
})

export default HomePage
