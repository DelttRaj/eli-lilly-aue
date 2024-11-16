import { h, render,vhtml } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    console.log("vhtml presence ",vhtml);
    block.innerHTML = '';
    render(html`<${Hero} />`, block);
}