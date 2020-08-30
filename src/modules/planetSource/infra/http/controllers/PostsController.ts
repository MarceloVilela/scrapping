import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ShowPostService from '@modules/planetSource/services/ShowPost';

export default class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url } = request.query;

    const showPost = container.resolve(ShowPostService);

    const content = await showPost.execute({
      url: String(url),
    });

    return response.json(content);
  }
}
