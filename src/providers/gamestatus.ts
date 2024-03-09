import axios from 'axios';
import urlcat from 'urlcat';
import {GameInfo, GameStatusDetails} from "../@types";



export class GameStatusChecker {
    private baseUrl: string = 'https://gamestatus.info/back/api/gameinfo/game/';
    private formatTitleToSlug(title: string): string {
        return title.replace(/\s+/g, '-').toLowerCase();
    }
    async checkStatus(title: string): Promise<GameStatusDetails | string> {
        //todo maybe there is better way, rn im using title -> slug convert
        const formattedTitle = this.formatTitleToSlug(title);
        //kinda like this urlcat lib, cleaner then ${} stuff
        const url = urlcat(this.baseUrl, ':title', { title: encodeURIComponent(formattedTitle) });
        try {
            const response = await axios.get<GameInfo>(url);
            const game = response.data;
            // if we need more info u can check gameinfo type what it has
            return {
                title: game.title,
                releaseDate: game.release_date,
                crackDate: game.crack_date,
                readableStatus: game.readable_status,
                specs: game.specs_info,
            };
        } catch (error) {
            console.error('Failed to fetch game status:', error);
            return 'Error fetching game status';
        }
    }
}

