import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(morgan(process.env.MORGAN_MODE || 'dev'));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.green(port)}`);
});
