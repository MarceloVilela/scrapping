import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreatePostService from '@modules/planet/services/CreatePost';
import ListPostsService from '@modules/planet/services/ListPosts';
import ShowPostsService from '@modules/planet/services/ShowPost';
import DeletePostsService from '@modules/planet/services/DeletePost';

import data from './data.json';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { listPost: posts } = request.body;
    //const { listPost: posts } = data;

    const createPost = container.resolve(CreatePostService);

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

    for (let i = 0; i < posts.length; i++) {
      const {
        link,
        title,
        images,
        links,
        //contents,
        // label,
        data,
      } = posts[i];

      const sourceLink = `http://www.planetsuzy.org/${link}`;
      //const contentsFormatted = contents.length ? contents : [];
      const labels = ['Valentina Nappi', 'planetsuzy.org', 'HD'];
      console.log(`${labels.join('@')}:${i}`);
      const [day, month, year, hourMinute] = data.split(' ');
      const [hour, minute] = hourMinute.split(':');
      const posted_at = new Date(
        parseInt(year),
        monthVal[month],
        parseInt(day),
        parseInt(hour),
        minute,
      );

      // eslint-disable-next-line no-await-in-loop
      await createPost.execute({
        sourceLink,
        title,
        images,
        links,
        contents: [],
        labels,
        posted_at,
      });
    }

    console.log('ok!');
    return response.json({ ok: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { search_query: searchQuery, labels, page } = request.query;
    const pageFormatted = Number(page) ? Number(page) : 1;
    let searchFilters = typeof (labels) === 'string' ? [labels] : labels;
    searchFilters = labels === undefined ? [] : searchFilters;

    const listPost = container.resolve(ListPostsService);

    const content = await listPost.execute({
      searchQuery,
      searchFilters,
      page: pageFormatted,
    });

    return response.json(content);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowPostsService);

    const content = await showPost.execute(id);

    return response.json(content);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { ids } = request.query;

    const deletePost = container.resolve(DeletePostsService);
    const affectedRows = await deletePost.execute({ ids });

    return response.status(200).send(`${affectedRows} affected rows`);
  }
}
