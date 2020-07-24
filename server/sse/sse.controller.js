'use strict';

module.exports = {
  subscribe,
  addPost
};

let clients = [];
const posts = [];

function subscribe(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  });
  const stringifiedPosts = posts.map(post => `${JSON.stringify(post)}\n`).join();
  res.write(`${stringifiedPosts}\n`);
  clients.push({ ...req.user, res });
  req.on('close', () => {
    console.log(`${req.user.id} Connection closed`);
    clients = clients.filter(c => c.id !== req.user.id);
  });
}

function sendEventsToAll(newPost) {
  clients.forEach(c => c.res.write(`${JSON.stringify(newPost)}\n\n`));
}

async function addPost(req, res) {
  const newPost = req.body;
  posts.push(newPost);
  res.json({ data: newPost });
  return sendEventsToAll(newPost);
}
