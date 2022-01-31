import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './app.css'



const Contact = ({data, removePerson}) => {
  return(
    <>
    <li>{data.name} {data.number} <button onClick={() => removePerson(data.id)}>delete</button></li>
    </>
  )
}  

const Notification = ({ errorMessage }) =>{
  if (errorMessage == ''){
     return(
     <>
     </> 
  )}
  else return ( <h1 class = "peppino">{errorMessage}</h1>)
}

const App = () => {
  const [persons, setPersons] = useState(
  []) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const removePerson = (id) => {
    setErrorMessage(
      `'${id}' was removed`
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 1000)
    personsService
    .remove(id)
    setPersons(persons.filter(person => person.id !== id))
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const currentPerson = persons.filter((person) => person.name === newName);
    if (currentPerson.length === 1)
    {
      alert(
          `${newName} is already added to phonebook, add anyway?`
        )
    }
  personsService
  .create(personObject)
  .then(response => {
    setPersons(persons.concat(response.data))
    setErrorMessage(
      `'${newName}' was added`
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 1000)
    setNewName('')
    setNewNumber('')
  })
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
   
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
      <form onSubmit={addPerson}>
        name: <input
          value={newName}
          onChange={handleNameChange}
        /> <br></br>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      
      <button type="submit">Add person</button>
      </form>   
      <h2>Numbers</h2>
      <ul>
        {persons.map((data,i) =>
        <p>
          <Contact key={i} data={data} removePerson={removePerson} /> 
        </p>
        )}
      </ul>
    </div>
  )
}

export default App