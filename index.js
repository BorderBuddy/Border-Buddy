import { emoji } from 'node-emoji';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import db from './database';

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

db.didSync
.then(() => {
	app.listen(port, () => {
		console.log(`${emoji.ear} listening on ${port} ${emoji.ear}`);
	});
})
.catch(err => console.error(err));

import { addRoutes } from './api/endpoints';
addRoutes(app);

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

