/**
 * Converts a value in bitcoins to satoshis.
 *
 * @param voutValue - The value in bitcoins to be converted.
 * @returns The equivalent value in satoshis.
 */
export function bitcoinToSatoshis(voutValue: number): number {
  // Ensure the input is treated as a string to avoid floating-point issues
  const btcString = voutValue.toString();

  // Split the string into whole bitcoins and fractional bitcoins
  const [whole, fractional = ""] = btcString.split(".");

  // Convert the whole bitcoin part directly to satoshis
  const wholeSatoshis = parseInt(whole, 10) * 100000000;

  // Prepare the fractional part to ensure it is 8 digits long for accurate conversion
  const paddedFractional = fractional.padEnd(8, "0").slice(0, 8);

  // Convert the fractional bitcoin part to satoshis
  const fractionalSatoshis = parseInt(paddedFractional, 10);

  // Sum the whole and fractional parts, then return the total satoshis
  return wholeSatoshis + fractionalSatoshis;
}
