export interface ProviderResponse {
  title: string;
  group: string | null;
  [x: string]: any;
}

export interface ProviderInfoResponse {
  title: string;
  group: string | null;
  downloads: Link[];
  image: string;
  screenshots: string[];
}

export interface Link {
  url: string;
  name: string;
}
