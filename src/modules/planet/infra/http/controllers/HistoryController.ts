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
    const { url: sourceLink, labels, page } = request.body;

    const createHistory = container.resolve(CreateHistoryService);

    const created = await createHistory.execute({
      sourceLink,
      labels,
      page,
    });

    return response.json(created);
  }
}
