import moment from 'moment';

type TMomentDate = string | Date | number;

export const getFormattedTime = (date: TMomentDate, format = 'DD.MM') =>
  moment(date).utc(true).format('DD.MM');

export const checkIfExpired = (dateToCheck: TMomentDate) =>
  moment(dateToCheck).utc(true).isBefore(moment().utc(true));
