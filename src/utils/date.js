const { DateTime, diff } = require('luxon');

export function getCurrentDate() {
  var dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_MED);
}

export function getDifferenceDate(startDate, endDate) {
  const s = DateTime.now(startDate);
  const e = DateTime.now(endDate);

  const st = DateTime.fromISO(s);
  const en = DateTime.fromISO(e)


  console.log(s, st)

  // const dif = end.diff(start, 'days');

  console.log(st, en)
  console.log(en.diff(st))

  return '';
}








