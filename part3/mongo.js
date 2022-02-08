const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://harshit:${password}@cluster0.zaqq6.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    trim: true,
  },
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });
  person.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    res.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
}
