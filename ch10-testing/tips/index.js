exports.addPercentageToEach = (prices, percentage) => {
  return prices.map((total) => {
    total = parseFloat(total);
    return total + (total * percentage);
  });
};

exports.sum = (prices) => {
  return prices.reduce((currentSum, currentValue) => {
    return parseFloat(currentSum) + parseFloat(currentValue);
  });
};

exports.percentFormat = (percentage) => {
  return parseFloat(percentage) * 100 + '%';
};

exports.dollarFormat = (number) => {
  return `$${parseFloat(number).toFixed(2)}`;
};
