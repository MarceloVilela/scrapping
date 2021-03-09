import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import Answer from '../schemas/Answer';

let jsdomDetail: JSDOM = {} as JSDOM;

class Tf implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://torrentfilmes.net';
  }

  async detail(url: string) {
    const response = await JSDOM.fromURL(url);
    //const response = jsdomDetail;
    const { document } = response.window;

    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const desc_link = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const thumb = document.querySelector('.content img:nth-of-type(1)')?.getAttribute('src')

    const getLinks = (link: Element) => {
      let text = String(link.closest('.bt-down')?.textContent)
      text = text.replace(String(link.textContent), "")
      return { url: String(link.getAttribute('href')), text, type: 'magnet' }
    }

    const links = [...document.querySelectorAll('.content a')]
      .map(el => getLinks(el))

    return { title, desc_link, thumb, links };
  }

  async parseResults(document: Document) {

    const getContent = async (art: Element) => {
      //const { links } = await this.detail(String(art.querySelector('h2 a')?.getAttribute('href')));

      return {
        name: String(art.querySelector('a')
          ?.getAttribute('title')
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links: [],
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('a')?.getAttribute('href'))
      }
    };

    //const contents = [...document.querySelectorAll('#home-destaques .item')]
    //.filter(el => el.querySelector('[href*=".torrent"]') !== null)
    //.map(el => getContent(el))

    const elements = [...document.querySelectorAll('.listagem .item')];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents
      .filter(item => item.desc_link !== 'undefined');
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    const url = `${this.getOriginUrl()}/?s=${search_query}`;
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/tf.html');
    console.log(url);

    const { document } = response.window;
    const results = await this.parseResults(document);

    return results;
  }
}

export default Tf;
