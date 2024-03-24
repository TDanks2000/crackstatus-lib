export * from './fuzzy';
export * from './helpers';

/**
 * Parses a string containing a file size into a more readable format.
 *
 * @param {string} size - The size string to parse (e.g., '3.4 GB').
 * @returns {string} The parsed size string (e.g., '3.4 GB'). If the input string
 *                  does not match the expected format, an empty string is returned.
 */
export const parseSize = (size: string): string => {
  // Regular expression to match a number followed by a space and then a unit (e.g., GB, MB)
  const regex = /(\d+\.\d+|\d+)(\s*)([a-zA-Z]+)/;
  const match = size.match(regex);

  // If a match is found, return the number and unit, otherwise return an empty string
  return match ? `${match[1]}${match[2]}${match[3]}` : '';
};
