'use strict';

require('dotenv').config();
const auth = require('./shared/auth');
const { BAD_GATEWAY } = require('http-status-codes');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const { port } = require('../config/server');
const queryParser = require('./shared/util/queryParser');
const router = require('./router.js');
const app = express();

app.use(cors());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/api/v1', queryParser, router);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}!`)
);

app.use(errorHandler);
app.use((req, res, next) => res.status(404).end());

function errorHandler(err, req, res, next) {
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(BAD_GATEWAY).json('Something went wrong');
}

database.initialize();
