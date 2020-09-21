import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class MeioBit implements IArticlesRepository {
  getOriginUrl() {
    return 'https://meiobit.com';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    console.log(`@MeioBit/getHome()/url:${url}`);
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute('href'),
      title: elPost.querySelector('h2')?.textContent,
      thumb: elPost
        .querySelector('.cover')
        ?.getAttribute('style')
        ?.split('(')[1]
        ?.split(')')[0],
      // preview: '',
      created_at: elPost
        .querySelector('p.details')
        ?.textContent
        ?.split(' ')
        ?.slice(3)
        ?.join(' '),
    });

    const postsData = [...document.querySelectorAll('.col-articles-list.f-left .list-post-link'),]
      .map((elPost) => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const post = {
      link: '',
      title: '',
      thumb: '',
      contents: [],
      created_at: new Date(),
    };

    return post;
  }
}

export default MeioBit;
