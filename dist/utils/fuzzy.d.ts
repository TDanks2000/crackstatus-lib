import { ProviderResponse } from '../@types';
export declare const Fuzzy: (list: ProviderResponse[], query: string, options?: {
    includeScore: boolean;
    shouldSort: boolean;
    threshold: number;
    location: number;
    distance: number;
    maxPatternLength: number;
    minMatchCharLength: number;
    keys: string[];
}) => Promise<ProviderResponse[] | null>;
//# sourceMappingURL=fuzzy.d.ts.map