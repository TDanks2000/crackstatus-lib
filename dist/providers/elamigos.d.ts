import { BaseProvider, ProviderInfoResponse, ProviderResponse } from '../@types';
/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
export declare class Elamigos extends BaseProvider {
    name: string;
    url: string;
    search(query: string): Promise<ProviderResponse | null>;
    info(id: string, ...args: any[]): Promise<ProviderInfoResponse | null>;
}
//# sourceMappingURL=elamigos.d.ts.map