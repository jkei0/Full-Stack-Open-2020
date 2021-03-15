import React from 'react'
import Notification from './Notification'
import Logout from './Logout'

const Footer = ({ user, handleLogout }) => {
  return (
    <div>
      <Notification />
      <Logout user={user} handleLogout={handleLogout}/>
      <h2>Blogapp</h2>
    </div>
  )
}

export default Footer