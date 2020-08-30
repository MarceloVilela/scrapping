import IParserMailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParserMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParserMailTemplateDTO;
};
