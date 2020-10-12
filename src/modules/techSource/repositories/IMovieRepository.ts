import MovieData from '../infra/crosscutting/schemas/MovieData';

export default interface IMovieRepository {
  list(): Promise<MovieData[]>;
};
