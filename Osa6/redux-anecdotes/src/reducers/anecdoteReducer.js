import { getAll, postAnecdote, updateAnecdote } from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await postAnecdote(content)
    dispatch({
      type: 'ADD_NEW',
      anecdote: anecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await updateAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEW':
      return state.concat(action.anecdote)
    
    case 'VOTE':
      const anecdoteToChange = state.find(n => n.id === action.data.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changedAnecdote)
      return newState.slice().sort((a,b) => b.votes-a.votes)
    case 'INIT_ANECDOTES':
      return action.data
  }

  return state
}

export default reducer