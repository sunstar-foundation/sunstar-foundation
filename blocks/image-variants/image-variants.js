import { decorateRenderHints } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  decorateRenderHints(block);

  const section = block.closest('.section');
  const addClassToParent = (name, el) => {
    el.parentElement.classList.add(name);
  };

  section.querySelectorAll('div').forEach((row) => {
    row.querySelectorAll('p').forEach((p) => {
      addClassToParent('para', p);
      addClassToParent('section-content', p);
    });
    row.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
      addClassToParent('heading', h);
      addClassToParent('section-content', h);
    });
  });

  section.querySelectorAll('.button-container > .button').forEach((a) => {
    a.classList.remove('primary', 'secondary', 'tertiary');
    a.classList.add('tertiary');
  });

  block.querySelectorAll('.background').forEach((row) => {
    const pictureEl = row.querySelector('picture');
    if (pictureEl) {
      const backgroundContainer = document.createElement('div');
      backgroundContainer.classList.add('image-variants-background-container');
      const pictureContainer = pictureEl.closest('div');
      backgroundContainer.append(pictureContainer);
      row.append(backgroundContainer);
    }
  });
}
