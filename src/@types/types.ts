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


//GAMESTATUS TYPES
export interface SpecsInfo {
  cpu_info: string;
  ram_info: string;
  os_info: string;
  gpu_info: string;
}

export interface GameInfo {
  id: string;
  slug: string;
  title: string;
  is_AAA: boolean;
  protections: string;
  hacked_groups: string;
  release_date: string;
  crack_date: string | null;
  short_image: string;
  full_image: string;
  teaser_link: string;
  teaser_link_steam?: string;
  count_subscribe?: number | null;
  mata_score: number | null;
  user_score: number | null;
  is_subscribe: boolean;
  readable_status: string;
  specs_info: SpecsInfo;
}

export interface GameStatusDetails {
  title: string;
  releaseDate: string;
  crackDate: string | null;
  readableStatus: string;
  specs: SpecsInfo;
}