import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import Post from './models/Post';

const routes = express.Router();

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, filename: key } = req.file;
  const post = await Post.create({ name, size, key, url: '' });

  return res.json(post);
});

export default routes;
