import { BaseProvider, ProviderResponse } from '../@types';

export class FitGirl extends BaseProvider {
  name: string = 'fitgirl';
  url: string = 'https://fitgirl-repacks.site';

  search(query: string, ...args: any[]): Promise<ProviderResponse> {
    throw new Error('Method not implemented.');
  }
}
