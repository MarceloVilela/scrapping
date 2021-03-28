import { JSDOM } from 'jsdom';

import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import ISearchParams from '@modules/magnetSource/dtos/ISearchParams';
import IShowDetailMagnetDTO from '@modules/magnetSource/dtos/IShowDetailMagnetDTO';
import Answer from '@modules/magnetSource/repositories/schemas/Answer';

class Tt implements IEngineRepository {
  getOriginUrl(): string {
    return 'https://torrentool.org';
  }

  async detail({ url }: IShowDetailMagnetDTO): Promise<Answer> {
    //const response = await JSDOM.fromURL(url);
    const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/detail/tt-detail.html');

    const { document } = response.window;

    const name = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const desc_link = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const thumb = document.querySelector('img.capa')?.getAttribute('src')

    const getLinks = (link: Element) => {
      let text = String(link.getAttribute('title')
        ?.replace(/\n|\r|\t/g, '')
        ?.replace(/\\n|\\r|\\t/g, '')
        ?.replace(/\s{2,}/g, ''));
      //text = text.replace(String(link.textContent), "")
      return { url: String(link.getAttribute('href')), text, type: 'magnet' }
    }

    const links = [...document.querySelectorAll('a[href^="magnet"]')]
      .map(el => getLinks(el))

    return { name: String(name), thumb: String(thumb), links, engine_url: this.getOriginUrl(), desc_link: String(desc_link) };
  }

  async parseResults(document: Document) {

    const getContent = async (art: Element) => {
      const { links } = await this.detail({ url: String(art.querySelector('a')?.getAttribute('href')) });

      return {
        //link: String(art.querySelector('a')?.getAttribute('href')),
        name: String(art.querySelector('h3')
          ?.textContent
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links,
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('a')?.getAttribute('href')),
      }
    };

    const elements = [...document.querySelectorAll('.capa_lista')];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    //const response = await JSDOM.fromURL(this.getOriginUrl()+'/search/mulan');
    const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/engine/tt.html');
    const { document } = response.window;

    const results = await this.parseResults(document);

    return results;
  }
}

export default Tt;
