import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreatePostService from '@modules/planet/services/CreatePost';
import ShowHistoryService from '@modules/planet/services/ShowHistory';
import CreateHistoryService from '@modules/planet/services/CreateHistory';
import UpdateHistoryService from '@modules/planet/services/UpdateHistory';
//
import ShowPostService from '@modules/planetSource/services/ShowPost';
import AppError from '@shared/errors/AppError';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url, labels, page } = request.body;
    // const labels = JSON.parse(labelsFormatted);

    // if (url.includes('172')) {
    //  return response.json({ ok: true });
    // }

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
    const updateHistory = container.resolve(UpdateHistoryService);

    console.clear();
    console.log('Planet@Refresh@Create', url, labels);

    const { posts } = await showPost.execute({
      url,
    });

    const postsCreated = [];

    for (let key = 0; key < posts.length; key++) {
      const {
        sourceLink,
        title,
        images,
        links,
        contents: contentsFormatted,
        posted_at: date,
      } = posts[key];

      // console.log(`${labels.join('@')} ... ${title}`);

      let posted_at;
      if (date.split(' ').length === 4) {
        const [day, month, year, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        posted_at = new Date(
          parseInt(year),
          monthVal[month],
          parseInt(day),
          parseInt(hour),
          minute,
        );
      } else {
        const dateCurrent = new Date();
        const year = Number(dateCurrent.getFullYear());
        const month = dateCurrent.getMonth() + 1;
        const [dayTextual, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        const day =
          dayTextual === 'Yesterday'
            ? new Date().getDate() - 1
            : new Date().getDate();
        posted_at = new Date(
          year,
          month,
          day,
          parseInt(hour),
          minute,
        );
      }

      const result = await createPost.execute({
        sourceLink,
        title,
        images,
        links,
        contents: contentsFormatted,
        labels,
        posted_at,
      });

      postsCreated.push(result);
    }

    await updateHistory.execute({
      labels,
      page,
    });

    console.log('ok!');
    return response.json(postsCreated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { labels } = request.query;

    const showPost = container.resolve(ShowPostService);
    const showHistory = container.resolve(ShowHistoryService);

    // last page from history
    // return response.json({ labels, controller: 'refresh-index' });
    const history = await showHistory.execute({
      searchFilters: labels,
    });
    if (!history) {
      throw new AppError('History not found');
    }
    const { page: pageStart, sourceLink: url } = history;

    // discovers latest page currently
    const content = await showPost.execute({
      url,
    });
    const { pageLast: pageEnd } = content;

    const items = [];
    for (let page = pageStart; page <= pageEnd; page++) {
      items.push({
        url: `${process.env.APP_API_URL}/planet/refresh`,
        params: {
          url: String(url).replace('999', String(page)),
          labels,
          page,
        },
      });
    }

    return response.json({ labels, items });
  }
}
