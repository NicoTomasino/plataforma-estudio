import fs from 'node:fs/promises';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function leerMateriaJson(carpeta) {
  const materiaPath = path.join(CONTENT_DIR, carpeta, 'materia.json');
  const raw = await fs.readFile(materiaPath, 'utf-8');
  return JSON.parse(raw);
}

export async function listarMaterias() {
  const entradas = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  const materias = [];

  for (const entrada of entradas) {
    if (!entrada.isDirectory()) continue;
    try {
      const materia = await leerMateriaJson(entrada.name);
      materias.push({ id: entrada.name, ...materia });
    } catch {
      // Carpeta sin materia.json válido: no es una materia, se ignora.
    }
  }

  return materias;
}

export async function obtenerMateria(id) {
  const materia = await leerMateriaJson(id);
  return { id, ...materia };
}

async function leerArchivoUnidad(materiaId, unidadId, nombreArchivo) {
  const archivoPath = path.join(CONTENT_DIR, materiaId, 'unidades', unidadId, nombreArchivo);
  try {
    return await fs.readFile(archivoPath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

export async function obtenerApunte(materiaId, unidadId) {
  return leerArchivoUnidad(materiaId, unidadId, 'apunte.md');
}

export async function obtenerQuiz(materiaId, unidadId) {
  const raw = await leerArchivoUnidad(materiaId, unidadId, 'quiz.json');
  return raw === null ? null : JSON.parse(raw);
}

export async function obtenerExamen(materiaId, unidadId) {
  const raw = await leerArchivoUnidad(materiaId, unidadId, 'examen.json');
  return raw === null ? null : JSON.parse(raw);
}
