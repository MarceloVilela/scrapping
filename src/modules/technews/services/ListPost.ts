import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '../repositories/IPostRepository';

import ISearchPostDTO from '../dtos/ISearchPostDTO';
import IResultPostDTO from '../dtos/IResultPostDTO';

@injectable()
class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) { }

  public async execute({ url, page, allowContents }: ISearchPostDTO): Promise<IResultPostDTO> {
    const result = await this.postsRepository.findByOrigin({ url, page, allowContents });

    if (result.total === 0) {
      //throw new AppError(`Did not find posts for the origin: ${url}`);
    }

    return result;
  }
}

export default ListPostService;
