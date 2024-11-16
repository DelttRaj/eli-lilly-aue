import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function Hero(){
    return html`<h1>Hello Hero!</h1>`;
}
export default function decorate(block) {
    console.log("block info ",block);
    console.log("Info from hero ",Hero());
    render(html`<${Hero} />`, block);
}