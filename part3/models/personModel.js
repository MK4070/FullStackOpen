require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be atleast 3 characters long'],
    unique: true,
    trim: true,
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minlength: [8, 'Number must be atleast 8 characters long'],
    validate: {
      validator(v) {
        return /^(\d{2,3})-\d{5,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    trim: true,
  },
});

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
