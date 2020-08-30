import ISendMailMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailMailDTO): Promise<void>;
};
