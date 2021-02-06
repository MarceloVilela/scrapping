import { Exception } from 'handlebars';
import { injectable, inject } from 'tsyringe';

import IDeletePostFilterDTO from '../dtos/IDeletePostFilterDTO';
import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) { }

  public async execute(filterPost: IDeletePostFilterDTO): Promise<Number> {
    const affectedRows = await this.postsRepository.delete(filterPost);

    return affectedRows;
  }
}

export default CreatePostService;
