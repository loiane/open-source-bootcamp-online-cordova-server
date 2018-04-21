const mongoose = require('mongoose');

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');

//const mongoUri = `mongodb://${env.cosmos.accountName}:${env.cosmos.key}@${env.cosmos.accountName}.documents.azure.com:${env.cosmos.port}/?ssl=true`;

const mongoUri = 'mongodb://onlinebootcamp:CsYc6DhPIkyICFDaPtCGOwEaS7bx55G5kgqaUwu7BZbxQKGK03FrXiwWhckSqYC1gN44M2KdGRcKEOqckYpWBw%3D%3D@onlinebootcamp.documents.azure.com:10255/?ssl=true';

// const mongoUri = `mongodb://localhost:27017/contacts`;

function connect() {
 mongoose.set('debug', true);
 return mongoose.connect(mongoUri);
}

module.exports = {
  connect,
  mongoose
};