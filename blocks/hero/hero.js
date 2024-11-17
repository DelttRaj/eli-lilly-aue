import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';


function extractBlockInfo(block) {
    const herodataJSON = {
        "textHTML" : "",
        "alt" : "",
        "image" : ""
    }

    console.log("block info inside extract block info : ",block);
}

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    const info = extractBlockInfo(block);
   // block.textContent = "";
    render(html`<${Hero} />`, block);
}