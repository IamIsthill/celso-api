export function convertToMb(bytes: string | number): string {
  const convertedBytes = Number(bytes);
  const mb = 1024 * 1024;
  const result = Math.ceil((convertedBytes / mb) * 100) / 100; // ceil to 2 decimals
  return `${result.toFixed(2)} MB`;
}
