// @ts-check

const Contact = require('./contact.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getAll(req, res) {
  const docquery = Contact.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(records => {
      res.status(200).json(records);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function post(req, res) {
  const originalRecord = {
    name: req.body.name,
    picture: req.body.picture
  };
  const record = new Contact(originalRecord);
  record.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(record);
    console.log('Record created successfully!');
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getAll,
  post
};
