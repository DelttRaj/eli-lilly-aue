import { html, render,vhtml } from 'https://esm.sh/htm/preact/standalone'
import { moveInstrumentation } from '../../scripts/scripts.js';


function extractBlockInfo(block) {
    const herodataJSON = {
        "text" : "",
        "alt" : "",
        "image" : ""
    }
    console.log("block info ",block);
}

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    const info = extractBlockInfo(block);
    render(html`<${Hero} />`, block);
}