import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogsReducer'
import { Button } from './StyledComponents'

const SingleBlog = ({ id }) => {
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const giveLike = () => {
    dispatch(like(blog))
  }
  const removeBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title}! by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  if(!blog) {
    return null
  }

  const display = blog.user.username === user.username
    ? { display: '' }
    : { display: 'none' }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <Button onClick={() => giveLike(blog)}>like</Button>
      </p>
      <p>
        added by {blog.user.name}
      </p>
      <div style={display}>
        <Button onClick={() => removeBlog(blog)}>delete</Button>
      </div>
    </div>
  )
}

export default SingleBlog