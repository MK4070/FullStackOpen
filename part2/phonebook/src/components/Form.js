import React, { useState } from "react";
import personService from "../services/persons";

const Button = ({ text, type }) => (
  <div>
    <button type={type}>{text}</button>
  </div>
);

const Input = ({ text, value, onChange }) => (
  <div>
    {text}
    <input value={value} onChange={onChange} />
  </div>
);

const Form = ({ args: { persons, setPersons, setMessage } }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    let personObj = persons.find((e) => e.name === newName.trim());

    if (personObj && personObj.id) {
      if (newNumber.length === 0)
        alert(`${newName.trim()} is already added to the phonebook`);
      else {
        if (
          window.confirm(
            `${newName.trim()} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          personObj = { ...personObj, number: newNumber };
          personService
            .update(personObj.id, personObj)
            .then((data) => {
              setPersons(persons.map((p) => (p.id === data.id ? data : p)));
              setMessage({
                message: `Updated ${data.name}`,
                className: "success",
              });
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((err) => {
              setMessage({
                message: err.response.data.error,
                className: "error",
              });
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersons(persons.filter((p) => p.id !== personObj.id));
            });
        }
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personObj = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setMessage({
        message: `Added ${returnedPerson.name}`,
        className: "success",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  return (
    <form onSubmit={addPerson}>
      <Input
        text="name: "
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Input
        text="number: "
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <Button text="add" type="submit" />
    </form>
  );
};

export { Form, Input };
