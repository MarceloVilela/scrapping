import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreatePostService from '@modules/planet/services/CreatePost';
import ListPostsService from '@modules/planet/services/ListPosts';
//
import ShowPostService from '@modules/planetSource/services/ShowPost';

export default class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { url } = request.query;

    const monthVal = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const showPost = container.resolve(ShowPostService);
    const createPost = container.resolve(CreatePostService);

    const content = await showPost.execute({
      url: String(url),
    });

    const pageStart = 56;
    const pageEnd = content.pageLast;
    // pageEnd = 55;

    for (let page = pageStart; page <= pageEnd; page++) {
      const currentUrl = String(url).replace('999', String(page));
      console.log(`request page(${page}): ${currentUrl}`);

      const postsPage = await showPost.execute({
        url: currentUrl,
      });

      for (let key = 0; key < postsPage.posts.length; key++) {
        const {
          sourceLink,
          title,
          images,
          links,
          contents: contentsFormatted,
          posted_at: date,
        } = postsPage.posts[key];

        const labels = ['Chloe Amour', 'planetsuzy.org', 'HD'];
        console.log(`${labels.join('@')} ... ${title}`);

        const [day, month, year, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        const posted_at = new Date(
          parseInt(year),
          monthVal[month],
          parseInt(day),
          parseInt(hour),
          minute,
        );

        await createPost.execute({
          sourceLink,
          title,
          images,
          links,
          contents: contentsFormatted,
          labels,
          posted_at,
        });
      }
    }

    console.log('ok!');
    return response.json({ ok: true });
  }

  public async qwert(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { search_query: searchQuery, sp } = request.query;
    const searchFilters = sp ? sp.split(',') : [];

    const showPost = container.resolve(ListPostsService);

    const content = await showPost.execute({ searchQuery, searchFilters });

    return response.json(content);
  }
}
