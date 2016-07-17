import React from 'react'
import makeRequest from './makeRequest'

const Offline = React.createClass({
  getDefaultProps () {
    return {
      offlineMessage: 'This feature is online only.'
    }
  },
  getInitialState () {
    return {
      isOnline: true
    }
  },
  componentDidMount () {
    this.timer = setInterval(this.checkIfOnline, 3000)
  },
  componentWillUnmount () {
    clearInterval(this.timer)
  },
  checkIfOnline () {
    this.setState({ isOnline: navigator.onLine })
  },
  renderOfflineMessage (offlineMessage) {
    const message = (
      <div className='bg-info text-center'>
        <p>{offlineMessage}</p>
      </div>
    )
    return (offlineMessage) ? offlineMessage : null
  },
  renderChildren (children, isOnline, offlineMessage) {
    const offline = this.renderOfflineMessage(offlineMessage)
    return (isOnline) ? children : offline
  },
  render () {
    return (
      <section>
        {this.renderChildren(this.props.children, this.state.isOnline, this.props.offlineMessage)}
      </section>
    )
  }
})

export default Offline
