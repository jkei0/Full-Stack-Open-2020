const User = require('./models/user')
const Blog = require('./models/blog')
const config = require('./utils/config')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
const users = [
    {
        "username" : "Testi",
        "name" : "testaaja",
        "passwordHash" : "salasana",
        "blogs" : [],
    },
    {
        "username":"tunnus",
        "name" : "pasi",
        "passwordHash" : "mika222",
        "blogs" : [],
    }
]

const blogs = [
    {
        "title": "String",
        "author": "String",
        "url": "String",
        "likes": 12
    },
    {
        "title": "My title",
        "author": "Test author",
        "url": "www.myhome.com",
        "likes": 45
    }
]

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })



User.deleteMany({}).then(() => {
    console.log("User tyhjennetty")
})
Blog.deleteMany({}).then(() => {
    console.log("Blog tyhjennetty")
})

const user1 = new User(users[0])
const user2 = new User(users[1])

const blog1 = new Blog(blogs[0])
const blog2 = new Blog(blogs[1])

Promise.all([user1.save(), user2.save()]).then((values) => {
    console.log("All done")
    mongoose.connection.close()
})



