import { getApunte, getMateria } from '../api.js';

export async function renderApunte(container, materiaId, unidadId) {
  container.innerHTML = '<p class="estado">Cargando apunte…</p>';

  let materia;
  let apunte;
  try {
    [materia, apunte] = await Promise.all([
      getMateria(materiaId),
      getApunte(materiaId, unidadId),
    ]);
  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
    return;
  }

  const unidad = (materia.unidades ?? []).find((u) => u.id === unidadId);
  const tituloUnidad = unidad?.titulo ?? unidadId;

  const breadcrumb = `
    <p class="breadcrumb">
      <a href="#/">Materias</a> ·
      <a href="#/materia/${materiaId}">${materia.nombre}</a>
    </p>
  `;

  if (!apunte.existe) {
    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad}</h2>
      <p class="estado">Todavía no hay apunte para esta unidad.</p>
    `;
    return;
  }

  const { marked } = await import('/vendor/marked/marked.esm.js');

  container.innerHTML = `
    ${breadcrumb}
    <article class="apunte">${marked.parse(apunte.markdown)}</article>
  `;
}
