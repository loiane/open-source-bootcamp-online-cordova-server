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

function put(req, res) {
  const originalRecord = {
    _id: req.body._id,
    name: req.body.name,
    picture: req.body.picture
  };
  Contact.findOne({ _id: originalRecord._id }, (error, record) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, record)) return;

    record.name = originalRecord.name;
    record.picture = originalRecord.picture;
    record.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(record);
      console.log('Record updated successfully!');
    });
  });
}

function remove(req, res) {
  Contact.findOneAndRemove({ _id: req.params.id })
    .then(record => {
      if (!checkFound(res, record)) return;
      res.status(200).json(record);
      console.log('Record deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, record) {
  if (!record) {
    res.status(404).send('Record not found.');
    return;
  }
  return record;
}

module.exports = {
  getAll,
  post,
  put,
  remove
};
