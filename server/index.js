'use strict';

require('dotenv').config();
const auth = require('./shared/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { port } = require('../config/server');
const router = require('./router.js');
const app = express();

app.use(cors());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/api/v1', router);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}! Also here is env ${Object.keys(process.env)}`)
);

app.use(errorHandler);
app.use((req, res, next) => res.status(404).end());

function errorHandler(err, req, res, next) {
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(INTERNAL_SERVER_ERROR).json('Something went wrong');
}

database.initialize();
