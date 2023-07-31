import {Months} from './const.ts';

export const humanizeISODate = (date: string) => {
  const parseDate = new Date(date);
  return `${parseDate.getDate()} ${Months[parseDate.getMonth() - 1]}`;
};

export const getFavoriteStyles = (isFavoritePlace: boolean) => isFavoritePlace
  ? {fill: '#4481c3', stroke: '#4481c3'}
  : undefined;
