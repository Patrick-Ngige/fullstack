import { useEffect, useState } from 'react';
import crud from './services/persons';
import './index.css'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={className}>
      {message}
    </div>
  );
}

const Person = ({ name, number, onDelete }) => {
  return (
    <>
      <p>
        {name}: {number} <button onClick={onDelete}>Delete</button>
      </p>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    crud
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = e => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newPhoneNumber };
        crud
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewPhoneNumber('');

            setSuccessMessage(
              `Updated '${response.data.name}' `
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch(error => {
            setErrorMessage(
              `Failed, the person was removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      };

      crud
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewPhoneNumber('');

          setSuccessMessage(`Added '${response.data.name}' `);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch(error => {
          setErrorMessage(
            `Failed to add '${newPerson.name}' `
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          console.error('Error adding new person:', error);
        });
    }
  };

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you want to delete '${personToDelete.name}'`)) {
      crud
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));

          setSuccessMessage(`Deleted '${personToDelete.name}' `);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);

        })
        .catch(error => {
          setErrorMessage(`Failed to delete '${personToDelete.name}'`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        });
    }
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
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
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
      {filteredPersons.map(person => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onDelete={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
