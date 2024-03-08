import {Elamigos} from "./providers/elamigos";

const elamigos = new Elamigos();
elamigos.search('Witcher').then(result => {
    console.log(result);
}).catch(err => {
    console.error('An error occurred:', err);
});