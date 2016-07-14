import React from 'react'

function handleChange (stateAttribute, objectPrefix, cbs) {
  return (e) => {
    e.preventDefault()
    let updatedState = this.state
    let value = e.target.value

    if (objectPrefix) {
      updatedState[objectPrefix][stateAttribute] = value
    } else {
      updatedState[stateAttribute] = value
    }

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
