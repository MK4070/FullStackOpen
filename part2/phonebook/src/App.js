import React, { useState, useEffect } from "react";
import { Form, Input } from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";

const Heading = ({ text }) => <h2>{text}</h2>;

const Notification = ({ notify }) =>
  notify === null ? null : (
    <div className={notify.className}>{notify.message}</div>
  );

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const personsFiltered = persons.filter(
    (person) => person.name.toLowerCase().search(RegExp(filter)) >= 0
  );

  return (
    <div>
      <Heading text="Phonebook" />
      <Notification notify={message} />
      <Input
        text="filter shown with "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Heading text="Add a new" />
      <Form args={{ persons, setPersons, setMessage }} />
      <Heading text="Numbers" />
      <Persons
        list={filter.length === 0 ? persons : personsFiltered}
        args={{ persons, setPersons, setMessage }}
      />
    </div>
  );
};

export default App;
