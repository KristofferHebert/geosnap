import React from 'react'

function handleChange (stateAttribute, objectPrefix, cbs) {
  return (e) => {
    e.preventDefault()
    let updatedState = (objectPrefix) ? this.state[objectPrefix] : {}
    let value = e.target.value

    updatedState[stateAttribute] = value
    this.setState(updatedState)

    // if callbacks exists, itterate call callback
    if (cbs) {
      cbs.forEach((cb) => {
        cb(value)
      })
    }
  }
}

export default handleChange
