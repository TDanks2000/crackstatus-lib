import { ProviderInfoResponse } from '../../@types';
export declare class GameStatus {
    protected name: string;
    private baseUrl;
    checkStatus(title: string): Promise<ProviderInfoResponse | null>;
    /**
     * takes a title and converts it to a slug
     *
     * @param title The title of the game
     * @returns string
     * @example "Halo Infinite" -> "halo-infinite"
     */
    private formatTitleToSlug;
}
//# sourceMappingURL=index.d.ts.map