export async function getMaterias() {
  const res = await fetch('/api/materias');
  if (!res.ok) throw new Error('No se pudieron cargar las materias.');
  return res.json();
}

export async function getMateria(id) {
  const res = await fetch(`/api/materias/${id}`);
  if (!res.ok) throw new Error('No se pudo cargar la materia.');
  return res.json();
}

export async function getApunte(materiaId, unidadId) {
  const res = await fetch(`/api/materias/${materiaId}/unidades/${unidadId}/apunte`);
  if (!res.ok) throw new Error('No se pudo cargar el apunte.');
  return res.json();
}

export async function getQuiz(materiaId, unidadId) {
  const res = await fetch(`/api/materias/${materiaId}/unidades/${unidadId}/quiz`);
  if (!res.ok) throw new Error('No se pudo cargar la práctica.');
  return res.json();
}

export async function getExamen(materiaId, unidadId) {
  const res = await fetch(`/api/materias/${materiaId}/unidades/${unidadId}/examen`);
  if (!res.ok) throw new Error('No se pudo cargar el examen.');
  return res.json();
}

export async function evaluarRespuesta(materiaId, unidadId, preguntaId, respuestaAlumno) {
  const res = await fetch(
    `/api/materias/${materiaId}/unidades/${unidadId}/examen/${preguntaId}/evaluar`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ respuestaAlumno }),
    }
  );
  if (!res.ok) throw new Error('No se pudo evaluar la respuesta.');
  return res.json();
}
