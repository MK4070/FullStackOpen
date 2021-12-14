import React from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Part = ({ part, num }) => (
  <div>
    {part} {num}
  </div>
);

const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0].name} num={parts[0].exercises} />
      <Part part={parts[1].name} num={parts[1].exercises} />
      <Part part={parts[2].name} num={parts[2].exercises} />
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Heading text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
