import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParserMailTemplateDTO): Promise<string>;
};
