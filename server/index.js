'use strict';

require('dotenv').config();
require('express-async-errors');
const { logger, requestLogger } = require('./shared/logger');
const { apiQueryParser } = require('./shared/util/apiQueryParser');
const auth = require('./shared/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./shared/database');
const { errorHandler } = require('./shared/util/middlewares');
const express = require('express');
const helmet = require('helmet');
const { port } = require('../config/server');
const router = require('./router.js');
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/api/v1', apiQueryParser, requestLogger, router);

app.listen(port, () =>
  logger.info(`Server is listening on port ${port}!`)
);

app.use(errorHandler);
app.use((req, res, next) => res.status(404).end());

database.initialize();
