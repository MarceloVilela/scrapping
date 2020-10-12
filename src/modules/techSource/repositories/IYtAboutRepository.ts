import IYtAboutDTO from '../dtos/IYtAboutDTO';
import YtAboutData from '../infra/crosscutting/schemas/YtAboutData';

export default interface IYtAboutRepository {
  getAbout(data: IYtAboutDTO): Promise<YtAboutData>;
};
