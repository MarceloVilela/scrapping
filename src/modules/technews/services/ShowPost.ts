import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Post from '../infra/typeorm/schemas/Post';
import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(url: string): Promise<Post | undefined> {
    const post = await this.postsRepository.findDetails(url);

    if (!post) {
      throw new AppError(`Post not found: ${url}`);
    }

    return post;
  }
}

export default ShowPostService;
