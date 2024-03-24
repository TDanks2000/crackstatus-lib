//  TODO: make url required when i can be bothered
export interface ProviderResponse {
  title: string;
  group: string | null;
  url?: string;
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
