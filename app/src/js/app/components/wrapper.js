import React from 'react'
import { Link } from 'react-router'

import isLoggedIn from './utils/isloggedin'

const Wrapper = React.createClass({
  getInitialState () {
    return {
      isLoggedIn: true
    }
  },
  componentDidMount () {
    if (this.isMounted()) {
      this.setState({isLoggedIn: isLoggedIn()})
    }
  },
  renderSignUp (isLoggedIn) {
    const signUp = (
      <li><Link activeClassName='active' className='btn' to='/user/signin'>Sign in</Link></li>
    )

    const signOut = (
      <li><Link activeClassName='active' className='btn' to='/user/signout'>Sign Out</Link></li>
    )

    return (isLoggedIn) ? signOut : signUp

  },
  render () {
    return (
      <main>
        <nav className='navbar navbar-default' role='banner'>
          <div className='container'>
            <div className='col-md-9 col-md-offset-2'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>GeoSnap</a>
              </div>
              <ul className='nav navbar-nav navbar-right' role='navigation'>
                <li><Link activeClassName='active' to='/'>Home</Link></li>
                {this.renderSignUp(this.state.isLoggedIn)}
              </ul>
            </div>
          </div>
        </nav>
        <section className='container' role='main'>
          <section className='row'>
            <div className='col-md-9 col-md-offset-2'>
              {this.props.children}
            </div>
          </section>
        </section>
        <footer className='text-center'><p>GeoSnap - 2016</p></footer>
      </main>
    )
  }
})

export default Wrapper
