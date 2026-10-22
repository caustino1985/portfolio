/**
 * Core mathematical and algorithmic functions from the PSDLEF ADR-31 suite,
 * GPRS genomic scoring, and infrastructure physics models.
 */

export interface SNPItem {
  rsId: string;
  gene: string;
  effectAllele: string;
  dosage: number; // 0, 1, or 2
  beta: number;   // effect size
  qualityWeight?: number;
}

/**
 * Algorithm 01: Accrued Interest Calculation (30/360 or Actual/365)
 */
export function calculateAccruedInterest(
  principal: number,
  couponRateDecimal: number,
  daysAccrued: number,
  dayCountBasis: 360 | 365 = 360
): number {
  if (principal < 0 || couponRateDecimal < 0 || daysAccrued < 0) return 0;
  return principal * couponRateDecimal * (daysAccrued / dayCountBasis);
}

/**
 * Algorithm 02: Make-Whole Premium Calculation
 * rp = (TreasuryRate + spread) / frequency
 * PV = sum(Cp / (1 + rp)^t) + P / (1 + rp)^n
 * MW = max(0, PV - P)
 */
export function calculateMakeWholePremium(
  principal: number,
  annualCouponRate: number,
  treasuryRate: number,
  spreadBps: number,
  yearsRemaining: number,
  frequency: number = 2
): { presentValue: number; makeWholePremium: number } {
  if (principal <= 0 || yearsRemaining <= 0) {
    return { presentValue: principal, makeWholePremium: 0 };
  }

  const spread = spreadBps / 10000;
  const rp = (treasuryRate + spread) / frequency;
  const n = Math.floor(yearsRemaining * frequency);
  const cp = (principal * annualCouponRate) / frequency;

  let pv = 0;
  for (let t = 1; t <= n; t++) {
    pv += cp / Math.pow(1 + rp, t);
  }
  pv += principal / Math.pow(1 + rp, n);

  const makeWhole = Math.max(0, pv - principal);
  return {
    presentValue: Number(pv.toFixed(2)),
    makeWholePremium: Number(makeWhole.toFixed(2)),
  };
}

/**
 * Algorithm 04: Debt-to-Equity Conversion (e.g. In re USEC Inc. 0.0917 ratio)
 */
export function calculateDebtToEquityConversion(
  debtPrincipal: number,
  exchangeRatio: number = 0.0917
): {
  reorganizedShares: number;
  wholeShares: number;
  fractionalShares: number;
} {
  if (debtPrincipal <= 0 || exchangeRatio <= 0) {
    return { reorganizedShares: 0, wholeShares: 0, fractionalShares: 0 };
  }
  const totalShares = debtPrincipal * exchangeRatio;
  const wholeShares = Math.floor(totalShares);
  const fractionalShares = Number((totalShares - wholeShares).toFixed(4));
  return {
    reorganizedShares: Number(totalShares.toFixed(4)),
    wholeShares,
    fractionalShares,
  };
}

/**
 * S-EROI: Social Energy Return on Investment
 * S-EROI = integral(Psolar - Ploss) dt / (Kcap + integral(Cmaint) dt)
 * Returns ratio in kWh/$
 */
export function calculateSEROI(
  annualSolarKWh: number,
  annualLossKWh: number,
  initialCapitalCostUSD: number,
  annualMaintenanceUSD: number,
  lifetimeYears: number = 25
): number {
  if (initialCapitalCostUSD <= 0 || lifetimeYears <= 0) return 0;
  const netEnergyKWh = (annualSolarKWh - annualLossKWh) * lifetimeYears;
  const totalCostUSD = initialCapitalCostUSD + annualMaintenanceUSD * lifetimeYears;
  if (totalCostUSD <= 0) return 0;
  return Number((netEnergyKWh / totalCostUSD).toFixed(3));
}

/**
 * GPRS (Genetic-Phenotypic Risk Score) Additive Model
 * score = sum(beta_j * dosage_ij * qualityWeight_j)
 */
export function calculateGPRSScore(snps: SNPItem[]): {
  rawScore: number;
  normalizedZScore: number;
  percentile: number;
  riskTier: 'Typical' | 'Moderate Vulnerability' | 'High Clinical Vulnerability' | 'Severe Risk';
} {
  if (!snps || snps.length === 0) {
    return { rawScore: 0, normalizedZScore: 0, percentile: 50, riskTier: 'Typical' };
  }

  let totalScore = 0;
  for (const snp of snps) {
    const q = snp.qualityWeight ?? 1.0;
    totalScore += snp.beta * snp.dosage * q;
  }

  // Assuming population mean 1.2, SD 0.8 for standard 17-SNP risk locus model
  const meanPop = 1.2;
  const sdPop = 0.85;
  const z = (totalScore - meanPop) / sdPop;

  // Gaussian CDF approximation for percentile
  const percentile = Number((0.5 * (1 + erf(z / Math.SQRT2)) * 100).toFixed(1));

  let riskTier: 'Typical' | 'Moderate Vulnerability' | 'High Clinical Vulnerability' | 'Severe Risk' = 'Typical';
  if (percentile >= 90) riskTier = 'Severe Risk';
  else if (percentile >= 75) riskTier = 'High Clinical Vulnerability';
  else if (percentile >= 50) riskTier = 'Moderate Vulnerability';

  return {
    rawScore: Number(totalScore.toFixed(3)),
    normalizedZScore: Number(z.toFixed(2)),
    percentile,
    riskTier,
  };
}

/**
 * Error function approximation for Gaussian CDF
 */
function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * CUSIP check digit validation (Luhn variant for CUSIP-8 to CUSIP-9)
 */
export function calculateCUSIPCheckDigit(cusip8: string): string {
  const cleaned = cusip8.toUpperCase().trim();
  if (cleaned.length !== 8) return '';

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const char = cleaned[i];
    let val: number;
    if (char >= '0' && char <= '9') {
      val = parseInt(char, 10);
    } else if (char >= 'A' && char <= 'Z') {
      val = char.charCodeAt(0) - 55; // A=10, B=11...
    } else {
      return '';
    }

    if (i % 2 === 1) {
      val *= 2;
    }

    sum += Math.floor(val / 10) + (val % 10);
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}
