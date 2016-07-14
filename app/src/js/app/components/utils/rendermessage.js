function renderMessage (message) {
  if (message.value === '') {
    return null
  }
  return (
    <div className={message.className}>
      <p>{message.value}</p>
    </div>
  )
}

export default renderMessage
