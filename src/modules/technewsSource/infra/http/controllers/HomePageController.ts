import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ShowHomePageService from '@modules/technewsSource/services/ShowHomePage';

export default class HomePageController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url } = request.query;

    const showHome = container.resolve(ShowHomePageService);

    const content = await showHome.execute({
      url: String(url),
    });

    return response.json(content);
  }
}
