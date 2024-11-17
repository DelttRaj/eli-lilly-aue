import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';


function extractBlockInfo(block) {
    const herodataJSON = {    };
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    return herodataJSON;
}


function Hero(props){
    const preactHeroWrapper = document.createElement("div");
   // const textContent = textElement.textContent;
    moveInstrumentation(props?.textElement,preactHeroWrapper)
    return html`<div>${preactHeroWrapper}</div>`;
}
export default function decorate(block) {
    const info = extractBlockInfo(block);
  //  block.textContent = "";
    render(html`<${Hero} data=${info}/>`, block);
}