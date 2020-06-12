'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const { port } = require('../config/server');
const router = require('./router.js');
const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}!`)
);

database.initialize();
