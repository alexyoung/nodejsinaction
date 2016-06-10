module.exports = () => {
  setTimeout(() => {
    throw new Error();
  })
};
