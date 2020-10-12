import ISearchParams from '../dtos/ISearchParams';
import Answer from '../infra/crosscutting/schemas/Answer';

export default interface IMechanismRepository {
  getOriginUrl(): string;

  search(data: ISearchParams): Promise<Answer[]>;
};
