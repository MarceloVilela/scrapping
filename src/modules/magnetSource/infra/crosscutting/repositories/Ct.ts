import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import Answer from '../schemas/Answer';

class Ct implements IEngineRepository {
  getOriginUrl(): string {
    return 'ct'
    return 'https://comandotorrents.com';
  }

  async detail(url: string) {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/ct-detail.html');
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
      const { links } = await this.detail(String(art.querySelector('h2 a')?.getAttribute('href')));

      return {
        name: String(art.querySelector('h2 a')
          ?.getAttribute('title')
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links,
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('h2 a')?.getAttribute('href')),
      }
    };

    const elements = [...document.querySelectorAll('#content article')];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/ct.html');
    const { document } = response.window;

    const results = await this.parseResults(document);

    return results;
  }
}

export default Ct;
