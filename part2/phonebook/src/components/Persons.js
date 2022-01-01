import React from "react";
import personService from "../services/persons";

const Person = ({ person, args }) => {
  function deletePerson(p) {
    if (window.confirm(`Delete ${p.name}?`)) {
      personService._deletePerson(p.id).catch((err) => {
        args.setMessage({
          message: `Information of ${p.name} has already been removed from server`,
          className: "error",
        });
        setTimeout(() => {
          args.setMessage(null);
        }, 5000);
      });
      args.setPersons(args.persons.filter((e) => e.id !== p.id));
    }
  }
  return (
    <>
      {person.name + " " + person.number}
      <button type="submit" onClick={() => deletePerson(person)}>
        delete
      </button>
    </>
  );
};

const Persons = ({ list, args }) => {
  return list.map((p) => (
    <div key={p.id}>
      <Person person={p} args={args} />
    </div>
  ));
};

export default Persons;
