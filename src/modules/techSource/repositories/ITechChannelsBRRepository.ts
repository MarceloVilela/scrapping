import IShowPostDTO from '../dtos/IShowPostDTO';
import ChannelData from '../infra/crosscutting/schemas/ChannelData';

export default interface ITechChannelsBRRepository {
  getOriginUrl(): string;

  // https://www.npmjs.com/package/thepiratebay
  getPost(data: IShowPostDTO): Promise<ChannelData[]>;
};
