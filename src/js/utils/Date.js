export const getDate = (mode) => {
  if (!['from', 'to'].includes(mode)) return null;

  const date = new Date();
  mode === 'from' && date.setHours(date.getHours() - 168);

  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${year}-${month}-${day}`;
};

export const getCardDate = (date) => {
  if (!date) return;

  const correctDate = new Date(date);

  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(correctDate);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(correctDate);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(correctDate);

  return `${day} ${month} ${year}`;
};
