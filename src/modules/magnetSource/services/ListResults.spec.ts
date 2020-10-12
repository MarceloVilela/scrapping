import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'
import AppError from '@shared/errors/AppError';

import ListResultsService from './ListResults';
//import AvailableNewsSources from '@modules/magnetSource/infra/crosscutting/repositories';
import AvailableNewsSources from '@modules/magnetSource/repositories/fakes';
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';

const filePath = path.resolve('src', 'assets', 'mock', 'magnet-source', 'engine', '%s');

let fakeEngineRepository: IEngineRepository[];
let listResults: ListResultsService;

describe('@magnetSource/ListResults', () => {
  beforeAll(() => {
    const sources = Object.values(AvailableNewsSources).map((Source) => (
      new Source()
    ));

    listResults = new ListResultsService(
      sources
    );

    jest.setTimeout(10000);
  });

  it('should be able to list results by lime engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'lime.html')));

    const results = await listResults.execute({
      alias: 'lime',
      search_query: ''
    });

    expect(results).toContainMagnetResults();
  });

  it('should be able to list results by rarbg engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'rarbg.html')));

    const results = await listResults.execute({
      alias: 'rb',
      search_query: ''
    });

    expect.toContainMagnetResults(results);
  });

  it('should be able to list results by tl engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'tl.html')));

    const results = await listResults.execute({
      alias: 'tl',
      search_query: ''
    });

    expect.toContainMagnetResults(results);
  });

  it('should be able to list results by zq engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'zq.html')));

    const results = await listResults.execute({
      alias: 'zq',
      search_query: ''
    });

    expect(results).toContainMagnetResults();
  });

  //link, name, size, seeds, leech, engine_url, desc_link
  it('should be able to list results by ct engine', async () => {
    const results = await listResults.execute({
      alias: 'ct',
      search_query: ''
    });

    expect.toContainMagnetAnswers(results);
  });

  it('should be able to list results by mt engine', async () => {
    const results = await listResults.execute({
      alias: 'mt',
      search_query: ''
    });

    expect(results).toContainMagnetAnswers();
  });

  it('should be able to list results by ob engine', async () => {
    const results = await listResults.execute({
      alias: 'ob',
      search_query: ''
    });

    expect.toContainMagnetAnswers(results);
  });

  it('should be able to list results by tf engine', async () => {
    const results = await listResults.execute({
      alias: 'tf',
      search_query: ''
    });

    expect.toContainMagnetAnswers(results);
  });

  it('should be able to list results by tt engine', async () => {
    const results = await listResults.execute({
      alias: 'tt',
      search_query: ''
    });

    expect.toContainMagnetAnswers(results);
  });

});
