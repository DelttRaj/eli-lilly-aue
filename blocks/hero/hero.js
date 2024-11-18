import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockInfo(block) {
    const herodataJSON = {};
 //  herodataJSON.textBlock  = block.children[1].querySelector(`[data-aue-type="richtext"]`);
   herodataJSON.textBlock  = block.children[1].children[0];
   return herodataJSON;
}

function Hero(props) {
    const textContent = props?.data?.textBlock.textContent;
    const wrapperRef = (node) => {
        if (node && props?.data?.textBlock) {
            const textBlock = props?.data?.textBlock.querySelector(`[data-aue-type="richtext"]`);
            if(textBlock){
                moveInstrumentation(props.data.textBlock, node);
            }
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
    const info = extractBlockInfo(block);
    block.textContent = '';
    // Render the Hero component into the block
    render(html`<${Hero} data=${info} />`, block);
}
