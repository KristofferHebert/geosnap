import React from 'react'

const Modal = React.createClass({
  render () {
    const db = (this.props.showModal) ? 'block' : ''
    return (
      <div className='modal' tabindex='-1' role='dialog' style={{display: db}}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' aria-label='Close' onClick={this.props.toggleModal}><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title'></h4>
            </div>
            <div className='modal-body'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Modal
