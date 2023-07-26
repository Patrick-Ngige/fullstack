import { useState } from 'react'

const Person = ({person, phoneNumber}) => {
  return (
    <>
    <p>{person.name}: {phoneNumber.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
     phoneNumber: {number: '+25470000001'} }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handleNewPerson}/></p>
          <p>number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  
          {persons.map((person, index) => (
            <Person key={index} person={person} phoneNumber={person.phoneNumber} />
          ))}
    </div>
  )
}

export default App