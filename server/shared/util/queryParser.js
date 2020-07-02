'use strict';

const { Op } = require('sequelize');

const mapper = new Map();

mapper.set('in', arg => arg.split(',').map(item => returnArgType(item)));
mapper.set('notIn', arg => {
  return {
    [Op.notIn]: arg.split(',').map(item => returnArgType(item))
  };
});
mapper.set('gt', arg => { return { [Op.gt]: returnArgType(arg) }; });
mapper.set('lt', arg => { return { [Op.lt]: returnArgType(arg) }; });
mapper.set('gte', arg => { return { [Op.gte]: returnArgType(arg) }; });
mapper.set('lte', arg => { return { [Op.lte]: returnArgType(arg) }; });
mapper.set('eq', arg => { return { [Op.eq]: returnArgType(arg) }; });
mapper.set('ne', arg => { return { [Op.ne]: returnArgType(arg) }; });
mapper.set('ts', arg => { return { [Op.like]: `%${returnArgType(arg)}%` }; });

const queryParser = (req, res, next) => {
  const filters = {};
  const { limit, offset, ...query } = req.query;
  Object.entries(query)
    .forEach(([attribute, filter]) => {
      filters[attribute] = parseQueryItem(filter);
    });
  req.query = { filters, pagination: { limit, offset } };
  next();
};

module.exports = queryParser;

function parseQueryItem(string) {
  const args = string.split('.');
  if (mapper.get(args[0])) return mapper.get(args[0])(args[1]);
  return returnArgType(string);
}

function returnArgType(string) {
  return (['true', 'false'].includes(string.toLowerCase()))
    ? string !== 'false'
    : Number(string) || string;
}
