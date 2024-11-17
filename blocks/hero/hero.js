import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';


function extractBlockInfo(block) {
    const herodataJSON = {
        "text" : "",
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
    const heroWrapperDiv = document.createElement('div');
    block.textContent = "";
    render(html`<${Hero} />`, heroWrapperDiv);
}