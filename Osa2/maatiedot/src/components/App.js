import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesForm = (props) => (
  <form onSubmit={filterSubmit}>
    <div>
      find countries <input value={props.filterText} onChange={props.onChange}/>
    </div>
  </form>
)

const RenderCountries = (props) => (
  props.countries.map((country) =>
    <p key={country}>
    {country}
    <button onClick = {() => props.handleClick(country)}>show</button>
    </p>
  )
)

const RenderLanguages = (props) => (
  props.country.languages.map((language) =>
  <li key={language.name}>
  {language.name}
  </li>
  )
)

const RenderCountry = (props) => {
  return (
    <div>
      <h2> {props.country[0].name} </h2>
      <p> capital {props.country[0].capital} </p>
      <p> population {props.country[0].population} </p>
      <h3> Spoken languages </h3>
      <RenderLanguages country={props.country[0]} />
      <img src={props.country[0].flag} alt='flag' width="200" height="100"/>
    </div>
  )
}


const filterSubmit = (event) => (
  event.preventDefault()
)

const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState('')

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data.map(country => country.name))
      })
  }

  useEffect(getCountries, [])

  const getCountry = () => {
    if(filteredCountries.length ===1 && country.length===0) {
      axios
      .get('https://restcountries.eu/rest/v2/name/' + filteredCountries[0].toLowerCase())
      .then(response => {
        setCountry(response.data)
      })
    }
    else if(filteredCountries.length !== 1 && country.length>0) {
      setCountry('')
    }
  }
  useEffect(getCountry, [filteredCountries, country])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    filterCountries(event)
  }

  const filterCountries = (event) => {
    setFilteredCountries(allCountries.filter(country => country.indexOf(event.target.value) !== -1))
  }

  const handleClick = (country) => {
    setFilterText(country)
    setFilteredCountries([country])
  }

  const numberCountries = filteredCountries.length<11 && filteredCountries.length > 1
    ? <RenderCountries countries={filteredCountries} handleClick={handleClick}/>
    : country.length === 1
    ? <RenderCountry country={country}/>
    : 'Too many matches, spesify another filter'

  return (
    <div>
      <CountriesForm filterText={filterText} onChange={handleFilterChange}/>
      {numberCountries}
    </div>
  )
}


export default App
