export default async function decorate(block) {
  const parent = block.querySelector('.hero-banner div');
  if (parent) {
    parent.classList.add('hero-banner-head');
    const btncontainer = parent.querySelectorAll('div .button-container');
    const buttonhead = document.createElement('div');
    buttonhead.classList.add('button-head');
    if (btncontainer) {
      btncontainer.forEach((btn, btnindex) => {
        buttonhead.append(btn.cloneNode(true));
        if (btnindex !== 0) btn.remove();
      });
      btncontainer[0].parentNode.replaceChild(buttonhead, btncontainer[0]);
    }

    const newhead = document.createElement('p');
    newhead.classList.add('hero-header');

    const headel = parent.querySelector('h1');
    if (headel) {
      newhead.innerHTML = headel.innerHTML;
      headel.parentNode.replaceChild(newhead, headel);
    }

    const newsubhead = document.createElement('p');
    newsubhead.classList.add('hero-subheader');
    const subheadel = parent.querySelector('h2');
    if (subheadel) {
      newsubhead.innerHTML = subheadel.innerHTML;
      subheadel.parentNode.replaceChild(newsubhead, subheadel);
    }

    const newconditionel = document.createElement('p');
    newconditionel.classList.add('hero-condition');
    const conditionel = parent.querySelector('h3');
    if (conditionel) {
      newconditionel.innerHTML = conditionel.innerHTML;
      conditionel.parentNode.replaceChild(newconditionel, conditionel);
    }

    const wrapper = document.createElement("div")
    wrapper.classList.add("hero-wrapper")
    wrapper.append(parent.cloneNode(true));
    parent.parentNode.replaceChild(wrapper, parent);
    block.append(wrapper);
  }

  const pic = parent.querySelector('div picture');
  if (pic) {
    const img = pic.querySelector('img');
    if (img) {
      const div = document.createElement('div');
      div.appendChild(img.cloneNode(true)); // Clone the img element and append it to the div
      pic.parentNode.replaceChild(div, pic); // Replace the picture element with the new div
    }
  }
}
