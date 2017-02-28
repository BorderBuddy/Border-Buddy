const emoji = require('node-emoji').emoji
const express = require('express');
const bodyParser = require('body-parser')
const corse = require('corse');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.normalize(__dirname + '/dist')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, () => console.log(`${emoji.ear} listenin on ${port} ${emoji.ear}`));

import { addRoutes } from './api/endpoints';
addRoutes(app);

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

