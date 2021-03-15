import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {addNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const [ timerId, setTimerId ] = useState(null)
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const anecdotesToShow = anecdotes.filter((ane) => ane
      .content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        const timer = dispatch(addNotification(anecdote.content,5,timerId))
        setTimerId(timer)
    }
    return (
        <div>
        {anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList