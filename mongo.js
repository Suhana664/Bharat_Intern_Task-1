const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  input1: String,
  input2: String,
  // Add more fields as needed for your form data
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

app.post('/saveFormData', async (req, res) => {
  try {
    const formData = new FormDataModel(req.body);
    await formData.save();

    res.status(201).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
