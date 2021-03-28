import "reflect-metadata"
import { injectable, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShowDetailMagnetDTO from '@modules/magnetSource/dtos/IShowDetailMagnetDTO';
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import Answer from '@modules/magnetSource/repositories/schemas/Answer';

@injectable()
class ShowTechChannelsBR {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    //@injectAll('EngineFake')
    @injectAll('EngineSource')
    private sources: IEngineRepository[],
  ) { }

  public async execute({ url }: IShowDetailMagnetDTO): Promise<Answer> {
    console.log(url);
    const alias = url.split('/')[2].replace('www.', '');
    const [engine] = this.sources.filter((item) => item.getOriginUrl().includes(alias));

    if (!engine) {
      const available = this.sources.map((item) => item.getOriginUrl()).join(', ');
      throw new AppError(`Alias not found: ${alias}. Available: ${available}`);
    }

    if (!engine.detail) {
      throw new AppError(`Engine ${alias} does not have this method: detail|full-page`);
    }

    const results = await engine.detail({
      url: url
    });

    return results;
  }
}

export default ShowTechChannelsBR;
