'use strict';

const miss = require('mississippi');

module.exports = {
  subscribe,
  addPost
};

const subscribers = {};
const posts = [];

function subscribe(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/event-stream' });
  subscribers[req.user.id] = res;
  res.write(JSON.stringify({ event: 'CONNECTED' }));
  miss.finished(req, () => {
    delete subscribers[req.user.id];
  });
}

function broadcast(message) {
  Object.values(subscribers).forEach(sub => {
    sub.write(`${message}\n`);
  });
}

async function addPost(req, res) {
  const newPost = req.body;
  posts.push(newPost);
  const message = JSON.stringify({ event: 'POST_CREATED', data: newPost });
  broadcast(message);
  return res.json(message);
}
