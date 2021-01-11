import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class OlharDigital implements IArticlesRepository {
  getOriginUrl() {
    return 'https://olhardigital.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}/noticias`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute('href'),
      title: elPost.getAttribute('alt'),
      thumb: elPost.querySelector('img')
        ? url + elPost.querySelector('img')?.getAttribute('src')
        : '',
      // preview: '',
      created_at: elPost.querySelector('.ite-nfo.nfo-tpo')?.textContent,
    });

    const postsData = [...document.querySelectorAll('.container article > a'),]
      .map((elPost) => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document
      .querySelector('.fb-comments')
      ?.getAttribute('data-href');

    const title = document.querySelector('.post.current-item')!.textContent;

    const thumb = this.getOriginUrl() + document
      .querySelector('.banner img')
      ?.getAttribute('src');

    const created_at = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null
        && el.querySelector('img')?.getAttribute('src')
      ) {
        const imgSrc = this.getOriginUrl() + el
          .querySelector('img')
          ?.getAttribute('src')

        const [img] = String(imgSrc).split(' ');
        if (img !== thumb) {
          // return {
          //  type: 'image',
          //  content: img,
          // };
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

    const contents = [...document.querySelectorAll('.inner-content *')]
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
      created_at: new Date(created_at ? created_at : ''),
    };

    return post;
  }
}

export default OlharDigital;
