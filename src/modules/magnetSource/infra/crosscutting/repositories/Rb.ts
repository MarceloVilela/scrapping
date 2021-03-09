import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import AppError from '@shared/errors/AppError';
import Result from '../schemas/Result';

class Rb implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://rarbgproxied.org';
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

    const contents = [...document.querySelectorAll('.lista-rounded tbody tr')]
      //.filter(el => el.querySelector('[href^="magnet"]') !== null)
      .map(el => getContent(el))

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Result[]> {
    const url = `${this.getOriginUrl()}/torrents.php?search=${search_query}`
    const response = await JSDOM.fromURL(url);
    console.log(url);

    const { document } = response.window;

    const results = this.parseResults(document);

    return results;
  }
}

export default Rb;
