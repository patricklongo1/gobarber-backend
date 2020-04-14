import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import multerConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(multerConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server is up! PORT: 3333');
});
