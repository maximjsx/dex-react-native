import { formatUnits, parseUnits } from 'viem';

export function formatTokenValue(value: bigint, tokenDecimals: number): string {
  // Convert BigInt to human-readable floating-point number
  const rawValue = parseFloat(formatUnits(value, tokenDecimals));

  // Format the result to 6 decimal places
  return rawValue.toFixed(6);
}

export const formatToBaseUnits = (input: string, decimals: number): BigInt => {
  // Sanitize input to ensure it contains only valid characters
  const sanitizedInput = input
    .replace(/[^0-9.]/g, '') // Allow numbers and a single dot
    .replace(/(\..*)\./g, '$1'); // Remove multiple dots

  if (!sanitizedInput) {
    return 0n; // Return 0n if input is empty or invalid
  }

  return parseUnits(sanitizedInput, decimals);
};
