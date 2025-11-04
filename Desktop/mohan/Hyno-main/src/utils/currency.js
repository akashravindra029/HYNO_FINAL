// Currency utility for INR formatting
const USD_TO_INR = 83; // Approximate conversion rate

/**
 * Formats price in INR with rupee symbol
 * @param {number} priceInINR - Price in INR
 * @returns {string} Formatted price in INR
 */
export const formatPrice = (priceInINR) => {
  return `₹${priceInINR.toFixed(2)}`;
};

/**
 * Converts USD amount to INR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in INR
 */
export const convertToINR = (usdAmount) => {
  return usdAmount * USD_TO_INR;
};
