import React from 'react'
import makeRequest from '../utils/makerequest'
import handleChange from '../utils/handleChange'
import renderMessage from '../utils/renderMessage'

const UserForm = React.createClass({
  renderMessage,
  handleChange,
  getInitialState () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      label: this.props.type ? 'Sign up' : 'Sign in',
      message: {
        value: '',
        className: ''
      }
    }
  },
  renderNameInput (type) {
    let nameInput = (
      <div className='form-group'>
       <label className='sr-only' for='input'>Name</label>
       <input type='name' className='form-control' id='name'
         value={this.state.form.name} placeholder='Name' onChange={this.handleChange('name', 'form')} required />
     </div>
    )
    return (type === 'signup') ? nameInput : null
  },
  renderHeader (type) {
    let title = (type === 'signup') ? 'Sign up' : 'Sign in'
    return (
      <h2>{title}</h2>
    )
  },
  handleSubmit (e) {
    e.preventDefault()
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.form)
    }

    let self = this

    makeRequest(this.props.endpoint, options)
      .then((response) => {
        if (response.err) {
          if (response.err.code === 11000) {
            return self.setState({
              message: {
                value: 'Email already exists',
                className: 'padding bg-danger'
              }
            })
          }
        }

        return self.setState({
          message: {
            value: 'Successfully signed up',
            className: 'padding bg-success'
          }
        })
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  renderForm (type) {
    return (
      <div>
        <div className='form-group'>
          {this.renderHeader(this.props.type)}
          <label className='sr-only' for='email'>Email address</label>
          <input type='email' className='form-control' id='email'
            value={this.state.form.email} placeholder='Email' onChange={this.handleChange('email', 'form')} required />
       </div>
       {this.renderNameInput(type)}
       <div className='form-group'>
         <label className='sr-only' for='password'>Password</label>
           <input type='password' className='form-control' id='password'
             value={this.state.form.password} placeholder='Password' onChange={this.handleChange('password', 'form')} required />
       </div>
       <div className='checkbox'>
         <button type='submit' className='btn btn-primary'>{this.state.label}</button>
      </div>
     </div>
    )
  },
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderForm(this.props.type)}
        {this.renderMessage(this.state.message)}
      </form>
    )
  }
})

export default UserForm
