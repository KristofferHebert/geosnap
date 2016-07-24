import React from 'react'
import makeRequest from './makeRequest'

const Offline = React.createClass({
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
    var component = (
      <span>
        {this.renderChildren(this.props.children, this.state.isOnline, this.props.offlineMessage)}
      </span>
    )
    return (this.props.offlineMessage !== 'undefined') ? component : null
  }
})

export default Offline
