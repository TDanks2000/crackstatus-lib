import {Elamigos} from "./providers/elamigos";

const elamigos = new Elamigos();
elamigos.getInfo('https://www.elamigos-games.net/games/grim-dawn-definitive-edition').then(result => {
    console.log(result);
}).catch(err => {
    console.error('An error occurred:', err);
});