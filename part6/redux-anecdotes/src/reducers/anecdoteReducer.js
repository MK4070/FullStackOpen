import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      return state.map((a) =>
        a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
      );
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(anecdoteSlice.actions.appendAnecdote(newAnecdote));
  };
};

export const vote = (content) => {
  return async (dispatch) => {
    await anecdoteService.update({ ...content, votes: content.votes + 1 });
    dispatch(anecdoteSlice.actions.voteAnecdote(content.id));
  };
};

export default anecdoteSlice.reducer;
