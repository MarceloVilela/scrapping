import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class GizModo implements IArticlesRepository {
  getOriginUrl() {
    return 'https://gizmodo.uol.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.querySelector('h3 a')?.getAttribute('href'),
      title: elPost.querySelector('h3')?.textContent?.replace(/\n|\r|\t/g, ''),
      thumb: elPost
        .querySelector('.postFeaturedImg img')
        ?.getAttribute('srcset')
        ?.split(' ')[0],
      created_at: elPost.querySelector('.published.updated')?.textContent,
    });

    const postsData = [...document.querySelectorAll('.layoutContent-main .list-item'),]
      .map((elPost) => getContent(elPost));
    
    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document
      .querySelector('meta[property="og:url"]')
      ?.getAttribute('content');

    const title = document
      .querySelector('meta[property="og:title"]')!
      ?.getAttribute('content');

    const thumb = document
      .querySelector('.postFeaturedImg--single img')
      ?.getAttribute('src');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null
        && el.querySelector('img')?.getAttribute('src')
      ) {
        const imgSrc = el
          .querySelector('img')
          ?.getAttribute('src')

        const img = String(imgSrc);
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

    const contents = [...document.querySelectorAll('.postContent *')]
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
      created_at: new Date(),
    };

    return post;
  }
}

export default GizModo;
