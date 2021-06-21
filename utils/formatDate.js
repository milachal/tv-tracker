const formatDate = (date) => {
  const fullDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return fullDate.toLocaleDateString('en-US', options);
};

export { formatDate };