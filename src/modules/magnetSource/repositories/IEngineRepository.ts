import ISearchParams from '../dtos/ISearchParams';
import IShowDetailMagnetDTO from '../dtos/IShowDetailMagnetDTO';
import Answer from '@modules/magnetSource/repositories/schemas/Answer';
import Result from '@modules/magnetSource/repositories/schemas/Result';

export default interface IEngineRepository {
  getOriginUrl(): string;

  search(data: ISearchParams): Promise<Result[] | Answer[]>;

  detail?: (data: IShowDetailMagnetDTO) => Promise<Answer>;
};
