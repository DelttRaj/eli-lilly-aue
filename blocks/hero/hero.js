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
            <div class="container-lg py-5">
        <div class="row align-items-center pt-lg-4">
            <div class="col-lg-6 col-md-12 col-sm-12 order-sm-2 text-center"><img
                    alt="Doctor speaking with a patient via telehealth"
                    aria-label="Doctor speaking with a patient via telehealth" loading="lazy" width="547" height="450"
                    decoding="async" data-nimg="1" class="d-none d-lg-block"
                    src="https://images.ctfassets.net/69ly9ke0opik/2tMzxv0PIMWtjS1c658aWT/dba2a61074b7baefc84e64c26e0cd466/illu-telehealth.svg"
                    style="color: transparent;"></div>
            <div class="col-lg-6 col-md-12 col-sm-12 order-sm-1">
                <h2 class="homeCare_title__m3INc font-xl mb-4 text-lg-start text-center">${textContent}</h2><img
                    alt="Doctor speaking with a patient via telehealth"
                    aria-label="Doctor speaking with a patient via telehealth" loading="lazy" width="395" height="325"
                    decoding="async" data-nimg="1" class="d-lg-none d-block p-3 p-lg-none m-auto"
                    src="https://images.ctfassets.net/69ly9ke0opik/2tMzxv0PIMWtjS1c658aWT/dba2a61074b7baefc84e64c26e0cd466/illu-telehealth.svg"
                    style="color: transparent;">
                <ul class="homeCare_careList__DMW8a font-sm mb-4 ms-4">
                    <li><b>Convenient - </b> Get answers, test results, care plans, and prescriptions. All without
                        waiting rooms or traffic.*</li>
                    <li><b>Knowledgeable - </b> Talk to independent healthcare professionals who may understand your
                        condition.</li>
                    <li><b>Supportive - </b> Gain additional resources, such as nutritional guidance, tips for success,
                        and helpful communities.</li>
                </ul>
                <div class="row mb-4 align-items-center">
                    <div class="col-md-12 col-sm-12">
                        <p class="fw-bold mb-2 font-md text-center text-lg-start">Get care for:</p>
                        <div class="text-lg-start text-center"><a
                                class="_button_button__VwqiT md-button secondary-blue-button me-3 my-lg-0 ms-lg-0 bg-transparent"
                                aria-label="Diabetes Telehealth" href="/telehealth/diabetes">Diabetes</a><a
                                class="_button_button__VwqiT md-button secondary-blue-button me-3 my-lg-0 ms-lg-0 bg-transparent"
                                aria-label="Migraine Telehealth" href="/telehealth/migraine">Migraine</a><a
                                class="_button_button__VwqiT md-button secondary-blue-button me-3 my-lg-0 ms-lg-0 bg-transparent"
                                aria-label="Obesity Telehealth" href="/telehealth/obesity">Obesity</a></div>
                    </div>
                </div>
                <p class="font-xs fst-italic text-center text-lg-start">* Access to telehealth services varies by state
                    and condition.</p>
            </div>
        </div>
    </div>
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
