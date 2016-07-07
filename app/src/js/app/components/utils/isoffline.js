import React from 'react'
import makeRequest from './makeRequest'

const isOnline = React.createClass({
  getDefaultProps () {
    return {
      offlineMessage: 'This feature is online only.'
    }
  },
  setInitialState () {
    return {
      isOnline: true
    }
  },
  componentWillMount () {
    this.timer = setInterval(this.checkIfOnline, 2000)
  },
  componentWillUnmount () {
    clearInterval(this.timer)
  },
  checkIfOnline () {
    this.setState({ isOnline: navigator.onLine })
  },
  renderOfflineMessage (offlineMessage) {
    return (
      <div>
        <p>{offlineMessage}</p>
      </div>
    )
  },
  renderChildren (children, isOnline, offlineMessage) {

    const offline = this.renderOfflineMessage(offlineMessage)
    return (isOnline) ? children : offline

  },
  render () {
    return (
      <section>
        {this.renderChildren(this.props.children, this.state.isOnline, this.props.offLineMessage)}
      </section>
    )
  }
})


export default isOnline
