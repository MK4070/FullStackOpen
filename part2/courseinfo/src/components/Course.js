import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part key={part.id} part={parts[i]} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => (
  <p>
    <strong>
      total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises
    </strong>
  </p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
