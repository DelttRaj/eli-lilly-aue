import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * This method is for extracting the block common for both live-EDS page and Editor enabled page in AEM
 * @param {HTMLElement} block 
 * @returns {Object} JSON - which then passed as props to Hero Component in vanilla JS
 */
function extractBlockInfo(block) {
    const herodataJSON = {};
    herodataJSON.textBlock = block?.children[1]?.children[0];
    herodataJSON.pictureBlock = block?.children[0]?.children[0]?.getElementsByTagName("picture")[0];
    herodataJSON.descriptionBlock = block?.children[2]?.children[0];
    return herodataJSON;
}

/**
 * Fetches the image element from the given picture element.
 *
 * @param {HTMLElement} pictureElement - The picture element containing the image.
 * @returns {HTMLImageElement} The image element within the picture element.
 */
function fetchImage(pictureElement) {
    return pictureElement?.querySelector("img");
}

/**
 * Builds and renders the Hero component using vanilla JavaScript.
 *
 * @param {HTMLElement} block - The block where the component will be rendered.
 * @param {Object} data - The data extracted from the block.
 */
function renderHero(block, data) {
    // Extract required data
    const textBlock = data?.textBlock;
    const pictureBlock = data?.pictureBlock;
    const descriptionBlock = data?.descriptionBlock;

    const textContent = textBlock?.innerHTML || 'Default content';
    const imagesource = fetchImage(pictureBlock)?.src || '';
    const innerHTMLDesc = descriptionBlock?.innerHTML || '<p>Default description</p>';

    // Create the structure using vanilla JavaScript
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'rgb(254, 243, 242)';

    wrapper.innerHTML = `
        <div class="container-lg py-5">
            <div class="row align-items-center pt-lg-4">
                <div class="col-lg-6 col-md-12 col-sm-12 order-sm-2 text-center">
                    <img
                        alt="Doctor speaking with a patient via telehealth"
                        aria-label="Doctor speaking with a patient via telehealth"
                        loading="lazy"
                        width="547"
                        height="450"
                        decoding="async"
                        data-nimg="1"
                        class="d-none d-lg-block"
                        src="${imagesource}"
                        style="color: transparent;"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 order-sm-1">
                    <div>
                        <div>${textContent}</div>
                    </div>
                    <img
                        alt="Doctor speaking with a patient via telehealth"
                        aria-label="Doctor speaking with a patient via telehealth"
                        loading="lazy"
                        width="395"
                        height="325"
                        decoding="async"
                        data-nimg="1"
                        class="d-lg-none d-block p-3 p-lg-none m-auto"
                        src="${imagesource}"
                        style="color: transparent;"
                    />
                    <div>
                        <div>${innerHTMLDesc}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Instrument text block
    const textWrapper = wrapper.querySelector('.col-lg-6 > div:first-child');
    if (textWrapper && textBlock) {
        moveInstrumentation(textBlock.querySelector('[data-aue-type="richtext"]'), textWrapper);
    } else {
        console.warn("Text block or wrapper for richtext not found.");
    }

    // Instrument image
    const imageWrapper = wrapper.querySelector('.col-lg-6.order-sm-2 img');
    if (imageWrapper && pictureBlock) {
        moveInstrumentation(fetchImage(pictureBlock), imageWrapper);
    } else {
        console.warn("Image or picture block not found.");
    }

    // Instrument description block
    const descriptionWrapper = wrapper.querySelector('.col-lg-6 > div:nth-child(3)');
    if (descriptionWrapper && descriptionBlock) {
        moveInstrumentation(descriptionBlock.querySelector('[data-aue-type="richtext"]'), descriptionWrapper);
    } else {
        console.warn("Description block or wrapper not found.");
    }

    // Clear the block content and append the rendered component
    block.textContent = '';
    block.appendChild(wrapper);
}

/**
 * Default function to render the block when loadBlock gets called from script.js.
 *
 * @param {HTMLElement} block 
 */
export default function decorate(block) {
    const data = extractBlockInfo(block);
    renderHero(block, data);
}
