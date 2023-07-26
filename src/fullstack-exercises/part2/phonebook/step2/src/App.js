import { useState } from 'react'

const Person = ({persons}) => {
  return (
    <>
    <p>{persons.name}</p>
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
    const newPerson = {
      name: newName,
    }

    const personExists = persons.filter((person) => person.name === newName);

   if (personExists.length > 0) { 
	 alert(`${newName} is already added to the phonebook`);
   } else {
	 setPersons(persons.concat(newPerson));
   }
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
          {persons.map((person) => (
            <Person key={person.name} persons={person} />
          ))}
    </div>
  )
}

export default App