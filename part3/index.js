require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// MIDDLEWARE
app.use(express.static("build"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

morgan.token("post", (req) => {
  const body = JSON.stringify(req.body);
  return body === "{}" ? " " : body;
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :post")
);

// ROUTES
app.get("/info", (req, res) => {
  const html = `
  <p>Phonebook has info for ${data.length} people</p>
  <p>${new Date().toString()}</p>
  `;
  res.send(html);
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

const generateId = () => Math.floor(Math.random() * 100);

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res
      .status(400)
      .json({ status: "failed", error: "name or number missing" });
  }
  let check = false;
  for (let p of data) {
    if (p.name === body.name) {
      check = true;
      break;
    }
  }
  if (check) {
    return res
      .status(400)
      .json({ status: "failed", error: "name must be unique" });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  data = data.concat(person);
  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((el) => el.id === id);
  if (person) res.json(person);
  else
    res
      .status(404)
      .json({ status: "failed", error: `Cannot find person with id ${id}` });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((el) => el.id === id);
  if (!person)
    return res
      .status(404)
      .json({ status: "failed", error: `Cannot find person with id ${id}` });
  data = data.filter((el) => el.id !== person.id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
