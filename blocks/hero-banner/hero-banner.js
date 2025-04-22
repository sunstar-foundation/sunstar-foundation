import { getLanguage } from '../../scripts/scripts.js';
import { fetchPlaceholders } from '../../scripts/lib-franklin.js';

/* eslint-disable no-console */

function fetchPosterURL(poster) {
  const srcURL = new URL(poster.src);
  const srcUSP = new URLSearchParams(srcURL.search);
  srcUSP.set('format', 'webply');
  srcUSP.set('width', 750);
  return `${srcURL.pathname}?${srcUSP.toString()}`;
}

function decorateVideo(mediaRow, target) {
  const mediaDiv = document.createElement('div');
  mediaDiv.classList.add('hero-banner-media-section');
  const videoTag = document.createElement('video');
  const poster = mediaRow.querySelector('img');
  const a = mediaRow.querySelector('a');
  const videoURL = a.href;
  videoTag.toggleAttribute('autoplay', true);
  videoTag.toggleAttribute('muted', true);
  videoTag.toggleAttribute('playsinline', true);
  videoTag.toggleAttribute('loop', true);
  if (poster) {
    videoTag.setAttribute('poster', fetchPosterURL(poster));
  }
  const source = document.createElement('source');
  source.setAttribute('src', `${videoURL}`);
  source.setAttribute('type', 'video/mp4');
  videoTag.append(source);
  target.innerHTML = '';
  if (videoURL == null) {
    target.innerHTML = '';
    console.error('Video Source URL is not valid, Check hero-banner block');
  }
  mediaDiv.appendChild(videoTag);
  target.appendChild(mediaDiv);
  videoTag.muted = true;
}

function decorateBackGroundImage(mediaRow, target) {
  const mediaDiv = document.createElement('div');
  mediaDiv.classList.add('hero-banner-media-section');
  const pictureTag = mediaRow.querySelector('picture');
  target.innerHTML = '';
  mediaDiv.appendChild(pictureTag);
  target.appendChild(mediaDiv);
}

function decorateTextContent(headingRow, target, placeholders, overlap) {
  headingRow.classList.add('hero-banner-text-container');
  let textDiv = headingRow.querySelector('div');
  const heroBannerWrapper = document.createElement('div');

  if (overlap) {
    if (textDiv.querySelector('p') === null) {
      textDiv = textDiv.nextElementSibling;
      headingRow.classList.add('right-text');
      heroBannerWrapper.classList.add('right-text');
    } else {
      textDiv.classList.add('left-text');
      headingRow.classList.add('left-text');
      heroBannerWrapper.classList.add('left-text');
    }
  }

  textDiv.classList.add('hero-banner-text-wrapper');
  const pElement = textDiv.querySelector('p');
  if (target.classList.contains('careers')) {
    const linkedin = document.createElement('a');
    linkedin.innerText = placeholders['career-apply-linkedin'];
    linkedin.classList.add('button', 'primary', 'linkedin');
    linkedin.href = placeholders['career-apply-linkedin-href'];
    const sprite = document.createElement('span');
    sprite.classList.add('icon', 'icon-linkedin');
    linkedin.appendChild(sprite);

    pElement.append(linkedin);
  } else if (
    !target.classList.contains('small-box') &&
    pElement &&
    pElement.childElementCount === 1 &&
    pElement.firstElementChild.tagName === 'A'
  ) {
    textDiv.removeChild(pElement);
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('hero-banner-button-container');
    const aElement = pElement.querySelector('a');
    const spanElement = document.createElement('span');
    spanElement.textContent = aElement.textContent;
    aElement.textContent = '';
    buttonDiv.appendChild(aElement);
    buttonDiv.appendChild(spanElement);
    headingRow.appendChild(buttonDiv);
  }

  heroBannerWrapper.classList.add('hero-banner-heading-container');
  heroBannerWrapper.appendChild(headingRow);
  const heroBannerMainDiv = document.createElement('div');
  heroBannerMainDiv.classList.add('hero-banner-heading-section');
  heroBannerMainDiv.appendChild(heroBannerWrapper);
  target.appendChild(heroBannerMainDiv);
}

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders(getLanguage());

  const rows = [...block.children];
  const mediaRow = rows.length === 2 ? rows.at(0) : null;
  const contentRow = rows.length === 2 ? rows.at(1) : rows.at(0);
  if (rows.length === 1) {
    // Adding No Image class in case of hero banner without image
    block.classList.add('no-image');
  }

  const overlap = block.classList.contains('overlap');

  if (mediaRow) {
    if (mediaRow.querySelector('a') !== null) {
      decorateVideo(mediaRow, block);
    } else {
      decorateBackGroundImage(mediaRow, block);
    }
  }
  if (contentRow) {
    decorateTextContent(contentRow, block, placeholders, overlap);
  }

  if (block.classList && block.classList.contains('overlap')) {
    const cb = block.closest('.section.full-width.hero-banner-container');
    if (cb) {
      cb.classList.add('overlap');
      if (block.classList.contains('small-box')) {
        cb.classList.add('hero-small-box');
      }
    }
  }
}
