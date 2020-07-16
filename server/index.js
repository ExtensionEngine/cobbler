'use strict';

require('dotenv').config();
const { apiQueryParser } = require('./shared/util/apiQueryParser');
const auth = require('./shared/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const logger = require('./shared/logger');
const { omit } = require('lodash');
const { port } = require('../config/server');
const router = require('./router.js');
const app = express();

app.use(cors());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/api/v1', apiQueryParser, requestLogger, router);

app.listen(port, () =>
  logger.info(`Server is listening on port ${port}!`)
);

app.use(errorHandler);
app.use((req, res, next) => res.status(404).end());

function errorHandler(err, req, res, next) {
  logger.error(err);
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(INTERNAL_SERVER_ERROR).json('Something went wrong');
}

function requestLogger({ method, originalUrl, url, headers, connection }, res, next) {
  const { remoteAddress, remotePort } = connection;
  const reqSerializer = {
    method,
    url: originalUrl || url,
    headers: process.env.NODE_ENV === 'production'
      ? omit(headers, 'authorization')
      : headers,
    remoteAddress,
    remotePort
  };
  logger.info('%o', reqSerializer);
  next();
}

database.initialize();
