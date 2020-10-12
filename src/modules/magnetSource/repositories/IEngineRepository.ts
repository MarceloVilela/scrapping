import ISearchParams from '../dtos/ISearchParams';
import Answer from '../infra/crosscutting/schemas/Answer';
import Result from '../infra/crosscutting/schemas/Result';

export default interface IEngineRepository {
  getOriginUrl(): string;

  search(data: ISearchParams): Promise<Result[] | Answer[]>;
};
