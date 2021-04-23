import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreatePostDTO from '@modules/planet/dtos/ICreatePostDTO';
import Bulletin from '../infra/typeorm/schemas/Bulletin';
import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('GalleryRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    sourceLink,
    title,
    images,
    links,
    contents,
    labels,
    posted_at,
  }: ICreatePostDTO): Promise<Bulletin | undefined> {
    const { data } = await this.postsRepository.find({
      //searchQuery: title,
      searchQuery: links[0],
      searchFilters: [],
      page: 1,
    });

    // console.log(sourceLink);
    // prevent duplicate
    const [postExists] = data.filter((item) => item.sourceLink === sourceLink);

    if (postExists) {
      console.log(`prevents duplicate${postExists.sourceLink}`);
      return postExists;
    }

    const post = await this.postsRepository.create({
      sourceLink,
      title,
      images,
      links,
      contents,
      labels,
      posted_at,
    });

    return post;
  }
}

export default CreatePostService;
