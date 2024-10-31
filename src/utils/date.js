import { startOfWeek, endOfWeek, format, getYear, getMonth } from 'date-fns';

export const getStartAndEndOfWeek = () => {
  const now = new Date();

  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });

  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
};

export const getStartAndEndOfMonth = (year, month) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
};

export const getCurrentMonth = () => new Date().getMonth() + 1;
export const getCurrentYear = () => new Date().getFullYear();

export const dateToMmDd = (date) => {
  const targetDate = date ? new Date(date) : new Date();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[targetDate.getDay()];
  const MmDd = `${month}월 ${day}일(${dayOfWeek})`;
  return MmDd;
};
