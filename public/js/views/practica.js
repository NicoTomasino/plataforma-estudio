import { getQuiz, getMateria } from '../api.js';

export function corregir(preguntas, respuestas) {
  const detalle = preguntas.map((pregunta) => {
    const opcionElegida = respuestas[pregunta.id];
    return {
      id: pregunta.id,
      correcta: opcionElegida === pregunta.respuestaCorrecta,
      opcionElegida,
      respuestaCorrecta: pregunta.respuestaCorrecta,
    };
  });

  const puntaje = detalle.filter((d) => d.correcta).length;

  return { puntaje, total: preguntas.length, detalle };
}

export async function renderPractica(container, materiaId, unidadId) {
  container.innerHTML = '<p class="estado">Cargando práctica…</p>';

  let materia;
  let quiz;
  try {
    [materia, quiz] = await Promise.all([
      getMateria(materiaId),
      getQuiz(materiaId, unidadId),
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

  if (!quiz.existe) {
    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad}</h2>
      <p class="estado">Todavía no hay práctica para esta unidad.</p>
    `;
    return;
  }

  const preguntas = quiz.preguntas;

  const preguntasHtml = preguntas
    .map(
      (pregunta) => `
        <div class="pregunta" data-pregunta-id="${pregunta.id}">
          <p class="pregunta__enunciado">${pregunta.enunciado}</p>
          <div class="pregunta__opciones">
            ${pregunta.opciones
              .map(
                (opcion, i) => `
                  <label class="opcion">
                    <input type="radio" name="${pregunta.id}" value="${i}">
                    ${opcion}
                  </label>
                `
              )
              .join('')}
          </div>
          <p class="pregunta__explicacion" hidden></p>
        </div>
      `
    )
    .join('');

  container.innerHTML = `
    ${breadcrumb}
    <h2>${tituloUnidad}</h2>
    <form class="practica">
      ${preguntasHtml}
      <button type="submit" class="boton boton--activo">Corregir</button>
      <p class="resultado" hidden></p>
    </form>
  `;

  const form = container.querySelector('.practica');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const respuestas = {};
    for (const pregunta of preguntas) {
      const marcada = form.querySelector(`input[name="${pregunta.id}"]:checked`);
      respuestas[pregunta.id] = marcada ? Number(marcada.value) : undefined;
    }

    const resultado = corregir(preguntas, respuestas);

    for (const detalle of resultado.detalle) {
      const preguntaEl = form.querySelector(`[data-pregunta-id="${detalle.id}"]`);
      const pregunta = preguntas.find((p) => p.id === detalle.id);

      preguntaEl.classList.toggle('pregunta--correcta', detalle.correcta);
      preguntaEl.classList.toggle('pregunta--incorrecta', !detalle.correcta);

      const explicacionEl = preguntaEl.querySelector('.pregunta__explicacion');
      explicacionEl.textContent = pregunta.explicacion ?? '';
      explicacionEl.hidden = false;
    }

    const resultadoEl = form.querySelector('.resultado');
    resultadoEl.textContent = `Puntaje: ${resultado.puntaje} / ${resultado.total}`;
    resultadoEl.hidden = false;
  });
}
