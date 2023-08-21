import axios from 'axios';
import { useEffect, useState } from 'react';

const Person = ({ name, number }) => {
  return (
    <>
      <p>
        {name}: {number}
      </p>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    };

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName('');
        setNewPhoneNumber('');
      })
      .catch(error => {
        console.error('Error adding new person:', error);
      });
  };

  const handleNewPerson = e => {
    setNewName(e.target.value);
  };

  const handleNewPhoneNumber = e => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSearchTerm = e => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>
          Search: <input value={searchTerm} onChange={handleSearchTerm} />
        </p>
      </div>
      <div>
        <button type="search">Search</button>
      </div>
      <form onSubmit={addPerson}>
        <h2>Add new</h2>
        <div>
          <p>
            name: <input value={newName} onChange={handleNewPerson} />
          </p>
          <p>
            number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => (
        <Person key={index} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
