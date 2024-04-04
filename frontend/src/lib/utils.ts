export const formatDate = (date: string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const { day, month, year } = {
    day: parsedDate.getDate().toString().padStart(2, '0'),
    month: (parsedDate.getMonth() + 1).toString().padStart(2, '0'), // Months are zero-based
    year: parsedDate.getFullYear()
  };
  return `${day}-${month}-${year}`;
};
