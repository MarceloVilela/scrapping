import IShowPostDTO from '../dtos/IShowPostDTO';
import Post from '../infra/crosscutting/schemas/Article';
import IResponseHomeDTO from '../dtos/IResponseHomeDTO';

export default interface IArticlesRepository {
  getOriginUrl(): string;

  // https://www.npmjs.com/package/thepiratebay
  getPost(data: IShowPostDTO): Promise<Post>;
  getHome(data: IShowPostDTO): Promise<IResponseHomeDTO>;
};
