import axios from 'axios'
import { useSelector } from 'react-redux'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postAnecdote = async (content) => {
    const anecdote = {
        content: content, 
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const updateAnecdote = async (id) => {
    const anecdotes = await axios.get(baseUrl)
    const anecdoteToUpdate = anecdotes.data.find((anecdote)=>anecdote.id===id)
    const newAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes+1
    }
    const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
}

export {
    getAll,
    postAnecdote,
    updateAnecdote
}