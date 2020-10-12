import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ShowYtAbout from '@modules/techSource/services/ShowYtAbout';

export default class YtAboutController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url } = request.query;

    const showItems = container.resolve(ShowYtAbout);

    const content = await showItems.execute({
      url: String(url),
    });

    return response.json(content);
  }
}
