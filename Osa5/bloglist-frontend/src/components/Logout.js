import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Button } from './StyledComponents'

const Logout = (props) => {
  if(!props.user) {
    return null
  }

  const style = {
    'paddingLeft': '1em',
    'paddingRight': '1em'
  }
  return (
    <Navigation>
      <Link to='/users' style={style}> users </Link>
      <Link to='/' style={style}> blogs </Link>
      {props.user.name} logged in
      <Button onClick={props.handleLogout}>
      logout
      </Button>
    </Navigation>
  )
}

export default Logout