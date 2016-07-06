import React from 'react'
import { Router, hashHistory } from 'react-router'
import Routes from './routes'

// css outputs to style tag
import styles from '../../css/app.css'

const App = React.createClass({
  render () {
    return (
      <Router routes={Routes} history={hashHistory}/>
    )
  }
})

export default App
