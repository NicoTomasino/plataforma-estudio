import { renderMaterias } from './views/materias.js';
import { renderMateria } from './views/materia.js';
import { renderApunte } from './views/apunte.js';
import { renderPractica } from './views/practica.js';
import { renderExamen } from './views/examen.js';
import { inicializarBannerCookies } from './cookie-banner.js';

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

window.addEventListener('hashchange', renderRuta);
window.addEventListener('DOMContentLoaded', renderRuta);
window.addEventListener('DOMContentLoaded', inicializarBannerCookies);
