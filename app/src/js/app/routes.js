import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Pages
import Wrapper from './components/wrapper'
import HomePage from './homepage'
import SnapHomepage from './snap'

const Routes = (
  <Route path='/' component={Wrapper}>
    <IndexRoute name='/' component={HomePage} />
    <Route path='/snap' component={SnapHomepage} />
  </Route>
)

export default Routes
