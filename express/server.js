'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const serverRoutes = require('./routes/server');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
//router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

// app.use('/another', serverRoutes);

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/.netlify/functions/server/another', serverRoutes);

module.exports = app;
module.exports.handler = serverless(app);
