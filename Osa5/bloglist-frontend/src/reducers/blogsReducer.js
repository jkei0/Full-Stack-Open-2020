import { getAll, postNew, removeBlog, likeBlog } from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    blogs.sort((a,b) => b.likes-a.likes)
    dispatch({
      type: 'INITIALIZE',
      data: {
        content: blogs
      }
    })
  }
}

export const addBlog = (blog, userToken) => {
  return async dispatch => {
    const response = await postNew(blog, userToken)
    dispatch ({
      type: 'ADD',
      data: {
        content: response.data
      }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await removeBlog(blog)
    dispatch({
      type: 'DELETE',
      data: {
        id: blog.id
      }
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    await likeBlog(blog)
    dispatch ({
      type: 'LIKE',
      data: {
        id: blog.id
      }
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD':
    return state.concat(action.data.content)
  case 'INITIALIZE':
    return action.data.content
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  case 'LIKE':{
    const blogToLike = state.find(blog => action.data.id === blog.id)
    const changedBlog = {
      ...blogToLike,
      votes: blogToLike.votes + 1
    }
    const newState = state.map(blog => blog.id !== action.data.id ? blog : changedBlog)
    return newState
  }
  }
  return state
}

export default reducer