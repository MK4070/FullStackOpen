import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotificationWithTimeout(`added '${content}'`, 5);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote, setNotificationWithTimeout })(
  AnecdoteForm
);
