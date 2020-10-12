import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ReactBR from '@modules/techSource/services/ShowReactBR';

export default class MeetUpController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showItems = container.resolve(ReactBR);

    const content = await showItems.execute();

    return response.json(content);
  }
}
