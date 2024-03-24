// Import Fuse from fuse.js
import Fuse from 'fuse.js';
import { ProviderResponse } from '../@types';

const flags = {
  skip: ['uncracked', 'unlocked'],
};

// Adjust the options to match those expected by fuse.js
const defaultOptions = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.6, // Adjust the threshold as needed
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title'], // Specify the keys to search in
};

const clearRegex = /[^\w\s]/g;

export const Fuzzy = async (
  list: ProviderResponse[],
  query: string,
  options = defaultOptions,
): Promise<ProviderResponse | null> => {
  const items = list
    .filter(({ title }) => !flags.skip.some(flag => title.includes(flag)))
    // remove weird letters
    .map(({ title, group, url, id }) => ({
      title: title.replace(clearRegex, ''),
      group,
      url,
      id,
    }));

  // Create a Fuse instance with the items and options
  const fuse = new Fuse(items, options);

  // Perform the search
  const result = fuse.search(query.replace(clearRegex, ''));

  // Return the first result if any, otherwise null
  return result.length > 0 ? result[0].item : null;
};
