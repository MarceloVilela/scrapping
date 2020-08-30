import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/technews/services/CreatePost';
import ListPostService from '@modules/technews/services/ListPost';
import ShowPostService from '@modules/technews/services/ShowPost';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { link, title, thumb, contents
    } = request.body;

    const createPost = container.resolve(CreatePostService);
    const post = await createPost.execute({
      link,
      title,
      thumb,
      contents,
    });

    return response.json(post);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { url, page, allowContents } = request.query;

    const listPost = container.resolve(ListPostService);
    const content = await listPost.execute({ url: String(url), page: Number(page), allowContents: Boolean(allowContents) });

    return response.json({ ...content, count: content.data.length });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { url } = request.query;

    const showPost = container.resolve(ShowPostService);
    const content = await showPost.execute(String(url));

    return response.json(content);
  }
}
