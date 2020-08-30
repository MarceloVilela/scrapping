import IMailProvider from '../models/IMailProvider';
import ISendMailMailDTO from '../dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailMailDTO[] = [];

  public async sendMail(message: ISendMailMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
