import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';


function extractBlockInfo(block) {
    const herodataJSON = {    };
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    return herodataJSON;
}

function Hero(props){
    console.log("Props inside Hero ",props);
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    const info = extractBlockInfo(block);
   // block.textContent = "";
    render(html`<${Hero} data=${info}/>`, block);
}