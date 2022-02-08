require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/personModel');

const app = express();

// MIDDLEWARE
app.use(express.static('build'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

morgan.token('post', (req) => {
  const body = JSON.stringify(req.body);
  return body === '{}' ? ' ' : body;
});

app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :post'),
);

// ROUTES
app.get('/info', (req, res, next) => {
  Person.find({})
    .then((data) => {
      const html = `
    <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date().toString()}</p>
    `;
      res.send(html);
    })
    .catch(next);
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((p) => res.json(p))
    .catch(next);
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'name or number missing' });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person
      .save()
      .then((result) => res.json(result.toJSON()))
      .catch((err) => next(err));
  }
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => {
      if (p) res.json(p);
      else res.status(404).end();
    })
    .catch(next);
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json(result))
    .catch(next);
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
});

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next();
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
