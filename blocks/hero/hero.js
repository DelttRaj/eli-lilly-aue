import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockInfo(block) {
    const herodataJSON = {};
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    return herodataJSON;
}

function Hero(props) {
    // Reference for the div wrapper to enable instrumentation
    const wrapperRef = (node) => {
        if (node && props?.data?.textElement) {
            // Move instrumentation and keep it editable
            moveInstrumentation(props.data.textElement, node);
        }
    };

    // Use HTM to ensure the wrapper is included in the JSX tree
    return html`
        <div>
            <div ref=${wrapperRef} data-editable="true" data-attribute="hero">
                <!-- Preact will manage this div, but it remains editable for AEM -->
            </div>
        </div>
    `;
}

export default function decorate(block) {
    const info = extractBlockInfo(block);

    // Render the Hero component into the block
    render(html`<${Hero} data=${info} />`, block);
}
