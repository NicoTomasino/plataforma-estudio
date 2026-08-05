import { ADSENSE_CLIENT_ID } from './config.js';

const CONSENTIMIENTO_KEY = 'consentimiento-cookies';

export function hayConsentimiento() {
  return localStorage.getItem(CONSENTIMIENTO_KEY) === 'aceptado';
}

export function darConsentimiento() {
  localStorage.setItem(CONSENTIMIENTO_KEY, 'aceptado');
  cargarAdSense();
}

export function cargarAdSense() {
  if (!ADSENSE_CLIENT_ID) return;
  if (!hayConsentimiento()) return;
  if (document.querySelector('script[data-adsense]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = 'anonymous';
  script.dataset.adsense = 'true';
  document.head.appendChild(script);
}
