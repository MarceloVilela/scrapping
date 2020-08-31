"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _Notification = _interopRequireDefault(require("../../infra/typeorm/schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeNotificationsRepository {
  constructor() {
    this.notifications = [];
  }

  async create({
    content,
    recipient_id
  }) {
    const notification = new _Notification.default();
    Object.assign(notification, {
      id: new _mongodb.ObjectId(),
      content,
      recipient_id
    });
    await this.notifications.push(notification);
    return notification;
  }

}

var _default = FakeNotificationsRepository;
exports.default = _default;