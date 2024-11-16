import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

export default function decorate(block) {
    console.log("block info ",block);
    console.log("html info",html);
}