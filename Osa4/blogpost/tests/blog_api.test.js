const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const initialBlogs = [
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

const initialUsers = [
    {
        "username" : "Testi",
        "name" : "testaaja",
        "password" : "salasana"
    },
    {
        "username":"tunnus",
        "name" : "pasi",
        "password" : "mika222"
    }
]

const ppp = {
    "username": "Testi",
    "password" : "salasana"
}

const realToken = jwt.sign(ppp, process.env.SECRET)

describe('Blog', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        await api.post('/api/users').send(newUser)
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        let blogObject2 = new Blog(initialBlogs[1])
        await blogObject2.save()
    })

    test('all notes are returned as json', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toContain("application/json")
    })

    test('unique identifier named as id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('post method works', async () => {
        const blog = 
            {
            "title": "NewTestPost",
            "author": "Mika Myllylä",
            "url": "myhomepage.com",
            "likes": 122
            }
        console.log(realToken)
        await api
            .post('/api/blogs')
            .send(blog)
            .set('Authorization','bearer ' + realToken)
            .expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length+1)
        expect(response.body[2].title).toBe("NewTestPost")
        expect(response.body[2].author).toBe("Mika Myllylä")
        expect(response.body[2].url).toBe("myhomepage.com")
        expect(response.body[2].likes).toBe(122)
    })

    test('Likes field missing', async () => {
        const blog = 
        {
        "title": "NewTestPost",
        "author": "Mika Myllylä",
        "url": "myhomepage.com"
        }
        await api
            .post('/api/blogs')
            .send(blog)
        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toBe(0)
    })

    test('Missing title and url', async () => {
        const blogURL = 
        {
        "title": "NewTestPost",
        "author": "Mika Myllylä",
        "likes": 303
        }
        const blogTitle = 
        {
        "author": "Mika Myllylä",
        "url": "myhomepage.com",
        "likes": 303
        }
        await api  
            .post('/api/blogs')
            .send(blogURL)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(blogTitle)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('Delete single resource', async () => {
        const res = await api.get('/api/blogs')
        await api.delete(`/api/blogs/${res.body[0].id}`)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length-1)
        expect(response.body[0].title).toBe("My title")
    })

    test('Update blog post', async () => {
        const response = await api.get('/api/blogs')
        const updatedBlog = {
            "title": "My title",
            "author": "Test author",
            "url": "www.myhome.com",
            "likes": 559
        }
        await api
            .put(`/api/blogs/${response.body[1].id}`)
            .send(updatedBlog)
        const res = await api.get('/api/blogs')
        expect(res.body[1].likes).toBe(559)
    })
})

describe('Users', () =>  {
    beforeEach(async () => {
        await User.deleteMany({})
        let userObject1 = new User(initialUsers[0])
        await userObject1.save()
        let userObject2 = new User(initialUsers[1])
        await userObject2.save()
    })
    test('GET works', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialUsers.length)
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toContain("application/json")
    })
    test('POST with correct input', async () => {
        const newUser = {
            "username" : "testimasiina",
            "name" : "mae",
            "password" : "hyvasalasanaa"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length+1)
    })
    test('POST with not unique username', async () => {
        const newUser = {
            "username" : "Testi",
            "name" : "testiman",
            "password" : "salasana123"
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('`username` to be unique')
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)       
    })
    test('POST with too short username', async () => {
        const newUser = {
            "username" : "as",
            "name" : "testiman",
            "password" : "salasana123"
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('is shorter than the minimum')
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)       
    })
    test('POST with too short password', async () => {
        const newUser = {
            "username" : "asdsad",
            "name" : "testiman",
            "password" : "ai"
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('password too short')
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)       
    })
})

afterAll(() => {
    mongoose.connection.close()
})