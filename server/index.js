'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');

require('dotenv').config();
const router = require('./router.js');
const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/api', router);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}!`)
);
