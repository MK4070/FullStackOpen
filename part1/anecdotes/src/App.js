import React, { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const CurrentAnecdote = ({ text, votes }) => {
  return (
    <>
      <div>{text}</div>
      <div>
        has {votes} {votes === 1 ? "vote" : "votes"}
      </div>
    </>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const MostVotes = ({ votes, anecdotes }) => {
  const maxVotes = Math.max(...votes);
  return (
    <>
      <div>{anecdotes[votes.findIndex((e) => e === maxVotes)]}</div>
      <div>
        has {maxVotes} {maxVotes === 1 ? "vote" : "votes"}
      </div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([...new Array(anecdotes.length).fill(0)]);
  const rnum = (max) => Math.floor(Math.random() * max);

  return (
    <>
      <Heading text="Anecdote of the day" />
      <CurrentAnecdote text={anecdotes[selected]} votes={vote[selected]} />
      <Button
        text="vote"
        onClick={() => {
          setVote(vote.map((e, i) => (i === selected ? e + 1 : e)));
        }}
      />
      <Button
        text="next anecdote"
        onClick={() => setSelected(rnum(anecdotes.length))}
      />
      <Heading text="Anecdote with most votes" />
      <MostVotes votes={vote} anecdotes={anecdotes} />
    </>
  );
};

export default App;
