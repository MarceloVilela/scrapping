import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListResults from '@modules/magnetSource/services/ListResults';

export default class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { url, search_query = '' } = request.query;

    const showItems = container.resolve(ListResults);

    const atob = (b64Encoded: string) => Buffer.from(b64Encoded, 'base64').toString();

    const content = await showItems.execute({
      alias: String(url).includes('=') ? atob(String(url)) : String(url),
      search_query: String(url).includes('=') ? atob(String(search_query)) : String(search_query)
    });

    return response.json(content);
  }
}
