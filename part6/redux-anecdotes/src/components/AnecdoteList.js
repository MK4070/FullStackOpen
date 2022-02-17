import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((store) =>
    store.anecdotes
      .slice()
      .filter((a) =>
        store.filter
          ? a.content.toLowerCase().search(RegExp(store.filter)) >= 0
          : a
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const handleVotes = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVotes(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
