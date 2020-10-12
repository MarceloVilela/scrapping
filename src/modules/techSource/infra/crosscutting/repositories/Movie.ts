import { JSDOM } from 'jsdom';

import IMovieRepository from '@modules/techSource/repositories/IMovieRepository';
import MovieData from '../schemas/MovieData';

class Movie implements IMovieRepository {

  getOriginUrl(): string {
    return 'https://github.com/k4m4/movies-for-hackers/blob/master/readme.md';
  }

  async list(): Promise<MovieData[]> {
    console.log(`@Movie/listCompanies()`);
    const response = await JSDOM.fromURL(this.getOriginUrl());
    //const response = await JSDOM.fromFile('./src/modules/techSource/infra/crosscutting/repositories/mv.html');
    const { document } = response.window;

    const getContentCategoryMovie = (art: Element, category: string, type: string) => ({
      link: art.querySelector('a')?.getAttribute('href')?.replace('www.imdb.com', 'hackermovie.club'),
      title: art.querySelector('a')?.text,
      //$('td:nth-of-type(2)').textContent.split('/')
      cloudTag: art.querySelector('td:nth-of-type(2)')?.textContent?.split('/'),
      category: category,
      type: type,
      year: art.querySelector('td:nth-of-type(3)')?.textContent,
      rating: art.querySelector('td:nth-of-type(4)')?.textContent?.split('/')[0],
      thumb: '',
    })

    const getContent = (table: Element) => {
      const category = String(table.previousSibling?.previousSibling?.textContent)
      const type = table.querySelector('th')?.textContent !== 'TITLE'
        ? String(table.querySelector('th')?.textContent)
        : 'TV Shows'

      const items = [...table.querySelectorAll('tr')]
        .filter(el => el.querySelector('a') !== null)
        .map(el => getContentCategoryMovie(el, category, type))
        .map(el => ({
          link: String(el.link),
          title: String(el.title),
          cloudTag: String(el.cloudTag),
          category: String(el.category),
          type: String(el.type),
          year: Number(el.year),
          rating: Number(el.rating),
          thumb: String(el.thumb),
        }));

      return items;
    }

    const items = [...document.querySelectorAll('table')]
      .map(el => getContent(el))

    return [...new Set(...items)];
  }
}

export default Movie;
