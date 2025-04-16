// event-info.js
import { getLanguage, getNamedValueFromTable } from '../../scripts/scripts.js';
import { fetchPlaceholders } from '../../scripts/lib-franklin.js';

function getImage(block) {
  const div = getNamedValueFromTable(block, 'Image');
  return div?.querySelector('img')?.src;
}

function getText(block) {
  const div = getNamedValueFromTable(block, 'Contents');
  if (div) div.classList.add('event-info-text');
  return div;
}

function getDate(block) {
  const div = getNamedValueFromTable(block, 'Date');
  return div?.textContent.trim();
}

function getLocation(block) {
  const div = getNamedValueFromTable(block, 'Location');
  return div?.textContent.trim();
}

function getDuration(block) {
  const div = getNamedValueFromTable(block, 'Duration');
  return div?.textContent.trim();
}

function getPrice(block) {
  const div = getNamedValueFromTable(block, 'Price');
  return div?.textContent.trim();
}

function formatEventDate(timestamp) {
  const date = new Date(parseInt(timestamp, 10));
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/* 
Props: 
- image: Image URL
- text: Text content (HTML)
- date: Date (timestamp)
- location: Location (string)
- duration: Duration (milliseconds)
- price: Price (string)
*/

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders(getLanguage());

  // Get elements
  const image = getImage(block);
  const text = getText(block);
  const date = getDate(block);
  const location = getLocation(block);
  const duration = getDuration(block);
  const price = getPrice(block);

  // Clear block
  block.innerHTML = '';

  // Create container
  const container = document.createElement('div');
  container.className = 'event-info-container';

  // Add image if available
  if (image) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'event-info-image';
    const img = document.createElement('img');
    img.src = image;
    img.alt = placeholders.eventImageAlt || 'Event image';
    img.loading = 'lazy';
    imgContainer.append(img);
    container.append(imgContainer);
  }

  const content = document.createElement('div');
  content.className = 'event-info-content';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'event-info-content-container';
  // Add text if available
  if (text) {
    contentContainer.append(text);
  }

  // Create meta container
  const metaContainer = document.createElement('div');
  metaContainer.className = 'event-meta-container';

  // Add date if available
  if (date) {
    const eventDate = formatEventDate('1747408500000');
    const dateElement = document.createElement('div');
    dateElement.className = 'event-meta-item';
    dateElement.innerHTML = `
	    <div class="icon-wrapper">
        <span class="icon icon-calendar"></span>
		</div>
        <span class="meta-text">
		<span class="label">Date</span>
          ${eventDate}
        </span>
      `;
    metaContainer.appendChild(dateElement);
  }

  // Add location if available
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

  if (date && duration) {
    // Parse start date from timestamp
    const startDate = new Date(parseInt(date, 10));

    // Calculate end time (duration is already in ms)
    const endDate = new Date(startDate.getTime() + parseInt(duration, 10));

    // Format times
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const startTime = startDate.toLocaleTimeString([], timeOptions);
    const endTime = endDate.toLocaleTimeString([], timeOptions);

    // Create time element
    const timeElement = document.createElement('div');
    timeElement.className = 'event-meta-item';
    timeElement.innerHTML = `
	 <div class="icon-wrapper">
    <span class="icon icon-clock"></span>
	</div>
	<span class="meta-text">
	<span class="label">Time</span>
    <span class="event-time-range">${startTime} - ${endTime}</span>
	</div>
	
  `;
    metaContainer.appendChild(timeElement);
  }

  if (price) {
    const priceElement = document.createElement('div');
    priceElement.className = 'event-meta-item';
    priceElement.innerHTML = `
	  <div class="icon-wrapper">
		<span class="icon icon-ticket"></span>
		</div>
		<span class="meta-text">
		<span class="label">Entry fee</span>
		${price}
		</span>
	  `;
    metaContainer.appendChild(priceElement);
  }

  content.append(contentContainer);

  contentContainer.append(metaContainer);
  container.append(content);
  block.append(container);
}
