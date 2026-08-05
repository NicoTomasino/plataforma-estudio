import { hayConsentimiento, darConsentimiento, cargarAdSense } from './ads.js';

export function inicializarBannerCookies() {
  if (hayConsentimiento()) {
    cargarAdSense();
    return;
  }

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>
      Este sitio puede mostrar anuncios de Google que usan cookies para personalizarlos.
      Más información en <a href="/privacidad.html">Privacidad</a>.
    </p>
    <button type="button" class="boton boton--activo">Aceptar</button>
  `;

  banner.querySelector('button').addEventListener('click', () => {
    darConsentimiento();
    banner.remove();
  });

  document.body.appendChild(banner);
}
