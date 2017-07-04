const mongoose = require('mongoose');
const URI = 'set your URI';
mongoose.connect(URI);

// using mongoose v4.10.8 to avoid issue
// https://github.com/Automattic/mongoose/issues/5399

module.exports = mongoose.connection;