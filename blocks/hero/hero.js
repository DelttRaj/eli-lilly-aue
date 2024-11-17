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
               <p class="preact_text">${textContent}</p>
            </div>
        </div>
    `;
}

export default function decorate(block) {
    const wrapperDiv = document.createElement('div');
    const info = extractBlockInfo(block);
    block.textContent = '';
    // Render the Hero component into the block
    render(html`<${Hero} data=${info} />`, wrapperDiv);
    block.append(wrapperDiv);
}
