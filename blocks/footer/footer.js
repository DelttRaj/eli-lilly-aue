import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer.
 * @param {Element} block The footer block element.
 */
export default async function decorate(block) {
  // Load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // Decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-wrapper';

  const paragraphs = fragment.querySelectorAll('p');
  paragraphs.forEach((paragraph, index) => {
    paragraph.classList.add(`footer-paragraph-${index + 1}`);
  });

  const mainDiv = document.createElement('div');
  mainDiv.className = 'footer-paragraph-maincontainer';
  const firstDiv = document.createElement('div');
  firstDiv.className = 'footer-paragraph-group-1';
  const secondDiv = document.createElement('div');
  secondDiv.className = 'footer-paragraph-group-2';
  const thirdDiv = document.createElement('div');
  thirdDiv.className = 'footer-paragraph-group-3';

  if (paragraphs[0]) firstDiv.appendChild(paragraphs[0]);
  if (paragraphs[1]) secondDiv.appendChild(paragraphs[1]);
  if (paragraphs[2]) secondDiv.appendChild(paragraphs[2]);
  if (paragraphs[3]) thirdDiv.appendChild(paragraphs[3]);
  if (paragraphs[4]) thirdDiv.appendChild(paragraphs[4]);

  const containerDiv = document.createElement('div');
  containerDiv.className = 'footer-paragraph-container';
  const subContainerDiv = document.createElement('div');
  subContainerDiv.className = 'footer-paragraph-sub-container';

  mainDiv.appendChild(containerDiv);
  mainDiv.appendChild(subContainerDiv);
  containerDiv.appendChild(firstDiv);
  containerDiv.appendChild(secondDiv);
  subContainerDiv.appendChild(thirdDiv);
  footer.appendChild(mainDiv);

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);
}
