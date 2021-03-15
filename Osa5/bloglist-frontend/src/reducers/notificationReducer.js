export const setNotification = (message, timer=3) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, timer*1000)
  }
}

export const setError = (message, timer=3) => {
  return dispatch => {
    dispatch({
      type: 'SET_ERROR',
      message: message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, timer*1000)
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const reducer = (state = { message: null, display:'none', type:'' }, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return {
      message: action.message,
      display: '',
      type: 'notification'
    }
  case 'REMOVE_NOTIFICATION':
    return {
      message: null,
      display: 'none',
      type: ''
    }
  case 'SET_ERROR':
    return {
      message: action.message,
      display: '',
      type: 'error'
    }
  }
  return state
}

export default reducer