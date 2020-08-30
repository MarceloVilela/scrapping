import { JSDOM } from 'jsdom';

import IPostsRepository from '@modules/technewsSource/repositories/IPostRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import AppError from '@shared/errors/AppError';
import Post from '../schemas/Post';

class Tecmundo implements IPostsRepository {
  getOriginUrl(): string {
    return 'https://www.tecmundo.com.br';
  }

  async getPost({ url }: IShowPostDTO): Promise<Post> {
    console.log(`@TecnoBlog/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document
      .querySelector('link[rel="canonical"]')
      .getAttribute('href');
    const title = document
      .querySelector('meta[property="og:title"]')
      .getAttribute('content');
    const thumb = document
      .querySelector('.tec--article__header figure img')
      .getAttribute('data-src');

    const getContent = (el) => {
      if (
        el.querySelector('img') !== null &&
        el.querySelector('img').getAttribute('data-lazy-srcset')
      ) {
        const [img] = el
          .querySelector('img')
          .getAttribute('data-lazy-srcset')
          .split(' ');
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
            .getAttribute('data-src'),
        };
      }
      if (
        el.tagName === 'P' &&
        el.getAttribute('class') === null &&
        el.getAttribute('id') === null
      ) {
        return { type: 'text', content: el.textContent };
      }
      if (el.tagName === 'H3') {
        return { type: 'text-highlighted', content: el.textContent };
      }
      return {};
    };

    const contents = [...document.querySelectorAll('.tec--article__body *')]
      .map((elPost) => getContent(elPost))
      .filter((item) => 'content' in item)
      .map((dataPost) => ({
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

export default Tecmundo;
