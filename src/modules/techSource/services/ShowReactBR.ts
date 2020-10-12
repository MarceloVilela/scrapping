import { injectable, inject, injectAll } from 'tsyringe';

import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import IReactBRRepository from '@modules/techSource/repositories/IReactBRRepository';
import ReactBR from '@modules/techSource/infra/crosscutting/schemas/ReactBR'

@injectable()
class ShowReactBR {
  constructor(
    @inject('ReactBRSource')
    private source: IReactBRRepository,
  ) { }

  public async execute(): Promise<ReactBR[]> {
    const data = await this.source.listCompanies();

    return data;
  }
}

export default ShowReactBR;
