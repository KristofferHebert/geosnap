import React from 'react'

const UserForm = React.createClass({
  renderNameInput (type) {
    let nameInput = (
      <div className='form-group'>
       <label className='sr-only' for='input'>Name</label>
       <input type='name' className='form-control' id='name' placeholder='Name' required />
     </div>
    )
    return (type === 'signup') ? nameInput : null
  },
  renderForm (type) {
    return (
      <div>
        <div className='form-group'>
         <label className='sr-only' for='email'>Email address</label>
         <input type='email' className='form-control' id='email' placeholder='Email' required />
       </div>
       {this.renderNameInput(type)}
       <div className='form-group'>
         <label className='sr-only' for='password'>Password</label>
         <input type='password' className='form-control' id='password' placeholder='Password' required />
       </div>
       <div className='checkbox'>
         <button type='submit' className='btn btn-primary'>Sign in</button>
         <label>
           <input type='checkbox' /> Remember me
         </label>
       </div>
     </div>
    )
  },
  render () {
    return (
      <form>
        {this.renderForm(this.props.type)}
      </form>
    )
  }
})

export default UserForm
