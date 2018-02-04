var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  description: String,
//   amount: Number,
//   month: String,
//   year: Number
priority: String,
name: String
});

module.exports = mongoose.model('Expense', expenseSchema);