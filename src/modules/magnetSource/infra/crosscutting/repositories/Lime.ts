import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import Result from '@modules/magnetSource/repositories/schemas/Result';

class Lime implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://limetor.com';
  }

  async parseResults(document: Document) {

    const getContent = (art: Element) => ({
      link: String(art.querySelector('[href*=".torrent"]')
        ?.getAttribute('href')
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
      desc_link: this.getOriginUrl() + '/' + String(art.querySelector('.tt-name [href]:nth-of-type(2)')
        ?.getAttribute('href')
      ),
    });

    const contents = [...document.querySelectorAll('table tr')]
      .filter(el => el.querySelector('[href*=".torrent"]') !== null)
      .map(el => getContent(el))
      .filter(item => item.link !== 'undefined' && !isNaN(item.seeds) && !isNaN(item.leech))

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    const url = `${this.getOriginUrl()}/search/all/${search_query}/`;
    const response = await JSDOM.fromURL(url);

    const { document } = response.window;

    const results = this.parseResults(document);

    return results;
  }
}

export default Lime;
