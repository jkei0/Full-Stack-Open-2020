import { getAllUsers } from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await getAllUsers()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE_USERS':
    return action.data
  }
  return state
}

export default reducer