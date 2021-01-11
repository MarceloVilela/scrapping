import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class Tecmundo implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://www.tecmundo.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.querySelector('h3 a')?.getAttribute('href'),
      title: elPost.querySelector('h3')?.textContent,
      thumb: elPost.querySelector('figure img')?.getAttribute('data-src'),
      // preview: '',
      created_at: elPost.querySelector('.tec--timestamp__item')?.textContent,
    });

    const postsData = [
      ...document.querySelectorAll('.tec--list.z--mt-24 .tec--list__item'),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute('href');

    const title = document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute('content');

    const thumb = document
      .querySelector('.tec--article__header figure img')
      ?.getAttribute('data-src');

    const created_at = document.querySelector('time')?.getAttribute('datetime');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null
        && el.querySelector('img')?.getAttribute('data-lazy-srcset')
      ) {
        const imgSrc = el
          .querySelector('img')
          ?.getAttribute('data-lazy-srcset')
        const [img] = imgSrc ? imgSrc.split(' ') : '';
        if (img !== thumb) {
          return {
            type: 'image',
            content: img,
          };
        }
        return {};
      }
      if (el.querySelector('.video-container') !== null) {
        return {
          type: 'video',
          content: el
            .querySelector('.video-container iframe')
            ?.getAttribute('data-src'),
        };
      }
      if (
        el.tagName === 'P'
        && el.getAttribute('class') === null
        && el.getAttribute('id') === null
      ) {
        return { type: 'text', content: el.textContent };
      }
      if (el.tagName === 'H3') {
        return { type: 'text-highlighted', content: el.textContent };
      }
      return {};
    };

    const contents = [...document.querySelectorAll('.tec--article__body *')]
      .map(elPost => getContent(elPost))
      .map(dataPost => ({
        type: String(dataPost.type),
        value: String(dataPost.content),
      }));

    const post = {
      link: String(link),
      title: String(title),
      thumb: String(thumb),
      contents,
      created_at: created_at ? new Date(created_at) : '',
    };

    return post;
  }
}

export default Tecmundo;
