import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ShowMeetUp from '@modules/techSource/services/ShowMeetUp';

export default class MeetUpController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url } = request.query;

    const showItems = container.resolve(ShowMeetUp);

    const content = await showItems.execute({
      url: String(url),
    });

    return response.json(content);
  }
}
