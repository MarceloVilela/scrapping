import { injectable, inject } from 'tsyringe';

import ICreatePostDTO from '@modules/technews/dtos/ICreatePostDTO';
import Post from '../infra/typeorm/schemas/Post';
import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) { }

  public async execute({
    link,
    title,
    thumb,
    contents,
    created_at
  }: ICreatePostDTO): Promise<Post> {
    const [postFound] = await this.postsRepository.findByUrl([link]);
    if (postFound) {
      return postFound;
    }

    const post = await this.postsRepository.create({
      link,
      title,
      thumb,
      contents,
      created_at
    });

    return post;
  }
}

export default CreatePostService;
