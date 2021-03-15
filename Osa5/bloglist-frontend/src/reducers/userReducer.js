import { setError } from './notificationReducer'
import loginService from '../services/login'

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch ({
        type: 'SET_USER',
        user: user
      })
    }
    catch (err) {
      dispatch(setError('wrong username or password'))
    }
  }
}

const reducer = (state=null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  }
  return state
}

export default reducer