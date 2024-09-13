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
