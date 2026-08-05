import { evaluar as evaluarLocal } from './local.js';
import { evaluar as evaluarAnthropic } from './anthropic.js';

// EVALUADOR=anthropic + ANTHROPIC_API_KEY habilitan la corrección real con
// Claude. Sin alguna de las dos cosas, se usa el modo local de
// autoevaluación (el alumno se autoevalúa comparando con la respuesta
// modelo) — así el modo Examen sigue funcionando aunque no se haya
// configurado la API key.
const usarAnthropic = process.env.EVALUADOR === 'anthropic' && Boolean(process.env.ANTHROPIC_API_KEY);

if (process.env.EVALUADOR === 'anthropic' && !process.env.ANTHROPIC_API_KEY) {
  console.warn(
    'EVALUADOR=anthropic pero falta ANTHROPIC_API_KEY: usando el evaluador local (autoevaluación).'
  );
}

export const evaluar = usarAnthropic ? evaluarAnthropic : evaluarLocal;
