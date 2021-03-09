import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import AppError from '@shared/errors/AppError';
import Result from '@modules/magnetSource/repositories/schemas/Result';

class Zq implements IEngineRepository {
  getOriginUrl(): string {
    return 'zq';
  }


  async parseResults(document: Document) {

    const getContent = (art: Element) => ({
      link: String(art.querySelector('[href^="magnet"]')
        ?.getAttribute('href')
      ),
      name: String(art.querySelector('.detName')
        ?.textContent
        ?.replace(/\n|\r|\t/g, '')
        ?.replace(/\\n|\\r|\\t/g, '')
        ?.replace(/\s{2,}/g, '')
      ),
      size: String(art.querySelector('.detDesc')
        ?.textContent
        ?.split('Size ')[1]
        .split(',')[0]
      ),
      seeds: Number(art.querySelector('td:nth-of-type(3)')
        ?.textContent
      ),
      leech: Number(art.querySelector('td:nth-of-type(4)')
        ?.textContent
      ),
      engine_url: this.getOriginUrl(),
      desc_link: String(art.querySelector('.detLink')
        ?.getAttribute('href')
      ),
    });

    document.documentElement.outerHTML
    const contents = [...document.querySelectorAll('#searchResult tbody tr')]
      .filter(el => el.querySelector('[href^="magnet"]') !== null)
      .map(el => getContent(el))

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/engine/zq.html');
    const { document } = response.window;

    const results = this.parseResults(document);

    return results;
  }
}

export default Zq;
