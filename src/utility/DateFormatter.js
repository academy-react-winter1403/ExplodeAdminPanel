export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
export const deprateDate = (dateString) => {
  const res = dateString.split('T')[0];
  return res;
};
//   how use?
//   formatDate(dateString)
