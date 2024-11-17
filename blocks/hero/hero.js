import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { useState, useEffect } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockInfo(block) {
    const herodataJSON = {};
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    herodataJSON.parentDiv = block; // Reference the parent div
    return herodataJSON;
}

function Hero(props) {
    const [isVisible, setIsVisible] = useState(() => {
        const style = props?.data?.parentDiv?.style;
        return style?.display !== 'none';
    });

    const wrapperRef = (node) => {
        if (node && props?.data?.textElement) {
            moveInstrumentation(props.data.textElement, node);
        }
    };

    // Monitor `style` attribute for changes
    useEffect(() => {
        const parentDiv = props?.data?.parentDiv;

        const observer = new MutationObserver(() => {
            const style = parentDiv?.style;
            const display = style?.display !== 'none';
            if (display !== isVisible) {
                setIsVisible(display); // Update visibility state
            }
        });

        if (parentDiv) {
            observer.observe(parentDiv, { attributes: true, attributeFilter: ['style'] });
        }

        // Cleanup on component unmount
        return () => observer.disconnect();
    }, [props?.data?.parentDiv, isVisible]);

    // If the component is not visible, render nothing
    if (!isVisible) return null;

    return html`
        <div>
            <div ref=${wrapperRef} data-editable="true" data-attribute="hero">
                <!-- Add static content or children here -->
                <p class="preact_text">Hero Content Here</p>
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
