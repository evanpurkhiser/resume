export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString('en-US', {month: 'long'});
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const formatDateRange = (start: string, end?: string) => {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : 'Present';
  return `${startFormatted} – ${endFormatted}`;
};
