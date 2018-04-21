const mongoose = require('mongoose');

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://ossbootcamp:mX1b5hO5wMHvEzAdN44AnQxrgeYb47YfrddYNrCCzoFZLlXAEdwjr214esawtCEYIyN9fMkXJYJZ4bCAYBDWPg%3D%3D@ossbootcamp.documents.azure.com:10255/?ssl=true';

// const mongoUri = `mongodb://localhost:27017/contacts`;

function connect() {
 mongoose.set('debug', true);
 return mongoose.connect(mongoUri);
}

module.exports = {
  connect,
  mongoose
};