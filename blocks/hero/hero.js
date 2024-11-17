import { html, render, useState, useEffect } from 'https://esm.sh/htm/preact/standalone';
import { moveInstrumentation } from '../../scripts/scripts.js';

function extractBlockInfo(block) {
    const herodataJSON = {};
    herodataJSON.textElement = block.querySelector("div:nth-child(2) > div > div");
    return herodataJSON;
}

function Hero(props) {
    // State to hold the text content
    const [textContent, setTextContent] = useState(props?.data?.textElement?.textContent);

    const wrapperRef = (node) => {
        if (node && props?.data?.textElement) {
            moveInstrumentation(props.data.textElement, node);
        }
    };

    // Use an effect to listen for text content changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const updatedText = props?.data?.textElement?.textContent;
            if (updatedText !== textContent) {
                setTextContent(updatedText); // Update the state when the text changes
            }
        });

        if (props?.data?.textElement) {
            observer.observe(props.data.textElement, { childList: true, subtree: true });
        }

        // Cleanup the observer on unmount
        return () => observer.disconnect();
    }, [props?.data?.textElement, textContent]);

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
