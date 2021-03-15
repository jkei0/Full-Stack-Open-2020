import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from './StyledComponents'
import { TextField } from '@material-ui/core'

const NewBlogForm = ({
  handleNewBlog
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    <form onSubmit={(event) => handleNewBlog(event,newTitle,newAuthor,newUrl)}>
      <table>
        <tbody>
          <tr>
            <td>title:</td>
            <td>
              <TextField
                type="text"
                value={newTitle}
                name="title"
                onChange = {({ target }) => setNewTitle(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>author:</td>
            <td>
              <TextField
                type="text"
                value={newAuthor}
                name="author"
                onChange = {({ target }) => setNewAuthor(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>url:</td>
            <td>
              <TextField
                type="text"
                value={newUrl}
                name="url"
                onChange = {({ target }) => setNewUrl(target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="submit"> submit </Button>
    </form>
  )
}

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm