import "reflect-metadata"
import { injectable, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISearchMagnetDTO from '@modules/magnetSource/dtos/ISearchMagnetDTO';
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import Answer from '@modules/magnetSource/repositories/schemas/Answer';
import Result from '@modules/magnetSource/repositories/schemas/Result';

@injectable()
class ListResults {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    //@injectAll('EngineFake')
    @injectAll('EngineSource')
    private sources: IEngineRepository[],
  ) { }

  public async execute({ alias, search_query = '' }: ISearchMagnetDTO): Promise<Result[] | Answer[]> {
    const [engine] = this.sources.filter((item) => item.getOriginUrl().includes(alias));

    if (!engine) {
      const available = this.sources.map((item) => item.getOriginUrl()).join(', ');
      throw new AppError(`Alias not found: ${alias}. Available: ${available}`);
    }

    const results = await engine.search({
      search_query
    });

    return results;
  }
}

export default ListResults;
