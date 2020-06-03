import { Request, Response } from 'express';
import { Post } from '../models';

class PostController {
  async store(request: Request, response: Response): Promise<Response> {
    // Extracted image properties from stored file
    const { originalname, size, filename } = request.file;

    // Store post document
    const post = await Post.create({
      name: originalname,
      size,
      key: filename,
      url: '',
    });

    // Finally, send created post
    return response.json(post);
  }
}

export default new PostController();
