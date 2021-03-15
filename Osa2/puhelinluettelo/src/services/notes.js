import axios from 'axios'
const baseUrl = '/api/persons'

const postNumber = newNumber => {
  const request = axios.post(baseUrl, newNumber)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response=>response.data)
}

const deleteNumber = id => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response=>response.data)
}

const updateNumber = person => {
  const url = `${baseUrl}/${person.id}`
  const request = axios.put(url, person)
  return request.then(response=>response.data)
}

export default {
  postNumber: postNumber,
  getAll: getAll,
  deleteNumber: deleteNumber,
  updateNumber: updateNumber
}
