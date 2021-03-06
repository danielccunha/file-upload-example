import 'dotenv/config';
import './config/mongo';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import path from 'path';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(morgan(process.env.MORGAN_MODE || 'dev'));
app.use(express.json());
app.use(routes);
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.listen(port, () => {
  console.log(`Server is listening on port ${chalk.green(port)}`);
});
