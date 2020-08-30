import { JSDOM } from 'jsdom';

import IPostsRepository from '@modules/technewsSource/repositories/IPostRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import AppError from '@shared/errors/AppError';
import Post from '../schemas/Post';

// https://medium.com/@alexalvess/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686
// https://pt.stackoverflow.com/questions/82976/oque-%C3%A9-cross-cutting-e-qual-sua-rela%C3%A7%C3%A3o-com-aspect-oriented-programming-aop
class TecnoBlog implements IPostsRepository {
  getOriginUrl(): string {
    return 'https://tecnoblog.net';
  }

  async getPost({ url }: IShowPostDTO): Promise<Post> {
    console.log(`@TecnoBlog/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document.querySelector('h1.title a').getAttribute('href');
    console.log(`@TecnoBlog/getPost()/link:${link}`);

    const title = document.querySelector('h1.title a').textContent;
    console.log(`@TecnoBlog/getPost()/title:${title}`);

    const [thumb] = document
      .querySelector('.entry p img')
      .getAttribute('data-lazy-srcset')
      .split(' ');
    console.log(`@TecnoBlog/getPost()/thumb:${thumb}`);

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

    const contents = [...document.querySelectorAll('.entry *')]
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

export default TecnoBlog;
