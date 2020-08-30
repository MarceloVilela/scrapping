import { Repository, getRepository } from 'typeorm';
import IPostsRepository from '@modules/technews/repositories/IPostRepository';

import ICreatePostDTO from '@modules/technews/dtos/ICreatePostDTO';
import IResultPostDTO from '@modules/technews/dtos/IResultPostDTO';
import ISearchPostDTO from '@modules/technews/dtos/ISearchPostDTO';

import Post from '../schemas/Post';
import PostContent from '../schemas/PostContent';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post, 'mongo');
  }

  public async create({
    link,
    title,
    thumb,
    contents,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      link,
      title,
      thumb,
      contents,
    });

    const contentRepostitory = getRepository(PostContent, 'mongo');
    const contentsItems = contentRepostitory.create(contents);

    post.contents = contentsItems;

    await this.ormRepository.save(post);

    return post;
  }

  public async findByUrl(urls: string[]): Promise<Post[]> {
    const urlsFormatted = urls.map((url) => new RegExp(url, 'i'));
    const urlFilters = urlsFormatted.map((urlFormatted) => ({
      link: { $regex: urlFormatted },
    }));

    const posts = await this.ormRepository.find({
      where: { $or: [...urlFilters] },
    });
    // const posts = await this.ormRepository.find();

    return posts;
  }

  public async findByOrigin({ url, page = 1, allowContents }: ISearchPostDTO): Promise<IResultPostDTO> {
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage; // 0
    const take = itemsPerPage; // 10

    const urlFormatted = new RegExp(url, 'i');
    const originFilter = {
      link: { $regex: urlFormatted },
    };

    const [data, total] = await this.ormRepository.findAndCount({
      select: !allowContents ? ['id', 'link', 'title', 'thumb', 'created_at', 'posted_at'] : undefined,
      where: { ...originFilter },
      order: { created_at: 'DESC' },
      skip,
      take,
    });

    const formattedData = data.map((item, key) => ({
      ...item,
      title: `${skip + (key + 1)}: ${item.title}`
    }));

    return { data: formattedData, total };
  }

  public async findDetails(url: string): Promise<Post | undefined> {
    const urlFilters = {
      link: { $in: [url] },
    };

    const post = await this.ormRepository.findOne({ where: { ...urlFilters } });

    return post;
  }
}

export default PostsRepository;
