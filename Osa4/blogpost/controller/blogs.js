const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const blog = request.body

  const user = request.user
  if (user === null) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user
  })
 
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  console.log(user)
  if (user === null) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  if (user.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'Invalid user'})
  }

  await blog.remove()
  response.status(200).send()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter