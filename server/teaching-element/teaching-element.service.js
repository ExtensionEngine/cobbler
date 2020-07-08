'use strict';

const pick = require('lodash/pick');
const { TeachingElement } = require('../shared/database');
const { teachingElements } = require('../../config/server/index');

module.exports = { createTe };

function createTe(teachingElement) {
  const validatedTeachingElement = parseTe(teachingElement);
  return TeachingElement.create(validatedTeachingElement);
}

function parseTe(teachingElement) {
  const data = parseData(teachingElement);
  const common = pick(teachingElement, ['name', 'label', 'type', 'position', 'lectureId']);
  if (typeof common.name === 'string' ||
  typeof common.label === 'string' ||
  teachingElements.includes(common.type) ||
  isNaN(common.position) || isNaN(common.lectureId)) {
    throw Error('Invalid attributes');
  }
  return { ...common, data };
}

function parseData(teachingElement) {
  switch (teachingElement.type) {
    case 'IMAGE':
      return parseImageData(teachingElement);
    case 'VIDEO':
      return parseVideoData(teachingElement);
    case 'TEXT':
      return parseTextData(teachingElement);
    default:
      throw Error('Unsupported TE type');
  }
}

function parseImageData({ url }) {
  const isValid = isUrl(url);
  if (!isValid) {
    throw Error('Invalid image url!');
  }

  return { url };
}

function parseVideoData({ url }) {
  const isValid = isUrl(url);
  if (!isValid) {
    throw Error('Invalid video url!');
  }

  return { url };
}

function parseTextData({ content }) {
  if (typeof content === 'string') return { content };
  throw Error('Invalid text content');
}

function isUrl(url) {
  try {
    const isValid = new URL(url);
    return !!isValid;
  } catch (error) {
    return false;
  }
}
