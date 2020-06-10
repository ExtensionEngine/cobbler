'use strict';

const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: path.join(__dirname, 'client/main.js'),
      favicon: path.join(__dirname, 'client/assets/favicon.ico')
    }
  }
};
