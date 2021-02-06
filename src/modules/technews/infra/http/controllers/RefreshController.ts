import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import RefreshPostService from '@modules/technews/services/RefreshPost';

export default class HomePageController {
  public async index(request: Request, response: Response): Promise<Response> {
    const posts = request.body;

    const urls = posts.map(({ link }) => {
      return link;
    });

    const refreshPost = container.resolve(RefreshPostService);
    const content = await refreshPost.execute(urls);

    return response.json(content);
  }
}
