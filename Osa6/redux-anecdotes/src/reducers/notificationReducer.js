export const addNotification = (message, timeout, timeoutId) => {
    return dispatch => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            data: {
                notification: message
            }
        })
        clearTimeout(timeoutId)
        const timer = setTimeout(() => {
            dispatch(removeNotification())
        }, timeout*1000)
        return timer
    } 
}

export const removeNotification = () => {
    return {
        type: 'NULL'
    }
}

const initialState = {
    message: null,
    display: 'none'
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NOTIFICATION':
            return {
                message: action.data.notification,
                display: ''
            }
        case 'NULL':
            return {
                message: null,
                display: 'none'
            }
    }   
    return state
}

export default reducer