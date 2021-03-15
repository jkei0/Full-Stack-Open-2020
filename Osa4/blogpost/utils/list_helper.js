const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes =  (blogs) => {
    const sum = (a,b) => a+b.likes
    return blogs.length === 1
        ? blogs[0].likes
        : blogs.length === 0
        ? 0
        : blogs.reduce(sum,0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce(
        (max, blog) => (blog.likes > max.likes ? blog : max),
        blogs[0]
    )
    return favorite
}

const mostBlogs = (blogs) => {
    const authorArray = lodash.countBy(blogs, 'author')
    const author = lodash.maxBy(Object.entries(authorArray), (auth) => auth[1] )
    const result = {
        "author" : author[0],
        "blogs" : author[1]
    }
    return result
}

const mostLikes = (blogs) => {
    const authorArray = lodash.groupBy(blogs, 'author')
    const count = Object.values(authorArray)
    let author = ""
    let likes = 0
    for (let i = 0; i < count.length; i++) {
        const like = lodash.sumBy(count[i], 'likes')
        if (like > likes) {
            likes = like
            author = count[i][0].author
        }
    }
    const result = {
        "author": author,
        "likes": likes
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}