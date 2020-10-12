import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ShowReactBR from '@modules/techSource/services/ShowReactBR';

export default class MeetUpController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showItems = container.resolve(ShowReactBR);

    const content = await showItems.execute();

    return response.json(content);
  }
}
