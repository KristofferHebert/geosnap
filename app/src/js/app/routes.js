import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Pages
import Wrapper from './components/wrapper'
import HomePage from './homepage'

const Routes = (
  <Route path='/' component={Wrapper}>
    <IndexRoute name='/' component={HomePage} />
  </Route>
)

export default Routes
