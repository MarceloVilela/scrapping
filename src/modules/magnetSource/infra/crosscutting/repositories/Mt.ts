import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import Answer from '../schemas/Answer';

let jsdomDetail: JSDOM = {} as JSDOM;

class Mt implements IEngineRepository {
  getOriginUrl(): string {
    return 'mt'
    return 'https://baixarfilmetorrent.net';
  }

  async detail(url: string) {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = jsdomDetail;
    const { document } = response.window;

    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const desc_link = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const thumb = document.querySelector('.entry-content img.alignleft')?.getAttribute('src')

    const getLinks = (link: Element) => {
      let text = String(link.textContent);
      //text = text.replace(String(link.textContent), "")
      return { url: String(link.getAttribute('href')), text, type: 'magnet' }
    }

    const links = [...document.querySelectorAll('a[href^="magnet"]')]
      .map(el => getLinks(el))

    return { title, desc_link, thumb, links };
  }

  async parseResults(document: Document) {

    const getContent = async (art: Element) => {
      const { links } = await this.detail(String(art.querySelector('h2 a')?.getAttribute('href')));

      return {
        name: String(art.querySelector('h2 a')
          ?.textContent
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links,
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('h2 a')?.getAttribute('href'))
      }
    };

    const elements = [...document.querySelectorAll('.ItemN')];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/mt.html');
    const { document } = response.window;

    jsdomDetail = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/mt-detail.html');

    const results = await this.parseResults(document);

    return results;
  }
}

export default Mt;
