import { AxiosAdapter, AxiosInstance } from 'axios';
/**
 * Represents the configuration for a proxy.
 */
export interface ProxyConfig {
    /**
     * The proxy URL
     * @example https://proxy.com
     **/
    url: string | string[];
    /**
     * X-API-Key header value (if any)
     **/
    key?: string;
    /**
     * The proxy rotation interval in milliseconds. (default: 5000)
     */
    rotateInterval?: number;
}
/**
 * The Proxy class provides a way to configure and manage HTTP proxies for making requests using Axios.
 */
export declare class Proxy {
    protected proxyConfig?: ProxyConfig | undefined;
    protected adapter?: AxiosAdapter | undefined;
    /**
     *
     * @param proxyConfig The proxy config (optional)
     * @param adapter The axios adapter (optional)
     */
    constructor(proxyConfig?: ProxyConfig | undefined, adapter?: AxiosAdapter | undefined);
    private validUrl;
    /**
     * Set or Change the proxy config
     */
    setProxy(proxyConfig: ProxyConfig): void;
    /**
     * Set or Change the axios adapter
     */
    setAxiosAdapter(adapter: AxiosAdapter): void;
    private rotateProxy;
    private toMap;
    protected client: AxiosInstance;
}
export default Proxy;
//# sourceMappingURL=proxy.d.ts.map