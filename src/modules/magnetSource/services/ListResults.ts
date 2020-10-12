import "reflect-metadata"
import { injectable, inject, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISearchMagnetDTO from '@modules/magnetSource/dtos/ISearchMagnetDTO';
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import Result from '@modules/magnetSource/infra/crosscutting/schemas/Result'
import Answer from '@modules/magnetSource/infra/crosscutting/schemas/Answer'

@injectable()
class ShowTechChannelsBR {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    @injectAll('EngineSource')
    private sources: IEngineRepository[],
  ) { }

  public async execute({ alias, search_query = '' }: ISearchMagnetDTO): Promise<Result[] | Answer[]> {
    const [engine] = this.sources.filter((item) => alias.includes(item.getOriginUrl()),);

    const results = await engine.search({
      search_query
    });

    return results;
  }
}

export default ShowTechChannelsBR;
