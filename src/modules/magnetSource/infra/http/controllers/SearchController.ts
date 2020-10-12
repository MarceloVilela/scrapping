import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListResults from '@modules/magnetSource/services/ListResults';

export default class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url } = request.query;

    const showItems = container.resolve(ListResults);

    const content = await showItems.execute({
      alias: String(url),
      search_query: ''
    });

    return response.json(content);
  }
}
