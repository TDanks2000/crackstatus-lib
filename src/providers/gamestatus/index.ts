import axios from 'axios';
import urlcat from 'urlcat';
import { ProviderInfoResponse } from '../../@types';
import { GameInfo } from './types';

export class GameStatus {
  protected name: string = 'GameStatus';
  private baseUrl: string = 'https://gamestatus.info/back/api/gameinfo/game/';

  async checkStatus(title: string): Promise<ProviderInfoResponse | null> {
    //todo maybe there is better way, rn im using title -> slug convert
    const formattedTitle = this.formatTitleToSlug(title);

    //kinda like this urlcat lib, cleaner then ${} stuff
    const url = urlcat(this.baseUrl, ':title', { title: encodeURIComponent(formattedTitle) });

    try {
      // destruct data and rename it to game
      const { data: game } = await axios.get<GameInfo>(url);

      // Return the data as ProviderInfoResponse
      return {
        title: game.title,
        group: game.hacked_groups[0],
        downloads: [],
        image: game.full_image,
        screenshots: [game.full_image],
        releaseDate: game.release_date,
        crackDate: game.crack_date,
        readableStatus: game.readable_status,
        specs: game.specs_info,
      };
    } catch (error) {
      throw new Error(`Failed to fetch game status ${(error as Error).message}`);
    }
  }

  /**
   * takes a title and converts it to a slug
   *
   * @param title The title of the game
   * @returns string
   * @example "Halo Infinite" -> "halo-infinite"
   */
  private formatTitleToSlug = (title: string): string => title.replace(/\s+/g, '-').toLowerCase();
}
