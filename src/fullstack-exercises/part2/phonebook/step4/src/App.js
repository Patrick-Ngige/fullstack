import { useState } from 'react';

const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
    <div>
      <p>Search: <input value={searchTerm} onChange={handleSearchTerm} /></p>
    </div>
  );
};

const PersonForm = ({ newName, newPhoneNumber, handleNewPerson, handleNewPhoneNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <p>name: <input value={newName} onChange={handleNewPerson} /></p>
        <p>number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber} /></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <>
      <p>{person.name}: {person.phoneNumber.number}</p>
    </>
  );
};

const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: { number: '+25470000001' } },
    { name: 'Ada Lovelace', phoneNumber: { number: '39-44-5323523', id: 2 } },
    { name: 'Dan Abramov', phoneNumber: { number: '12-43-234345', id: 3 } },
    { name: 'Mary Poppendieck', phoneNumber: { number: '39-23-6423122', id: 4 } }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: { number: newPhoneNumber }
    };

    const personExists = persons.filter((person) => person.name === newName);

    if (personExists.length > 0) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons([...persons, newPerson]);
    }

    setNewName('');
    setNewPhoneNumber('');
  };

  const handleNewPerson = (e) => {
    setNewName(e.target.value);
  };

  const handleNewPhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNewPerson={handleNewPerson}
        handleNewPhoneNumber={handleNewPhoneNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
