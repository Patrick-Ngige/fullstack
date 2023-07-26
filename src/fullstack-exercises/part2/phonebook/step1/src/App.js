import { useState } from 'react'

const Person = (props) => {
  return (
    <>
    <b>{props.persons.name}</b>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPerson = (e) => {
    e.preventDefault()
    const NewPerson = {
      name: newName,
    }

    setPersons(persons.concat(NewPerson))
    setNewName('')
  }

  const handleNewPerson = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  
          {persons.map((person) => 
            <Person key={person.name} persons={person} />
          )}
    </div>
  )
}

export default App