'use strict';
const Course = require('./course.model');
const pick = require('lodash/pick');

module.exports = {
<<<<<<< HEAD
  create,
  getAll
=======
  create, getAll
>>>>>>> f7fde2c4eb7d76576574046e27d1653b17b4edc7
};

function create(req, res) {
  const courseInfo = pick(req.body, ['name', 'description', 'categoryId']);
  Course.create({ ...courseInfo })
  .then(success => res.json(success))
  .catch(err => res.status(400).json(err));
}

function getAll(req, res) {
  Course.findAll()
<<<<<<< HEAD
    .then(success => res.json({ data: success }))
    .catch(err => res.status(400).json(err));
=======
    .then(success => res.json(success))
    .catch(err => res.json(err));
>>>>>>> f7fde2c4eb7d76576574046e27d1653b17b4edc7
}
