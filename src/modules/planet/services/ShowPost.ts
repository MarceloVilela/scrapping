import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '@modules/planet/repositories/IPostRepository';
import Bulletin from '@modules/planet/infra/typeorm/schemas/Bulletin';

@injectable()
class ListPostsService {
  constructor(
    @inject('GalleryRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(id: string): Promise<Bulletin | undefined> {
    const post = await this.postsRepository.findOne(id);

    return post;
  }
}

export default ListPostsService;
