const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    author: String,
    todo: String
});

// Export the model
module.exports = mongoose.model('todo', schema);