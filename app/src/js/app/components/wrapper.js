'use strict'

import React from 'react'
import { Link } from 'react-router'
import Modal from './modal'
import Offline from '../components/utils/offline'
import UserForm from '../components/form/userform'
import Auth from '../components/utils/auth'

const Wrapper = React.createClass({
  getInitialState () {
    return {
      isLoggedIn: true,
      showModal: false
    }
  },
  toggleModal (e) {
    e.preventDefault()
    var updatedState = this.state
    updatedState.showModal = !updatedState.showModal
    this.setState(updatedState)
  },
  componentDidMount () {
    if (this.isMounted()) {
      this.setState({isLoggedIn: Auth.isLoggedIn()})
    }
  },
  logout (e) {
    e.preventDefault()
    Auth.logoutUser()
    this.setState({isLoggedIn: false})
  },
  renderSignUp (isLoggedIn) {
    const signUp = (
      <li className='active'><a href='#' onClick={this.toggleModal}>Sign in</a></li>
    )

    const signOut = (
      <li className='active'><a href='#' onClick={this.logout}>Sign Out</a></li>
    )

    return (isLoggedIn) ? signOut : signUp

  },
  render () {
    return (
      <section>
        <Modal showModal={this.state.showModal} toggleModal={this.toggleModal}>
          <Offline>
            <UserForm type={'signin'} endpoint={'/user/auth'} />
          </Offline>
        </Modal>
        <nav className='navbar navbar-default' role='banner'>
          <div className='container'>
            <div className='col-md-9 col-md-offset-2'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>GeoSnap</a>
              </div>
              <ul className='nav navbar-nav navbar-right' role='navigation'>
                <li><Link activeClassName='active' to='/'>Home</Link></li>
                <li><Link activeClassName='active' to='/snap'>Snap</Link></li>
                {this.renderSignUp(this.state.isLoggedIn)}
              </ul>
            </div>
          </div>
        </nav>
        <section className='container' role='section'>
          <section className='row'>
            <div className='col-md-9 col-md-offset-2'>
              {this.props.children}
            </div>
          </section>
        </section>
        <footer className='text-center'><p>GeoSnap - 2016</p></footer>
      </section>
    )
  }
})

export default Wrapper
