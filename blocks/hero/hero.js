import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * This method is for extracting the block common for both live-EDS page and Editor enabled page in AEM
 * @param {HTMLElement} block 
 * @returns {Object} JSON - which then passed as props to Hero Component in preact
 */
function extractBlockInfo(block) {
    const herodataJSON = {};
 //  herodataJSON.textBlock  = block.children[1].querySelector(`[data-aue-type="richtext"]`);
   herodataJSON.textBlock  = block.children[1].children[0]; 
   return herodataJSON;
}

/**
 * This component takes props as object from the extracted block and then refines the data to be fitted and editable in both EDS live page 
 * and in editor mode
 * @param {Object} props 
 * @returns {Object} 
 */
function Hero(props) {
    const textContent = props?.data?.textBlock.textContent;
    const wrapperRef = (node) => {
        if (node && props?.data?.textBlock) {
            const textBlock = props?.data?.textBlock.querySelector(`[data-aue-type="richtext"]`); 
            if(textBlock)
            {
                moveInstrumentation(textBlock, node);
            }
        }
    };
  
    return html`
        <div>
            <div ref=${wrapperRef}>
               <h2 class="preact_text">${textContent}</h2>
            </div>
        </div>
    `;
}
/**
 * This is the default function render the block when loadBlock gets called from script.js
 * This calls the render function from preact
 * @param {HTMLElement} block 
 */
export default function decorate(block) {
    const info = extractBlockInfo(block);
    block.textContent = '';
    // Render the Hero component into the block
    render(html`<${Hero} data=${info} />`, block);
}
