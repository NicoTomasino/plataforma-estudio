import { getMaterias } from '../api.js';

export async function renderMaterias(container) {
  container.innerHTML = '<p class="estado">Cargando materias…</p>';

  let materias;
  try {
    materias = await getMaterias();
  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
    return;
  }

  if (materias.length === 0) {
    container.innerHTML = '<p class="estado">Todavía no hay materias en /content.</p>';
    return;
  }

  const tarjetas = materias
    .map(
      (materia) => `
        <a class="tarjeta" href="#/materia/${materia.id}">
          <p class="tarjeta__titulo">${materia.nombre}</p>
          <p class="tarjeta__descripcion">${materia.descripcion ?? ''}</p>
        </a>
      `
    )
    .join('');

  container.innerHTML = `<div class="materias">${tarjetas}</div>`;
}
