import { useState } from 'react'


const Person = ({person}) => {
  return (
    <>
    <p>{person.name}: {person.phoneNumber.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
     phoneNumber: {number: '+25470000001'} },
     { name: 'Ada Lovelace', phoneNumber: {number: '39-44-5323523', id: 2} },
     { name: 'Dan Abramov', phoneNumber: {number: '12-43-234345', id: 3} },
     { name: 'Mary Poppendieck', phoneNumber: {number: '39-23-6423122', id: 4} }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');


  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      phoneNumber: { number: newPhoneNumber}
    }

    const personExists = persons.filter((person) => person.name === newName);

   if (personExists.length > 0) { 
	 alert(`${newName} is already added to the phonebook`);
   } else {
	 setPersons([...persons, newPerson]);
   }
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNewPerson = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredPersons = persons.filter((person) => 
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>Search: <input value={searchTerm} onChange={handleSearchTerm}/></p>
      </div>
      <div>
          <button type="search">Search</button>
        </div>
      <form onSubmit={addPerson}>
        <h2>Add new</h2>
        <div>
          <p>name: <input value={newName} onChange={handleNewPerson}/></p>
          <p>number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  
          {filteredPersons.map((person, index) => (
            <Person key={index} person={person}  />
          ))}
    </div>
  )
}

export default App