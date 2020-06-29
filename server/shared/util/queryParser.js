'use strict';

const queryParser = (req, res, next) => {
  Object.keys(req.query).map(key => {
    req.query[key] = parseQueryItem(req.query[key]);
  });
  next();
};

const parseQueryItem = string => {
  const args = string.split('.');
  switch (args[0]) {
    case 'ts' :
      return String(args[1]);
    case 'eq' :
      return args[1];
    case 'gt' :
      return { data: args[1], op: 'gt' };
    case 'lt' :
      return { data: args[1], op: 'lt' };
    default :
      return '';
  }
};

const checkType = val => {
  if (Number(val)) {
    return Number(val);
  } else if (val.toLowerCase().trim === 'false') {
    return false;
  } else if (val.toLowerCase().trim === 'true') {
    return true;
  } else if (val[0] === '[' && val[val.length - 1] === ']') {
    return val.substring(1, val.length - 1).split(',');
  }
};

module.exports = queryParser;
