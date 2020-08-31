"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class EtherealMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const info = await this.client.sendMail({
      from: {
        name: (from === null || from === void 0 ? void 0 : from.name) || 'Equipe GoBarber',
        address: (from === null || from === void 0 ? void 0 : from.email) || 'equipe@gobarber.com.br'
      },
      to: {
        name: (to === null || to === void 0 ? void 0 : to.name) || 'Equipe GoBarber',
        address: (to === null || to === void 0 ? void 0 : to.email) || 'equipe@gobarber.com.br'
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(info));
  }

}, _temp)) || _class) || _class) || _class) || _class);
var _default = EtherealMailProvider;
exports.default = _default;