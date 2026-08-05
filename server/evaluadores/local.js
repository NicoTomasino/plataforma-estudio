// Firma pensada para poder reemplazar esta implementación por un evaluador
// que llame a la API de Anthropic sin tocar la ruta que lo usa: en vez de
// corregir automáticamente, devuelve la respuesta modelo para que el propio
// alumno se autoevalúe comparándola con lo que escribió.
export async function evaluar({ pregunta, respuestaAlumno, respuestaModelo }) {
  return { modo: 'autoevaluacion', respuestaModelo };
}
