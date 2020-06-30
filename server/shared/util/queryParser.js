'use strict';

const { Op } = require('sequelize');

const mapQueryToFilters = filters => {
  const b = filters;
  return Object.entries(filters).reduce((all, [key, filter]) => ({
    ...all,
    [key]: { [Op[filter.op]]: filter.data }
  }), {});
};

const queryParser = queryMapper => (req, res, next) => {
  const query = Object.keys(req.query)
  .reduce((all, key) => ({
    ...all,
    [key]: parseQueryItem(req.query[key])
  }), {});
  req.query = mapQueryToFilters(query);
  next();
};
// ?user=in.5,4,2
const parseQueryItem = string => {
  const args = string.split('.');
  switch (args[0]) {
    case 'ts' :
      return String(args[1]);
    case 'eq' :
      return (['true', 'false'].includes(args[1].toLowerCase()))
        ? args[1] !== 'false'
        : Number(args[1]) || args[1];
    case 'gt' :
      return { data: args[1], op: 'gt' };
    case 'lt' :
      return { data: args[1], op: 'lt' };
    default :
      return '';
  }
};

module.exports = queryParser(mapQueryToFilters);
