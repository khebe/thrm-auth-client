export type FetchAPI = typeof fetch;
export interface AuthClientConfig {
    baseUrl: string;
    apiKey: string;
    fetch?: FetchAPI;
}
