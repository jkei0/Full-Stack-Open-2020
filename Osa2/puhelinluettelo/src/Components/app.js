import React, { useState, useEffect } from 'react'
import noteService from '../services/notes'
import '../app.css'

const Numbers = (props) => (
  props.persons.map((person)=>
    <p key={person.name}>
    {person.name} {person.number}
    <button onClick={() => props.deleteMe(person.id, person.name)} > delete </button>
    </p>
  )
)

const FilterForm = (props) => (
  <form onSubmit={props.filterNames}>
    <div>
      filter shown with <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.addNumber}>
    <div>
      name: <input value={props.newName} onChange={props.handleNoteChange}/>
    </div>
    <div>
      number <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Notification = ({message}) => {
    if(message === '') {
      return null
    }

    return (
      <div className='message'>
        {message}
      </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name===newName) === false) {
      const person =  {
        name: newName,
        number: newNumber
      }
      noteService
        .postNumber(person)
        .then(response => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          addNotification(`${person.name} added`)
        })
        .catch(error => {
          addNotification(error.response.data.error)
        })
    }
    else {
      const person = persons.find(person => person.name===newName)
      person.number = newNumber
      noteService
        .updateNumber(person)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setNewName('')
          setNewNumber('')
          addNotification(`${person.name} number changed`)
        })
        .catch(error => {
          addNotification(`Information of ${person.name} has been already removed from the server`)
        })
    }
  }

  const addNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  const filterNames = (event) => {
    event.preventDefault()
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteMe = (id, name) => {
    if(window.confirm(`Delete ${name}?`))
    noteService
      .deleteNumber(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        addNotification(`${name} deleted`)
      })
  }

  const numbersToShow = newFilter.length>0
    ? persons.filter(person => person.name.indexOf(newFilter) !== -1)
    : persons

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <FilterForm filterNames={filterNames} newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2> add a new </h2>
      <PersonForm addNumber={addNumber} newName={newName}
      handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        <Numbers persons={numbersToShow} deleteMe={deleteMe} />
      </div>
    </div>
  )
}

export default App
