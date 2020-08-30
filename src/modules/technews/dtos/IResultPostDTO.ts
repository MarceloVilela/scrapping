import Post from '../infra/typeorm/schemas/Post';

export default interface IResultPostDTO {
  data: Post[];
  total: number;
}
