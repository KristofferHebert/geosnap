import React from 'react'
import { Link } from 'react-router'

const Wrapper = React.createClass({
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
