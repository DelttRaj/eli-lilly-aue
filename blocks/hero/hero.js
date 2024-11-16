import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function extractBlockInfo(block) {
    console.log("block info ",block);
}

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
  const info = extractBlockInfo(block);
    block.innerHTML = '';
    render(html`<${Hero} />`, block);
}