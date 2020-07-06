'use strict';

const { Op } = require('sequelize');

const mapper = new Map();

mapper.set('in', arg => arg.split(','));
mapper.set('notIn', arg => ({ [Op.notIn]: arg.split(',') }));
mapper.set('gt', arg => ({ [Op.gt]: arg }));
mapper.set('lt', arg => ({ [Op.lt]: arg }));
mapper.set('gte', arg => ({ [Op.gte]: arg }));
mapper.set('lte', arg => ({ [Op.lte]: arg }));
mapper.set('eq', arg => ({ [Op.eq]: arg }));
mapper.set('ne', arg => ({ [Op.ne]: arg }));
mapper.set('ts', arg => ({ [Op.like]: `%${arg}%` }));

const apiQueryParser = (req, res, next) => {
  const filters = {};
  const { limit, offset, ...query } = req.query;
  Object.entries(query)
    .forEach(([attribute, filter]) => {
      filters[attribute] = parseFilter(filter);
    });
  req.query = { filters, pagination: { limit, offset } };
  console.log(req.query);
  next();
};

module.exports = { apiQueryParser, validateFilters };

function parseFilter(raw) {
  const [maybeOperation, value] = raw.split('.');
  const operation = mapper.get(maybeOperation);
  return (operation) ? operation(value) : raw;
}

function validateFilters(filters, rawAttributes, modelName) {
  const errors = {};
  const validAttributes = Object.keys(rawAttributes);
  const filteredAttributes = Object.keys(filters);
  filteredAttributes.forEach(it => {
    if (validAttributes.includes(it)) return;
    errors[it] = `Attribute doesn't exist on "${modelName}" resource.`;
  });
  return errors;
}
