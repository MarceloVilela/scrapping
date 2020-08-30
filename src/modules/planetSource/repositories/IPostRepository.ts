import IShowPostDTO from '../dtos/IShowPostDTO';
import Post from '../infra/crosscutting/schemas/Post';

export default interface IPostsRepository {
  getOriginUrl(): string;

  // https://www.npmjs.com/package/thepiratebay
  getPost(data: IShowPostDTO): Promise<Post>;
};
