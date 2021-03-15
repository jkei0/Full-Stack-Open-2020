import React, { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Footer from './components/Footer'
import { initializeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import { Button, PageStyle } from './components/StyledComponents'
import { List } from '@material-ui/core'

const App = () => {
  const [blogVisible, setBlogVisible] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const handleNewBlog = (event, newTitle, newAuthor, newUrl) => {
    event.preventDefault()
    const newPost = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      dispatch(addBlog(newPost, user.token))
      dispatch(setNotification(`a new blog ${newPost.title}! by ${newPost.author} added`))
      setBlogVisible(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    history.push('/')
  }

  const loginForm = () => (
    <div>
      <h2> log in to application </h2>
      <LoginForm />
    </div>
  )

  const showBlogs = () => {
    return (
      blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <List>
            <Blog blog={blog} />
          </List>
        </Link>
      )
    )
  }

  const showAll = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setBlogVisible(true)}>new blog</Button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm handleNewBlog={handleNewBlog} />
          <Button onClick={() => setBlogVisible(false)}>cancel</Button>
        </div>
        <br/>{showBlogs()}
      </div>
    )
  }
  const userMatch = useRouteMatch('/user/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  const userId = userMatch
    ? userMatch.params.id
    : null

  const blogId = blogMatch
    ? blogMatch.params.id
    : null

  const show = user===null
    ? loginForm()
    : showAll()

  return (
    <PageStyle>
      <Switch>
        <Route path='/users'>
          <Footer user={user} handleLogout={handleLogout}/>
          <Users />
        </Route>
        <Route path='/user/:id'>
          <Footer user={user} handleLogout={handleLogout}/>
          <User id={userId}/>
        </Route>
        <Route path='/blogs/:id'>
          <Footer user={user} handleLogout={handleLogout}/>
          <SingleBlog id={blogId}/>
        </Route>
        <Route path='/'>
          <Footer user={user} handleLogout={handleLogout}/>
          {show}
        </Route>
      </Switch>
    </PageStyle>
  )
}

export default App