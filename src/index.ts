import {Elamigos} from "./providers/elamigos";
import {FitGirl} from "./providers/fitgirl";

const elamigos = new FitGirl();
elamigos.getInfo('https://fitgirl-repacks.site/the-witcher-3-wild-hunt-complete-edition/').then(result => {
    console.log(result);
}).catch(err => {
    console.error('An error occurred:', err);
});