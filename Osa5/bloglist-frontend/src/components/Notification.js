import React from 'react'
import { useSelector } from 'react-redux'
import { NotificationStyle, ErrorStyle } from './StyledComponents'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(notification.display === 'none') {
    return null
  }
  if(notification.type === 'notification') {
    return (
      <NotificationStyle>
        {notification.message}
      </NotificationStyle>
    )
  }
  if(notification.type === 'error') {
    return (
      <ErrorStyle>
        {notification.message}
      </ErrorStyle>
    )
  }

  return (
    <style>
      {notification.message}
    </style>
  )
}

export default Notification