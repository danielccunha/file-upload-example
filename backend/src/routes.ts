import express from 'express';
import multer from 'multer';

import config from './config/multer';
import * as controllers from './controllers';

const routes = express.Router();

routes.get('/posts', controllers.Post.index);
routes.post('/posts', multer(config).single('file'), controllers.Post.store);
routes.delete('/posts/:id', controllers.Post.delete);

export default routes;
