import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async (newBlog, token) => {
  const headers = {
    headers: {
      'Authorization' : `bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, newBlog, headers)
  return response
}

const likeBlog = async (blog) => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
  const headers = {
    headers: {
      'Authorization' : `bearer ${token}`
    }
  }
  blog.likes = blog.likes+1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, headers)
  return response
}

const removeBlog = async (blog) => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
  const headers = {
    headers: {
      'Authorization' : `bearer ${token}`
    }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, headers)
  return response
}

export {
  getAll,
  postNew,
  likeBlog,
  removeBlog,
}