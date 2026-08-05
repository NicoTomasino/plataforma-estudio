import { renderMaterias } from './views/materias.js';
import { renderMateria } from './views/materia.js';
import { renderApunte } from './views/apunte.js';
import { renderPractica } from './views/practica.js';
import { renderExamen } from './views/examen.js';
import { ADSENSE_CLIENT_ID } from './config.js';

const app = document.getElementById('app');

const VISTAS_UNIDAD = ['apunte', 'practica', 'examen'];

function parseRuta(hash) {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (partes.length === 0) return { vista: 'home' };
  if (partes[0] === 'materia' && partes[1] && partes[2] === undefined) {
    return { vista: 'materia', materiaId: partes[1] };
  }
  if (
    partes[0] === 'materia' &&
    partes[1] &&
    partes[2] === 'unidad' &&
    partes[3] &&
    VISTAS_UNIDAD.includes(partes[4])
  ) {
    return { vista: partes[4], materiaId: partes[1], unidadId: partes[3] };
  }
  return { vista: 'not-found' };
}

async function renderRuta() {
  const ruta = parseRuta(window.location.hash);

  switch (ruta.vista) {
    case 'home':
      await renderMaterias(app);
      break;
    case 'materia':
      await renderMateria(app, ruta.materiaId);
      break;
    case 'apunte':
      await renderApunte(app, ruta.materiaId, ruta.unidadId);
      break;
    case 'practica':
      await renderPractica(app, ruta.materiaId, ruta.unidadId);
      break;
    case 'examen':
      await renderExamen(app, ruta.materiaId, ruta.unidadId);
      break;
    default:
      app.innerHTML = '<p class="error">Página no encontrada.</p>';
  }
}

// Aviso de cookies/anuncios: código inline (no en un archivo aparte) a
// propósito. Un archivo separado llamado algo con "ads" o "cookie-banner"
// es bloqueado por defecto por Brave Shields / uBlock / AdBlock solo por el
// nombre — como antes era una importación estática desde app.js, ese
// bloqueo tumbaba la carga de TODA la app (pantalla en blanco). Al estar acá
// adentro, y protegido con try/catch, un bloqueo de esto nunca puede romper
// el resto de la app.
const CLAVE_CONSENTIMIENTO = 'consentimiento-cookies';

function hayConsentimiento() {
  return localStorage.getItem(CLAVE_CONSENTIMIENTO) === 'aceptado';
}

function cargarPublicidad() {
  if (!ADSENSE_CLIENT_ID) return;
  if (document.querySelector('script[data-ads-cargado]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = 'anonymous';
  script.dataset.adsCargado = 'true';
  document.head.appendChild(script);
}

function mostrarAvisoConsentimiento() {
  if (hayConsentimiento()) {
    cargarPublicidad();
    return;
  }

  const aviso = document.createElement('div');
  aviso.className = 'cookie-banner';
  aviso.innerHTML = `
    <p>
      Este sitio puede mostrar anuncios de Google que usan cookies para personalizarlos.
      Más información en <a href="/privacidad.html">Privacidad</a>.
    </p>
    <button type="button" class="boton boton--activo">Aceptar</button>
  `;

  aviso.querySelector('button').addEventListener('click', () => {
    localStorage.setItem(CLAVE_CONSENTIMIENTO, 'aceptado');
    cargarPublicidad();
    aviso.remove();
  });

  document.body.appendChild(aviso);
}

window.addEventListener('hashchange', renderRuta);
window.addEventListener('DOMContentLoaded', renderRuta);
window.addEventListener('DOMContentLoaded', () => {
  try {
    mostrarAvisoConsentimiento();
  } catch (err) {
    console.warn('No se pudo inicializar el aviso de cookies/anuncios:', err);
  }
});
