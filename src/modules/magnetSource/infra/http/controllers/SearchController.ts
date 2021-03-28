import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListResults from '@modules/magnetSource/services/ListResults';
import ListDetail from '@modules/magnetSource/services/ListDetail';
import { atob } from '@shared/utils';

export default class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { url, search_query = '', encoded } = request.query;

    const showItems = container.resolve(ListResults);

    let urlDecoded = String(url);
    let searchQueryDecoded = String(search_query);
    if (String(encoded).toLocaleLowerCase() === 'true') {
      urlDecoded = atob(urlDecoded);
      searchQueryDecoded = atob(searchQueryDecoded);
    }

    const content = await showItems.execute({
      alias: urlDecoded,
      search_query: searchQueryDecoded
    });

    return response.json(content);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { url, encoded } = request.query;

    const showDetail = container.resolve(ListDetail);

    let urlDecoded = String(url);
    if (String(encoded).toLocaleLowerCase() === 'true') {
      console.log('=>encoded');
      urlDecoded = atob(urlDecoded);
    }

    const content = await showDetail.execute({
      url: urlDecoded
    });

    return response.json(content);
  }
}
