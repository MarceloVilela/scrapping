import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
