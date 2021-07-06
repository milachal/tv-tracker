// eslint-disable-next-line
const formatDate = (date) => {
  if (date) {
    const fullDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return fullDate.toLocaleDateString('en-US', options);
  }
};

export default formatDate;
