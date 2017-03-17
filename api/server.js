import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { addRoutes } from './endpoints';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

addRoutes(app);

const staticContent = path.normalize(__dirname + '/../dist');
app.use(express.static(staticContent));

app.get('*', (req, res) => {
  res.sendFile(staticContent + '/index.html');
});

export default app;
