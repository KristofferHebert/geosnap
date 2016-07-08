import React from 'react'

function handleChange (stateAttribute) {
  return (e) => {
    e.preventDefault()
    let updatedState = {}
    updatedState[stateAttribute] = e.target.value
    this.setState(updatedState)
  }
}

export default handleChange
