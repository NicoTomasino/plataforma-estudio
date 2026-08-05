# Plataforma de Estudio

## Qué estamos construyendo
Una app web para estudiar para la facultad. Arranca con **Estadística (UNNOBA)**,
pero está diseñada desde el principio para **expandirse a otras materias**
(el próximo objetivo es Análisis Matemático).

Cada materia ofrece tres modos:
1. **Apuntes** — resúmenes de la teoría, organizados por unidad.
2. **Práctica** — quizzes con corrección automática y explicación de cada respuesta.
3. **Examen** — un simulacro que "toma examen": hace preguntas, recibe la respuesta
   del alumno y la evalúa con feedback.

## Principio rector: EXTENSIBILIDAD
Agregar una materia nueva **no debe requerir tocar el código del núcleo**.
- Una materia = una carpeta de contenido autocontenida.
- La app descubre qué materias hay leyendo la estructura de `/content`, no con
  listas hardcodeadas.
- El contenido (apuntes, preguntas) va en archivos de datos editables a mano
  (Markdown y JSON), **separado** de la lógica de la app.

Antes de escribir código nuevo, preguntá: "¿esto sigue funcionando cuando haya
5 materias en vez de 1?".

## Estructura de contenido (fuente de verdad)
```
/content
  /estadistica
    materia.json          # nombre, descripción, orden de unidades
    /unidades
      /01-introduccion
        apunte.md         # resumen de la teoría
        quiz.json         # preguntas de práctica
        examen.json       # preguntas para el simulacro
      /02-...
  /analisis-matematico    # a futuro: MISMA estructura, otra carpeta
```

## Material de origen
Los PDFs de la cátedra están en `/material-fuente/`.
- Son la **fuente de verdad**. Los apuntes, quizzes y preguntas de examen se
  generan a partir de ese material.
- **No inventes** contenido que el material no respalde. Si algo no está claro
  en los PDFs, marcalo con un `TODO:` en el archivo y avisá, no lo completes de fantasía.

## Stack
- Frontend simple, sin build pesado, fácil de correr localmente (elegí vos la
  mejor opción y justificá brevemente; preferencia por algo que arranque con un
  comando).
- Contenido en Markdown + JSON, editable a mano sin recompilar.
- **Modo Examen**: empezá con un simulador basado en banco de preguntas +
  autoevaluación (comparación con respuesta modelo). Dejá preparada una capa/
  interfaz para conectar más adelante la API de Anthropic (examinador conversacional
  real), pero **no bloquees el MVP** con eso.

## Cómo trabajar en este proyecto (importante)
- Avanzá en pasos chicos y verificables. Después de cada bloque, dejá la app en
  estado funcional (que se pueda correr).
- Mantené un archivo `PROGRESO.md` en la raíz: qué está hecho, qué falta, y cuál
  es el próximo paso concreto. **Actualizalo al final de cada sesión.** Esto es lo
  que permite retomar limpio al día siguiente.
- Commits chicos y descriptivos si hay git.
- No refactorices el núcleo para meter contenido nuevo; si sentís que hace falta,
  es señal de que la arquitectura no es lo bastante extensible: pará y planteámelo.

## Roadmap (orden sugerido)
1. Esqueleto de la app + carga dinámica de materias desde `/content`.
2. Modo Apuntes leyendo los `apunte.md`.
3. Modo Práctica con `quiz.json` y corrección.
4. Modo Examen (simulador con banco).
5. Poblar el contenido de Estadística unidad por unidad desde los PDFs.
6. (Futuro) Segunda materia + examinador con API.
