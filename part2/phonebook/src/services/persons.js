import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((err) => console.error(err));

const create = (newObject) =>
  axios
    .post(baseUrl, newObject)
    .then((response) => response.data)
    .catch((err) => console.error(err));

const _deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

const update = (id, newObject) =>
  axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
    .catch((err) => console.error(err));

export default { getAll, create, update, _deletePerson };
