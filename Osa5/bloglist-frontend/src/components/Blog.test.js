import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Blog } from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing this',
    author: 'Testaaja',
    likes: 33,
    url: 'www.testi.com',
    id: '02928290293'
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('Testing this')
  expect(component.container).toHaveTextContent('Testaaja')
})