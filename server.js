//require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

//port number
const PORT = process.env.PORT || 3001;

//express app
const app = express();

//use express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//connect to mongoose server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
