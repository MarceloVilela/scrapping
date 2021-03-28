import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'

import ListResultsService from './ListResults';

//import magnetSources from '@modules/magnetSource/infra/crosscutting/repositories';
import MagnetFakesSources from '@modules/magnetSource/repositories/fakes';

const filePath = path.resolve('src', 'assets', 'mock', 'magnet-source', 'engine', '%s');

let listResults: ListResultsService;

describe('@magnetSource/ListResults', () => {
  beforeAll(() => {
    const sources = Object.values(MagnetFakesSources).map((Source) => (
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
      alias: 'torlock',
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
      alias: 'comandotorrent',
      search_query: ''
    });

    expect.toContainMagnetAnswers(results);
  });

  it('should be able to list results by mt engine', async () => {
    const results = await listResults.execute({
      alias: 'megatorrentshd',
      search_query: ''
    });

    expect(results).toContainMagnetAnswers();
  });

  it('should be able to list results by ob engine', async () => {
    const results = await listResults.execute({
      alias: 'ondebaixa',
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
