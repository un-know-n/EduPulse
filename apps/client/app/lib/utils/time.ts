import moment from 'moment';
import 'moment/locale/uk';

type TMomentDate = string | Date | number;

// Set the locale to Ukrainian
moment.locale('uk');

moment.updateLocale('uk', {
  relativeTime: {
    future: 'за %s',
    past: '%s тому',
    s: 'кілька секунд',
    ss: '%d секунд',
    m: 'хвилину',
    mm: '%d хвилин',
    h: 'годину',
    hh: '%d годин',
    d: 'день',
    dd: '%d днів',
    w: 'неділю',
    ww: '%d неділі',
    M: 'місяць',
    MM: '%d місяців',
    y: 'рік',
    yy: '%d років',
  },
});

export const getFormattedTime = (date: TMomentDate, format = 'DD.MM') =>
  moment(date).utc(true).format('DD.MM');

export const checkIfExpired = (dateToCheck: TMomentDate) =>
  moment(dateToCheck).utc(true).isBefore(moment().utc(true));

export const getTestDuration = (timeToPass: number) => {
  // Convert milliseconds to duration using moment
  const duration = moment.duration(timeToPass, 'minutes');

  // Extract hours and minutes from the duration
  const formattedTime = moment
    .utc(duration.asMilliseconds())
    .format('HH:mm:ss');

  return formattedTime;
};

export const getRelativeTime = (dateString: string) => {
  const now = moment();
  const date = moment(dateString);

  // Calculate the difference in days
  const diffDays = now.diff(date, 'days');

  // Handle specific cases for "today" and "yesterday"
  if (diffDays === 0) {
    return 'сьогодні';
  } else if (diffDays === 1) {
    return 'вчора';
  }

  // Use moment's relative time functionality for other cases
  return date.fromNow();
};

export const getTransformedImportantDate = (dateString: string) => {
  // Parse and format the date
  return moment(dateString).format('dd. DD MMM. YYYY р.');
};
