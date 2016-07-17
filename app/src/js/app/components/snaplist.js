import React from 'react'
import makeRequest from './utils/makerequest'
import Modal from './modal'

const SnapList = React.createClass({
  getInitialState () {
    return {
      snaps: [],
      showModal: false,
      currentImage: false
    }
  },
  componentDidMount () {
    const self = this
    makeRequest('/snap', {})
    .then((response) => {
      if (self.isMounted()) {
        self.setState({
          snaps: response.data
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },
  closeModal (e) {
    e.preventDefault()
    this.setState({
      showModal: false
    })
  },
  openModal (index) {
    return (e) => {
      e.preventDefault()
      this.setState({
        showModal: true,
        currentImage: index
      })
    }
  },
  getCurrentImage (currentImage, snaps) {
    if (currentImage === false || snaps.length === 0) {
      return null
    }

    const current = snaps[currentImage].filename

    return (
      <div>
        <img src={'/images/upload/' + current} className='img-responsive' />
      </div>
    )
  },
  renderSnapList (snaps) {
    if (snaps.length === 0) {
      return null
    }
    return snaps.map((snap, i) => {
      return (
        <li key={Date.now()} className='col-sm-4'>
          <img src={'/images/upload/' + snap.filename} className='img-responsive' onClick={this.openModal(i)}/>
        </li>
      )
    })
  },
  render () {
    return (
      <section>
        <ul className='list-inline row'>
          { this.renderSnapList(this.state.snaps) }
        </ul>
        <Modal showModal={this.state.showModal} toggleModal={this.closeModal}>
          {this.getCurrentImage(this.state.currentImage, this.state.snaps)}
        </Modal>
      </section>
    )
  }
})

export default SnapList
