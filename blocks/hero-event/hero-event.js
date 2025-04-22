import { getLanguage, getNamedValueFromTable } from '../../scripts/scripts.js';
import { fetchPlaceholders } from '../../scripts/lib-franklin.js';

/* eslint-disable no-console */

function getImage(block) {
  const div = getNamedValueFromTable(block, 'Image');
  if (!div) return null;
  // Get the image element (assuming it's an <img> inside the div)
  const img = div.querySelector('img');
  if (!img) return null;
  return img.src; // Return just the image URL
}

function getText(block) {
  const div = getNamedValueFromTable(block, 'Contents');
  if (!div) return null;
  div.classList.add('hero-event-text');
  return div;
}

function getDate(block) {
  const div = getNamedValueFromTable(block, 'Date');
  if (!div) return null;
  return div.textContent.trim();
}

function getLocation(block) {
  const div = getNamedValueFromTable(block, 'Location');
  if (!div) return null;
  return div.textContent.trim();
}

function createCountdown(targetDate, container) {
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      container.innerHTML = '<div class="countdown-ended">Event has started!</div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    container.innerHTML = `
	<div class="hero-event-countdown">
    <div class="countdown-item">
      <span class="countdown-value">${days}</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-value">${hours}</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-value">${minutes.toString().padStart(2, '0')}</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-value">${seconds.toString().padStart(2, '0')}</span>
      <span class="countdown-label">Seconds</span>
    </div>
	</div>
  `;
  }

  // Initial update
  updateCountdown();

  // Update every second
  const timer = setInterval(updateCountdown, 1000);

  // Return cleanup function
  return () => clearInterval(timer);
}

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders(getLanguage());

  // Get all elements
  const imageUrl = getImage(block);
  const text = getText(block);
  const date = getDate(block);
  const location = getLocation(block);

  // Clear the block
  block.innerHTML = '';

  // Create container div
  const container = document.createElement('div');
  container.classList.add('hero-event-container');

  const metaContainer = document.createElement('div');
  metaContainer.className = 'event-meta-container';

  // Create date/time element with icon
  const dateTimeElement = document.createElement('div');
  dateTimeElement.className = 'event-meta-item';
  dateTimeElement.innerHTML = `
  <span class="icon icon-calendar"></span>
  <span class="meta-text">
    ${new Date().toLocaleString()} (Local Time)
  </span>
`;

  // Create location element with icon
  const locationElement = document.createElement('div');
  locationElement.className = 'event-meta-item';
  locationElement.innerHTML = `
  <span class="icon icon-location"></span>
  <span class="meta-text">${location || 'Location not specified'}</span>
`;

  // Append elements to meta container
  metaContainer.appendChild(dateTimeElement);
  metaContainer.appendChild(locationElement);

  // Insert after the <p> element
  const pElement = block.querySelector('p');
  if (pElement) {
    pElement.insertAdjacentElement('afterend', metaContainer);
  }

  // Add image if exists
  if (imageUrl) {
    container.style.backgroundImage = `url('${imageUrl}')`;
    container.classList.add('has-background');
  }

  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-event-content');

  // Add text content
  if (text) {
    contentWrapper.append(text);

    // Create and append meta info container after the text
    const metaContainer = document.createElement('div');
    metaContainer.className = 'event-meta-container';

    // Add event date (from the block data)
    if (date) {
      const eventDate = new Date(parseInt(date, 10));
      const dateElement = document.createElement('div');
      dateElement.className = 'event-meta-item';
      dateElement.innerHTML = `
	    <div class="icon-wrapper">
        <span class="icon icon-calendar"></span>
		</div>
        <span class="meta-text">
		<span class="label">Date</span>
          ${eventDate.toLocaleDateString()} at ${eventDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
        </span>
      `;
      metaContainer.appendChild(dateElement);
    }

    // Add location
    if (location) {
      const locationElement = document.createElement('div');
      locationElement.className = 'event-meta-item';
      locationElement.innerHTML = `
	  <div class="icon-wrapper">
        <span class="icon icon-location"></span>
		</div>
        <span class="meta-text">
		<span class="label">Location</span>
		${location}
		</span>
      `;
      metaContainer.appendChild(locationElement);
    }

    text.appendChild(metaContainer);
  }

  const countdownDiv = document.createElement('div');
  countdownDiv.classList.add('hero-event-countdown-container');

  if (date) {
    const targetDate = new Date(parseInt(date, 10));
    createCountdown(targetDate, countdownDiv);
  }
  // Add countdown to content wrapper
  contentWrapper.append(countdownDiv);

  // Add content wrapper to container
  container.append(contentWrapper);

  // Add container to block
  block.append(container);
}
