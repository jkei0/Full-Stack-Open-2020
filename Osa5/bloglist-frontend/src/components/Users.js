import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>
            blogs created
            </TableCell>
          </TableRow>
        </TableHead>
        {users.map((user) => (
          <TableBody key={user.id}>
            <TableRow>
              <TableCell><Link to={`/user/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  )
}

export default Users