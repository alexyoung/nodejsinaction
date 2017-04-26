const tips = require('..');
const should = require('should');
const tax = 0.12;
const tip = 0.15;
const prices = [10, 20];
const pricesWithTipAndTax = tips.addPercentageToEach(prices, tip + tax);

pricesWithTipAndTax[0].should.equal(12.7);
pricesWithTipAndTax[1].should.equal(25.4);

const totalAmount = tips.sum(pricesWithTipAndTax).toFixed(2);
totalAmount.should.equal('38.10');

const totalAmountAsCurrency = tips.dollarFormat(totalAmount);
totalAmountAsCurrency.should.equal('$38.10');

const tipAsPercent = tips.percentFormat(tip);
tipAsPercent.should.equal('15%');
