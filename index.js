// @ts-check

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));