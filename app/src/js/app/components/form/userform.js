import React from 'react'
import makeRequest from '../utils/makerequest'
import handleChange from '../utils/handleChange'
import renderMessage from '../utils/renderMessage'
import Auth from '../utils/auth'

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
      label: this.props.type === 'signup' ? 'Sign up' : 'Sign in',
      message: {
        value: '',
        className: ''
      }
    }
  },
  resetForm () {
    this.setState({
      form: {
        name: '',
        email: '',
        password: ''
      },
      label: this.props.type === 'signup' ? 'Sign up' : 'Sign in',
      message: {
        value: '',
        className: ''
      }
    })
  },
  renderNameInput (type) {
    let nameInput = (
      <div className='form-group'>
       <label className='sr-only' for='input'>Name</label>
       <input type='name' className='form-control' id='name'
         value={this.state.form.name} placeholder='Name' onChange={this.handleChange('name', 'form')} required tabIndex={31}/>
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

        if (!response.success) {
          return self.setState({
            message: {
              value: response.message,
              className: 'padding bg-danger'
            }
          })
        }

        if (response.success) {

          Auth.setUser(response.data.token, response.data._id)
          self.setState({
            message: {
              value: (this.props.type === 'signup') ? 'Successfully signed up' : 'Signing in...',
              className: 'padding bg-success'
            }
          })
          if (self.props.toggleModal) {
            self.props.toggleModal()
          }
          if (self.props.handleSuccess) {
            self.props.handleSuccess()
          }
          if (self.props.successRedirect) {
            self.resetForm()
            window.location = self.props.successRedirect
          } else {
            self.resetForm()
          }
        }
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
        <label className='email' for='email'>Email address</label>
        <input type='email' name='email' className='form-control' id='email'
          value={this.state.form.email} placeholder='Email' onChange={this.handleChange('email', 'form')} required tabIndex={30} autocomplete={true}/>
      </div>
      {this.renderNameInput(type)}
      <div className='form-group'>
        <label className='password' for='password'>Password</label>
          <input type='password' name='password' className='form-control' id='password'
             value={this.state.form.password} placeholder='Password' onChange={this.handleChange('password', 'form')} required tabIndex={32} autocomplete={true}/>
      </div>
      <div className='checkbox'>
          <button type='submit' className='btn btn-primary' tabIndex={33}>{this.state.label}</button>
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
