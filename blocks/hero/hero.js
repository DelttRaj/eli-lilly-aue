import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    console.log("block info ",block);
    console.log("html info",html);
    block.textContent = '';
   const somefunction = render(html`<${Hero} />`, block);
   console.log("some function returned",somefunction);
}