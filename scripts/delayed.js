// eslint-disable-next-line import/no-cycle
import { sampleRUM, isInternalPage } from './lib-franklin.js';
// eslint-disable-next-line import/no-cycle
import { getEnvType, loadConsentManager, loadScript } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

export async function loadAdobeLaunch() {
  const adobeotmSrc = {
    dev: 'https://assets.adobedtm.com/467469cdd595/f9651373cafd/launch-a46d93f0c752-development.min.js',
    preview: 'https://assets.adobedtm.com/467469cdd595/f9651373cafd/launch-8108dcbd2d02-staging.min.js',
    live: 'https://assets.adobedtm.com/467469cdd595/f9651373cafd/launch-9e812df82057.min.js',
  };
  await loadScript(adobeotmSrc[getEnvType()]);
}

window.addEventListener('consentmanager', () => {
  if (window.uc) {
    // unblock adobe launch
    window.uc?.deactivateBlocking(['f6nkjdUL']);
  }
});

/**
 * Google Tag Manager
* */
export async function loadGTM() {
  const scriptTag = document.createElement('script');
  scriptTag.innerHTML = `
        (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
        }(window, document, 'script', 'dataLayer', 'GTM-NP34DN7'));
    `;
  document.head.prepend(scriptTag);
}

if (!isInternalPage()) {
  await loadConsentManager();
  await loadAdobeLaunch();
  if (getEnvType() === 'live') {
    await loadGTM();
  }
}
