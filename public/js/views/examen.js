import { getExamen, getMateria, evaluarRespuesta } from '../api.js';

const NIVELES_AUTOEVALUACION = ['Correcta', 'Parcial', 'Incorrecta'];

export async function renderExamen(container, materiaId, unidadId) {
  container.innerHTML = '<p class="estado">Cargando examen…</p>';

  let materia;
  let examen;
  try {
    [materia, examen] = await Promise.all([
      getMateria(materiaId),
      getExamen(materiaId, unidadId),
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

  if (!examen.existe) {
    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad}</h2>
      <p class="estado">Todavía no hay examen para esta unidad.</p>
    `;
    return;
  }

  const preguntas = examen.preguntas;
  const resultados = []; // { preguntaId, respuestaAlumno, respuestaModelo, autoevaluacion }
  let indice = 0;

  function dibujarPregunta() {
    const pregunta = preguntas[indice];
    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad}</h2>
      <p class="estado">Pregunta ${indice + 1} de ${preguntas.length}</p>
      <form class="examen-pregunta">
        <p class="pregunta__enunciado">${pregunta.enunciado}</p>
        <textarea class="respuesta-alumno" rows="5" placeholder="Escribí tu respuesta…"></textarea>
        <button type="submit" class="boton boton--activo">Ver respuesta modelo</button>
      </form>
    `;

    container.querySelector('.examen-pregunta').addEventListener('submit', async (evento) => {
      evento.preventDefault();
      const respuestaAlumno = container.querySelector('.respuesta-alumno').value;

      let evaluacion;
      try {
        evaluacion = await evaluarRespuesta(materiaId, unidadId, pregunta.id, respuestaAlumno);
      } catch (err) {
        container.innerHTML = `${breadcrumb}<p class="error">${err.message}</p>`;
        return;
      }

      dibujarAutoevaluacion(pregunta, respuestaAlumno, evaluacion.respuestaModelo);
    });
  }

  function dibujarAutoevaluacion(pregunta, respuestaAlumno, respuestaModelo) {
    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad}</h2>
      <p class="estado">Pregunta ${indice + 1} de ${preguntas.length}</p>
      <p class="pregunta__enunciado">${pregunta.enunciado}</p>
      <p class="examen-etiqueta">Tu respuesta:</p>
      <p class="examen-respuesta">${respuestaAlumno || '(sin responder)'}</p>
      <p class="examen-etiqueta">Respuesta modelo:</p>
      <p class="examen-respuesta">${respuestaModelo}</p>
      <p class="examen-etiqueta">¿Cómo te autoevaluás?</p>
      <div class="unidad__acciones autoevaluacion">
        ${NIVELES_AUTOEVALUACION.map(
          (nivel) => `<button type="button" class="boton boton--activo" data-nivel="${nivel}">${nivel}</button>`
        ).join('')}
      </div>
    `;

    container.querySelectorAll('[data-nivel]').forEach((boton) => {
      boton.addEventListener('click', () => {
        resultados.push({
          preguntaId: pregunta.id,
          respuestaAlumno,
          respuestaModelo,
          autoevaluacion: boton.dataset.nivel,
        });

        indice += 1;
        if (indice < preguntas.length) {
          dibujarPregunta();
        } else {
          dibujarResumen();
        }
      });
    });
  }

  function dibujarResumen() {
    const conteo = Object.fromEntries(NIVELES_AUTOEVALUACION.map((n) => [n, 0]));
    for (const resultado of resultados) {
      conteo[resultado.autoevaluacion] += 1;
    }

    container.innerHTML = `
      ${breadcrumb}
      <h2>${tituloUnidad} — Resultado</h2>
      <p class="resultado">
        Correctas: ${conteo.Correcta} · Parciales: ${conteo.Parcial} · Incorrectas: ${conteo.Incorrecta}
        (de ${preguntas.length})
      </p>
    `;
  }

  dibujarPregunta();
}
