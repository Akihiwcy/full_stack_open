import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import { Notification, ErrorMessage } from "./components/Notification";
import { v4 as uuid } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const fetchAll = () => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("effect");
    fetchAll();
  }, []);
  console.log("render", persons.length, "notes");

  // Name Change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Phone Number Change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Handle contact submittion
  const addContact = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      const oldPerson = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(oldPerson.id, { ...oldPerson, number: newNumber })
          .then(() => {
            fetchAll();
            setNewName("");
            setNewNumber("");
            setNotifMessage(
              `Updated ${oldPerson.name}`
            )
            setTimeout(() => {
              setNotifMessage(null)
            }, 2500)
          })
          .catch((error) => {
            setErrorMessage(
              `Person '${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          });
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: uuid(),
    };

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setNotifMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotifMessage(null)
        }, 2500)
      })
      .catch((error) => console.log(error));
  };

  // Filter Change
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          fetchAll();
          setNotifMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setNotifMessage(null)
          }, 2500)
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Notification message={notifMessage} />
      <ErrorMessage error={errorMessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
