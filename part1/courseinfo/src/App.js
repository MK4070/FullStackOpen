import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  let cnt = -1;
  const Part = () => (
    <p>
      {props.parts[++cnt]}: {props.exercises[cnt]}
    </p>
  );
  return (
    <div>
      <Part />
      <Part />
      <Part />
    </div>
  );
};
const Total = (props) => <p>Number of exercises: {props.total}</p>;

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

export default App;
