import { getMateria } from '../api.js';

export async function renderMateria(container, materiaId) {
  container.innerHTML = '<p class="estado">Cargando materia…</p>';

  let materia;
  try {
    materia = await getMateria(materiaId);
  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
    return;
  }

  const unidades = (materia.unidades ?? [])
    .map(
      (unidad) => `
        <div class="unidad">
          <p class="unidad__titulo">${unidad.titulo}</p>
          <div class="unidad__acciones">
            <a class="boton boton--activo" href="#/materia/${materiaId}/unidad/${unidad.id}/apunte">Apuntes</a>
            <a class="boton boton--activo" href="#/materia/${materiaId}/unidad/${unidad.id}/practica">Práctica</a>
            <a class="boton boton--activo" href="#/materia/${materiaId}/unidad/${unidad.id}/examen">Examen</a>
          </div>
        </div>
      `
    )
    .join('');

  container.innerHTML = `
    <p class="breadcrumb"><a href="#/">← Materias</a></p>
    <h2>${materia.nombre}</h2>
    <p class="tarjeta__descripcion">${materia.descripcion ?? ''}</p>
    <div class="unidades">${unidades}</div>
  `;
}
