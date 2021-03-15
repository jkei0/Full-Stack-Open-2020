import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    display: props.notification.display,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStatesToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStatesToProps,null)(Notification)
export default ConnectedNotification