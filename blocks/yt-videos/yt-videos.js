export default function decorate(block) {
  [...block.children].forEach((row) => {
    // add video modal support if there is an anchor (to a video) and a picture
    const anchor = row.querySelector('a');
    const picture = row.querySelector('picture');
    const anchorIsModal = anchor && anchor.classList.contains('video-link');

    if (picture && anchorIsModal) {
      row.classList.add('video-modal');

      // add the picture inside the anchor tag and remove the text
      anchor.textContent = '';
      anchor.classList.add('video-modal');
      anchor.appendChild(picture);

      // add unclickable behaviour to the anchor
      anchor.classList.add('unclickable');

      // Remove unclickable behaviour to the anchor after 3 seconds
      setTimeout(() => {
        anchor.classList.remove('unclickable');
      }, 3000);

      // remove empty paragraphs
      row.querySelectorAll('p').forEach((p) => {
        if (!p.classList.contains('button-container')) {
          p.remove();
        }
      });

      picture.querySelector('img').classList.add('video-modal');
    }
  });
}
