import React from 'react'
import ReactDOM from 'react-dom'

import registerSW from './app/components/utils/registerSW'
import App from './app/index'

// registerSW('/sw.js')

ReactDOM.render(<App />, document.getElementById('react-mount'))
