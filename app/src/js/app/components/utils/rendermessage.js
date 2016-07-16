function renderMessage (message) {
  if (message.value === '') {
    return null
  }
  return (
    <div className={message.className}>
      {message.value}
    </div>
  )
}

export default renderMessage
