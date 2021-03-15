export const modifyFilter = (message) => {
    return {
        type: 'ADD_FILTER',
        data: {
            message: message
        }
    }
}

const reducer = (state="", action) => {
    switch(action.type) {
        case 'ADD_FILTER':
            return action.data.message
    }
    return state
}

export default reducer