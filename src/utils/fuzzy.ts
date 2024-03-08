// TODO: Redo sort and remove fuzzysort for other fuzzy sorting package
import fuzzy from 'fuzzysort';
import { ProviderResponse } from '../@types';

const flags = {
  skip: ['uncracked', 'unlocked'],
};

// play around with these settings
const defaultOptions = {
  allowTypo: false,
  limit: 1,
  threshold: -12,
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
    .map(({ title, group }) => ({
      title: title.replace(clearRegex, ''),
      group,
    }));

  const result = fuzzy.go(query.replace(clearRegex, ''), items, {
    ...defaultOptions,
    ...options,
    key: 'title',
  });

  return result.length > 0 ? result[0].obj : null;
};
