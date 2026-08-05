import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5';

const ESQUEMA_RESULTADO = {
  type: 'object',
  properties: {
    evaluacion: { type: 'string', enum: ['correcta', 'parcial', 'incorrecta'] },
    feedback: { type: 'string' },
  },
  required: ['evaluacion', 'feedback'],
  additionalProperties: false,
};

const client = new Anthropic();

// Corrección automática real vía Claude: compara la respuesta del alumno
// contra la respuesta modelo y devuelve un veredicto + feedback breve.
// Misma firma que evaluadores/local.js, para poder intercambiarlos sin
// tocar la ruta que los usa.
export async function evaluar({ pregunta, respuestaAlumno, respuestaModelo }) {
  const mensaje = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    system:
      'Sos un ayudante que corrige respuestas de examen de Estadística (nivel universitario). ' +
      'Comparás la respuesta del alumno con la respuesta modelo y evaluás si es correcta, parcial ' +
      'o incorrecta. El feedback debe ser breve (2-4 oraciones), en español, constructivo y explicar ' +
      'qué le faltó o qué estuvo mal si corresponde. No inventes criterios que no estén en la ' +
      'respuesta modelo.',
    output_config: { format: { type: 'json_schema', schema: ESQUEMA_RESULTADO } },
    messages: [
      {
        role: 'user',
        content:
          `Pregunta: ${pregunta}\n\n` +
          `Respuesta modelo: ${respuestaModelo}\n\n` +
          `Respuesta del alumno: ${respuestaAlumno || '(sin responder)'}`,
      },
    ],
  });

  const bloqueTexto = mensaje.content.find((bloque) => bloque.type === 'text');
  const resultado = JSON.parse(bloqueTexto.text);

  return {
    modo: 'automatica',
    correcta: resultado.evaluacion,
    feedback: resultado.feedback,
    respuestaModelo,
  };
}
