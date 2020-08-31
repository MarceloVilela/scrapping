"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const formatDate = text => {
  const date = new Date(); //13/08

  const dayMonth = text.match(/(\d{2})\/(\d{2})/i);

  if (dayMonth) {
    date.setDate(Number(dayMonth[1]));
    date.setMonth(Number(dayMonth[2]) - 1);
  } //16h51, 16:51


  const hourMinute = text.match(/(\d{2})[h|:](\d{2})/i);

  if (hourMinute) {
    date.setHours(Number(hourMinute[1]));
    date.setMinutes(Number(hourMinute[2]));
  }

  return date;
};

var _default = formatDate;
exports.default = _default;