import { Request, Response } from 'express';
import { Post } from '../models';

interface MulterFile {
  key?: string;
  location?: string;
}

class PostController {
  async index(request: Request, response: Response): Promise<Response> {
    const posts = await Post.find();
    return response.json(posts);
  }

  async store(
    request: Request & { file: MulterFile },
    response: Response
  ): Promise<Response> {
    // Extracted image properties from stored file
    const { originalname, size, filename, key, location } = request.file;

    // Store post document
    const post = await Post.create({
      name: originalname,
      size,
      key: key || filename,
      url: location || '',
    });

    // Finally, send created post
    return response.json(post);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return response.status(404).json({ error: 'Post not found.' });
    }

    return response.status(204).send();
  }
}

export default new PostController();
