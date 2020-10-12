import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ShowMovies from '@modules/techSource/services/ShowMovies';

export default class MoviesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showItems = container.resolve(ShowMovies);

    const content = await showItems.execute();

    return response.json(content);
  }
}
