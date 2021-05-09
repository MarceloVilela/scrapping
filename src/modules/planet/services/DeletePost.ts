import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeletePostFilterDTO from '@modules/planet/dtos/IDeletePostFilterDTO';
import IResultPostDTO from '@modules/planet/dtos/IResultPostDTO';
import IPostsRepository from '@modules/planet/repositories/IPostRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('GalleryRepository')
    private postsRepository: IPostsRepository,
  ) { }

  public async execute({
    ids
  }: IDeletePostFilterDTO): Promise<Number> {
    const affectedRows = await this.postsRepository.delete({ ids });

    return affectedRows;
  }
}

export default DeletePostService;
