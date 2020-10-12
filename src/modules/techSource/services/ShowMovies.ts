import { injectable, inject, injectAll } from 'tsyringe';

import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import IMovieRepository from '@modules/techSource/repositories/IMovieRepository';
import MovieData from '@modules/techSource/infra/crosscutting/schemas/MovieData'

@injectable()
class ShowMovies {
  constructor(
    @inject('MovieSource')
    private source: IMovieRepository,
  ) { }

  public async execute(): Promise<MovieData[]> {
    const data = await this.source.list();

    return data;
  }
}

export default ShowMovies;
