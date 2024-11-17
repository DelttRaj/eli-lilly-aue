import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockInfo(block) {
    const herodataJSON = {};
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    return herodataJSON;
}

function Hero(props) {
    const textContent = props?.data?.textElement.textContent;
    const wrapperRef = (node) => {
        if (node && props?.data?.textElement) {
            moveInstrumentation(props.data.textElement, node);
        }
    };
  
    return html`
        <div>
            <div ref=${wrapperRef} data-editable="true" data-attribute="hero">
               <p></p>
            </div>
        </div>
    `;
}

export default function decorate(block) {
    const info = extractBlockInfo(block);

    // Render the Hero component into the block
    render(html`<${Hero} data=${info} />`, block);
}
