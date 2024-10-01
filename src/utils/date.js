import { format } from 'date-fns';

export const getStartAndEndOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  const start = new Date(now.setDate(diffToMonday));
  const end = new Date(now.setDate(start.getDate() + 6));

  const formatDate = (date) => date.toISOString().split('T')[0];

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};

// export const getStartAndEndOfMonth = () => {
//   const currentDate = new Date();
//   const start = new Date(
//     Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1),
//   );
//   const end = new Date(
//     Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
//   );
//   const formatDate = (date) => date.toISOString().split('T')[0];

//   console.log(formatDate(start), formatDate(end));
//   return {
//     start: formatDate(start),
//     end: formatDate(end),
//   };
// };
export const getStartAndEndOfMonth = (year, month) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
};

export const getCurrentMonth = () => new Date().getMonth() + 1;
