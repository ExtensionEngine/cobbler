'use strict';

require('dotenv').config();
const auth = require('./shared/auth');
const bodyParser = require('body-parser');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const { port } = require('../config/server');
const router = require('./router.js');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(auth.initialize());

app.use('/api/v1', router);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}!`)
);

database.initialize();
