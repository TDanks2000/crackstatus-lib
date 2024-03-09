import { ProviderResponse } from '../@types';
export declare const Fuzzy: (list: ProviderResponse[], query: string, options?: {
    allowTypo: boolean;
    limit: number;
    threshold: number;
}) => Promise<ProviderResponse | null>;
//# sourceMappingURL=fuzzy.d.ts.map