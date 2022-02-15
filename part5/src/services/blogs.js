import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObj) => {
  const config = { headers: { Authorization: token } };
  const req = await axios.post(baseUrl, newObj, config);
  return req.data;
};

const update = async ({ id, newBlog }) => {
  const config = { headers: { Authorization: token } };
  const req = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return req.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const exportObj = { getAll, create, update, remove, setToken };

export default exportObj;
