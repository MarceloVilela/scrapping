import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import AppError from '@shared/errors/AppError';
import Result from '@modules/magnetSource/repositories/schemas/Result';

class Tl implements IEngineRepository {
  getOriginUrl(): string {
    return 'tl'
    return 'https://www.torlock.com';
  }


  async parseResults(document: Document) {

    const getContent = (art: Element) => ({
      link: [
        this.getOriginUrl(),
        "/tor/",
        art.querySelector('[href]')?.getAttribute('href')?.split('/')[2],
        ".torrent"
      ].join(''),
      name: String(art.querySelector('td:nth-of-type(1) div')
        ?.textContent
        ?.replace(/\n|\r|\t/g, '')
        ?.replace(/\\n|\\r|\\t/g, '')
        ?.replace(/\s{2,}/g, '')
      ),
      size: String(art.querySelector('.ts')
        ?.textContent
      ),
      seeds: Number(art.querySelector('.tul')
        ?.textContent
      ),
      leech: Number(art.querySelector('.tdl')
        ?.textContent
      ),
      engine_url: this.getOriginUrl(),
      desc_link: `${this.getOriginUrl()}${art.querySelector('td:nth-of-type(1) a')?.getAttribute('href')}`,
    });

    document.documentElement.outerHTML
    const contents = [...document.querySelectorAll('.table-striped tbody tr')]
      //.filter(el => el.querySelector('[href^="magnet"]') !== null)
      .map(el => getContent(el))

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/engine/tl.html');
    const { document } = response.window;

    const results = this.parseResults(document);

    return results;
  }
}

export default Tl;
