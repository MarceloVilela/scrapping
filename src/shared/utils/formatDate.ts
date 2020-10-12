const formatDate = (text: string) => {
  const date = new Date();

  if(!text){
    return date;
  }

  //13/08
  const dayMonth = text.match(/(\d{2})\/(\d{2})/i);
  if (dayMonth) {
    date.setDate(Number(dayMonth[1]));
    date.setMonth(Number(dayMonth[2]) - 1);
  }

  //16h51, 16:51
  const hourMinute = text.match(/(\d{2})[h|:](\d{2})/i);
  if (hourMinute) {
    date.setHours(Number(hourMinute[1]));
    date.setMinutes(Number(hourMinute[2]));
  }

  return date;
}

export default formatDate;
