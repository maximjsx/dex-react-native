import { formatUnits, parseUnits } from 'viem';

export function sanitizeInput(value: string): string {
  return value
    .replace(/[^0-9.]/g, '') // Allow numbers and a single dot
    .replace(/(\..*)\./g, '$1'); // Remove multiple dots
}

export function formatTokenValue(value: bigint, tokenDecimals: number): string {
  // Convert BigInt to human-readable floating-point number
  const rawValue = parseFloat(formatUnits(value, tokenDecimals));
  // Format the result to 6 decimal places
  return rawValue.toFixed(6);
}

export function formatToBaseUnits(input: string, decimals: number): BigInt {
  const sanitizedInput = sanitizeInput(input);
  if (!sanitizedInput) {
    return 0n;
  }
  return parseUnits(sanitizedInput, decimals);
}
