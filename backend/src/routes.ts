import express from 'express';
import multer from 'multer';

import config from './config/multer';
import * as controllers from './controllers';

const routes = express.Router();

routes.post('/posts', multer(config).single('file'), controllers.Post.store);

export default routes;
