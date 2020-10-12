import "reflect-metadata";

import ShowMovies from './ShowMovies';
import FakeMovie from '@modules/techSource/repositories/fakes/Movie';
import IMovieRepository from '@modules/techSource/repositories/IMovieRepository';

let fakeMovieRepository: IMovieRepository;
let showMovies: ShowMovies;

describe('@tech-source/movie', () => {
  beforeAll(() => {
    fakeMovieRepository = new FakeMovie();

    showMovies = new ShowMovies(
      fakeMovieRepository
    );
  });

  it('should be able to list meetups on category', async () => {

    const movies = await showMovies.execute();
    console.log(movies);
    expect(movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          link: expect.stringContaining('://'),
          title: expect.stringMatching(/\w/),
          cloudTag: expect.stringMatching(/\w/),
          category: expect.stringMatching(/\w/),
          type: expect.stringMatching(/\w/),
          year: expect.any(Number),
          rating: expect.any(Number),
          //thumb: expect.stringMatching(/\w/),
        }),
      ])
    );

  });
});
