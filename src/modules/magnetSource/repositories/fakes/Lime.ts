import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import AppError from '@shared/errors/AppError';
import Result from '@modules/magnetSource/repositories/schemas/Result';

class Lime implements IEngineRepository {
  getOriginUrl(): string {
    return 'lime'
    return 'https://www.pirate-bay.net/top#';
  }


  async parseResults(document: Document) {

    const getContent = (art: Element) => ({
      link: String(art.querySelector('[href*=".torrent"]')
        ?.getAttribute('href')
        ?.split('/')[4]
        ?.split('?')[0]
      ),
      name: String(art.querySelector('td:nth-of-type(1)')
        ?.textContent
        ?.replace(/\n|\r|\t/g, '')
        ?.replace(/\\n|\\r|\\t/g, '')
        ?.replace(/\s{2,}/g, '')
      ),
      size: String(art.querySelector('td:nth-of-type(3)')
        ?.textContent
      ),
      seeds: Number(art.querySelector('td:nth-of-type(4)')
        ?.textContent || 0
      ),
      leech: Number(art.querySelector('td:nth-of-type(5)')
        ?.textContent || 0
      ),
      engine_url: this.getOriginUrl(),
      desc_link: String(art.querySelector('[href*=".torrent"]')
        ?.getAttribute('href')
      ),
    });

    const contents = [...document.querySelectorAll('table tr')]
      .filter(el => el.querySelector('[href*=".torrent"]') !== null)
      .map(el => getContent(el))
      .filter(item => item.link !== 'undefined' && !isNaN(item.seeds) && !isNaN(item.leech))
      .map(item => ({ ...item, link: 'https://limetor.com/' + item.link }))

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/engine/lime.html');
    const { document } = response.window;

    const results = this.parseResults(document);

    return results;
  }
}

export default Lime;
