import express from 'express';
import path from 'node:path';
import { listarMaterias, obtenerMateria, obtenerApunte, obtenerQuiz, obtenerExamen } from './content.js';
import { evaluar } from './evaluadores/index.js';
import { limitarPorIp } from './rateLimit.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario en Render (y cualquier hosting detrás de proxy) para que
// req.ip refleje la IP real del cliente y no la del proxy interno.
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/vendor/marked', express.static(path.join(process.cwd(), 'node_modules/marked/lib')));

app.get('/api/materias', async (req, res) => {
  try {
    const materias = await listarMaterias();
    res.json(materias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudieron leer las materias.' });
  }
});

app.get('/api/materias/:id', async (req, res) => {
  try {
    const materia = await obtenerMateria(req.params.id);
    res.json(materia);
  } catch {
    res.status(404).json({ error: 'Materia no encontrada.' });
  }
});

app.get('/api/materias/:id/unidades/:unidadId/apunte', async (req, res) => {
  try {
    const markdown = await obtenerApunte(req.params.id, req.params.unidadId);
    if (markdown === null) {
      res.json({ existe: false });
    } else {
      res.json({ existe: true, markdown });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el apunte.' });
  }
});

app.get('/api/materias/:id/unidades/:unidadId/quiz', async (req, res) => {
  try {
    const quiz = await obtenerQuiz(req.params.id, req.params.unidadId);
    if (quiz === null) {
      res.json({ existe: false });
    } else {
      res.json({ existe: true, preguntas: quiz.preguntas });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer la práctica.' });
  }
});

app.get('/api/materias/:id/unidades/:unidadId/examen', async (req, res) => {
  try {
    const examen = await obtenerExamen(req.params.id, req.params.unidadId);
    if (examen === null) {
      res.json({ existe: false });
    } else {
      // No se manda respuestaModelo acá: recién se revela después de que el
      // alumno responde, para no arruinar el simulacro de examen.
      const preguntas = examen.preguntas.map(({ id, enunciado }) => ({ id, enunciado }));
      res.json({ existe: true, preguntas });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo leer el examen.' });
  }
});

const limiteEvaluar = limitarPorIp({ maxPorMinuto: 10 });

app.post('/api/materias/:id/unidades/:unidadId/examen/:preguntaId/evaluar', limiteEvaluar, async (req, res) => {
  try {
    const examen = await obtenerExamen(req.params.id, req.params.unidadId);
    const pregunta = examen?.preguntas.find((p) => p.id === req.params.preguntaId);
    if (!pregunta) {
      res.status(404).json({ error: 'Pregunta no encontrada.' });
      return;
    }

    const resultado = await evaluar({
      pregunta: pregunta.enunciado,
      respuestaAlumno: req.body.respuestaAlumno,
      respuestaModelo: pregunta.respuestaModelo,
    });
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo evaluar la respuesta.' });
  }
});

app.listen(PORT, () => {
  console.log(`Plataforma de estudio corriendo en http://localhost:${PORT}`);
});
