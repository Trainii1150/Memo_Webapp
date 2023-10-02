const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  title: String,
  body: String,
  time: String,
  date: String,
});

const Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo;
