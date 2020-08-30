import Post from '../infra/crosscutting/schemas/Post';

export default interface IResponseHomeDTO {
  posts: Post[];
};
