import axios from "axios";

const baseUrl = "http://localhost:8000/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return res.data;
};

const obj = { getAll, createNew, update };

export default obj;
