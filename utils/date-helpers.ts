import moment, { Moment } from 'moment';

import { CHART_DATE_FORMAT } from '../constants/date-formats';

export const timestampToDate = (timestamp: string): Date | string | number => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};

export const daysRange = (
  startDate: string | Moment,
  endDate: string | Moment
): string[] => {
  const dates = [];
  const start = moment(startDate);
  const end = moment(endDate);

  while (start.isSameOrBefore(end)) {
    dates.push(start.format('DD-MM-YYYY'));
    start.add(1, 'days');
  }
  return dates;
};

export const getDate = (dateValue: string): string => {
  if (dateValue.length > 10) {
    return moment(new Date(dateValue).getTime()).format(CHART_DATE_FORMAT);
  } else {
    return moment(dateValue, 'DD-MM-YYYY').format(CHART_DATE_FORMAT);
  }
};

//current date in format "YYYY-MM-DD"
const curDate = new Date().toISOString().substring(0, 10);

//check if that there are views already today
export const checkDateExists = (array: any[]) =>
  array.find((item: any) => {
    const dbDate =
      typeof item.date !== 'string'
        ? item.date.toISOString().substring(0, 10)
        : item.date;
    return dbDate === curDate;
  });

export const dateDiff = (start: string, end: string): number =>
  moment
    .duration(
      moment(end, CHART_DATE_FORMAT).diff(moment(start, CHART_DATE_FORMAT))
    )
    .asDays();
