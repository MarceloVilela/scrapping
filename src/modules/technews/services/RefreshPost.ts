import { injectable, inject } from 'tsyringe';

import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) { }

  public async execute(urls: string[]): Promise<string[]> {
    const posts = await this.postsRepository.findByUrl(urls);

    const urlsFound = posts.map(({ link }) => link);

    const urlsPendingCreate = urls.filter(item => !urlsFound.includes(item));

    return urlsPendingCreate;
  }
}

export default CreatePostService;
