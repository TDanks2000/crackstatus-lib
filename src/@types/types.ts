export interface ProviderResponse {
  title: string;
  group: string | null;
  [x: string]: unknown;
}

export interface ProviderInfoResponse {
  title: string;
  group: string | null;
  downloads: Link[];
  image: string;
  screenshots: string[];
  [x: string]: unknown;
}

export interface Link {
  url: string;
  name: string;
}
