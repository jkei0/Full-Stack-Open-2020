const listHelper  = require('../utils/list_helper')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithThreeBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Milla Kuchniak',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 240,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 100,
        __v: 0
      }
  ]

test('Testing dummy', () => {
    const result = listHelper.dummy('a', 'b')
    expect(result).toBe(1)
})

describe('total likes', () => {
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('multiple blogs', () => {
      const result = listHelper.totalLikes(listWithThreeBlogs)
      expect(result).toBe(345)
    })
    test('zero blogs', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })
})

describe('Most likes', () => {
    test('One blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })
    test('Multiple blogs', () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        expect(result).toEqual(listWithThreeBlogs[1])
    })
})
describe('Most blogs', () => {
    test('Multiple blogs', () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs)
        const exp = {
            author: 'Edsger W. Dijkstra',
            blogs: 2
        }
        expect(result).toEqual(exp)
    })
    test('Most likes', () => {
        const result = listHelper.mostLikes(listWithThreeBlogs)
        const exp = {
            author: 'Edsger W. Dijkstra',
            likes: 340
        }
        expect(result).toEqual(exp)
    })
})

