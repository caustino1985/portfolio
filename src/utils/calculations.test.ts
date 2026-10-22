import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAccruedInterest,
  calculateMakeWholePremium,
  calculateDebtToEquityConversion,
  calculateSEROI,
  calculateGPRSScore,
  calculateCUSIPCheckDigit,
} from './calculations.ts';

test('calculateAccruedInterest computes accurate 30/360 bond interest', () => {
  // $1,000,000 bond at 6.625% for 90 days on 360 day basis
  const interest = calculateAccruedInterest(1000000, 0.06625, 90, 360);
  assert.equal(Math.round(interest), 16563);
});

test('calculateMakeWholePremium calculates discounted cash flows correctly', () => {
  const result = calculateMakeWholePremium(100000, 0.0675, 0.04, 50, 3, 2);
  assert.ok(result.presentValue > 100000);
  assert.ok(result.makeWholePremium > 0);
  assert.equal(result.presentValue, Number((100000 + result.makeWholePremium).toFixed(2)));
});

test('calculateDebtToEquityConversion correctly maps 500M USEC debt to 45.85M LEU shares', () => {
  // $500,000,000 * 0.0917 = 45,850,000 shares
  const conversion = calculateDebtToEquityConversion(500000000, 0.0917);
  assert.equal(conversion.reorganizedShares, 45850000);
  assert.equal(conversion.wholeShares, 45850000);
  assert.equal(conversion.fractionalShares, 0);

  // Series A: $350,000,000 * 0.0917 = 32,095,000 shares
  const seriesA = calculateDebtToEquityConversion(350000000, 0.0917);
  assert.equal(seriesA.wholeShares, 32095000);

  // Series B: $150,000,000 * 0.0917 = 13,755,000 shares
  const seriesB = calculateDebtToEquityConversion(150000000, 0.0917);
  assert.equal(seriesB.wholeShares, 13755000);
});

test('calculateSEROI evaluates solar microgrid threshold (>= 0.73 kWh/$)', () => {
  // 150 kW system producing 210,000 kWh/yr with 10,000 kWh loss over 25 yrs
  // Total cost: $280,000 capital + $3,000/yr maint * 25 = $355,000
  // Net energy: 200,000 * 25 = 5,000,000 kWh
  // Ratio: 5,000,000 / 355,000 = ~14.08 kWh/$
  const seroi = calculateSEROI(210000, 10000, 280000, 3000, 25);
  assert.ok(seroi >= 0.73);
});

test('calculateGPRSScore aggregates multi-locus risk and assigns risk tier', () => {
  const snps = [
    { rsId: 'rs1800955', gene: 'DRD4', effectAllele: '7R', dosage: 2, beta: 0.37 },
    { rsId: 'rs28363170', gene: 'DAT1', effectAllele: '10R', dosage: 2, beta: 0.26 },
    { rsId: 'rs4680', gene: 'COMT', effectAllele: 'Met', dosage: 2, beta: 0.40 },
    { rsId: 'rs1800497', gene: 'DRD2', effectAllele: 'A1', dosage: 1, beta: 0.20 },
  ];
  const score = calculateGPRSScore(snps);
  assert.ok(score.rawScore > 1.5);
  assert.ok(score.percentile > 50);
  assert.ok(['High Clinical Vulnerability', 'Severe Risk'].includes(score.riskTier));
});

test('calculateCUSIPCheckDigit validates official financial identifiers', () => {
  // Microsoft CUSIP: 594918104 -> base 59491810, check digit 4
  assert.equal(calculateCUSIPCheckDigit('59491810'), '4');

  // General Electric CUSIP: 369604103 -> base 36960410, check digit 3
  assert.equal(calculateCUSIPCheckDigit('36960410'), '3');

  // Pfizer CUSIP: 717081103 -> base 71708110, check digit 3
  assert.equal(calculateCUSIPCheckDigit('71708110'), '3');

  // Apple CUSIP: 037833100 -> base 03783310, check digit 0
  assert.equal(calculateCUSIPCheckDigit('03783310'), '0');
});
