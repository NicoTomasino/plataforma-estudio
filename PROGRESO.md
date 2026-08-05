# Progreso

## Hecho
- **Arquitectura y stack acordados**: Node.js + Express (mínimo) sirviendo un
  frontend vanilla (sin build) desde `/public`. El backend lee `/content` en
  cada request — no hay paso de compilación ni manifest generado, así que
  agregar contenido nuevo a mano no requiere recompilar nada.
- **Paso 1 — esqueleto + carga dinámica de materias**:
  - `server/index.js`: Express sirve `/public` como estático y expone
    `GET /api/materias` y `GET /api/materias/:id`.
  - `server/content.js`: `listarMaterias()` / `obtenerMateria(id)` leen
    `/content/*/materia.json` dinámicamente (sin listas hardcodeadas).
  - `content/estadistica/materia.json`: nombre, descripción y las 7 unidades
    (id + título), derivadas de los PDFs reales en `/material-fuente`.
  - `public/`: `index.html`, `css/styles.css`, `js/app.js` (router por hash),
    `js/api.js`, `js/views/materias.js` (home) y `js/views/materia.js`
    (detalle con lista de unidades).
- **Paso 2 — Modo Apuntes**: `obtenerApunte()` + `GET .../apunte` +
  `public/js/views/apunte.js` (render con `marked`, servido localmente sin
  CDN vía `/vendor/marked`). Muestra "todavía no hay apunte" si falta el
  archivo.
- **Paso 3 — Modo Práctica**: esquema `quiz.json` (opción múltiple: id,
  enunciado, opciones[], respuestaCorrecta, explicacion) + `GET .../quiz` +
  `public/js/views/practica.js`, con `corregir(preguntas, respuestas)` como
  función pura y testeada, corrección inmediata con explicación y puntaje.
- **Paso 4 — Modo Examen**: esquema `examen.json` (preguntas abiertas: id,
  enunciado, respuestaModelo) + `GET .../examen` (sin `respuestaModelo`,
  para no arruinar el simulacro) + `POST .../examen/:preguntaId/evaluar`
  (revela la respuesta modelo) + `public/js/views/examen.js` (flujo
  secuencial con autoevaluación Correcta/Parcial/Incorrecta y resumen
  final). La corrección vive detrás de `server/evaluadores/local.js`
  (`evaluar({ pregunta, respuestaAlumno, respuestaModelo })`), la interfaz
  que deja preparado el swap futuro por un evaluador real con la API de
  Anthropic sin tocar la ruta que la usa.
  - Con el paso 4, **los 4 modos de la app están construidos** (botones
    Apuntes/Práctica/Examen habilitados en la vista de materia).
- **Paso 5 — Poblar Estadística con contenido real (las 7 unidades)**:
  se generaron `apunte.md`, `quiz.json` (10 preguntas c/u) y `examen.json`
  (5 preguntas c/u) para las 7 unidades, fieles a los PDFs de
  `/material-fuente` (sin inventar contenido):
  - `01-estadistica-descriptiva` — de `Teóricos Unidad 1.pdf`.
  - `02-probabilidad` — de `Teórico Unidad 2.pdf`.
  - `03-variable-aleatoria` — de `Teóricos Unidad 3-Primera parte.pdf` +
    `Teóricos Unidad 3-Segunda parte.pdf` (discretas y continuas).
  - `04-variables-aleatorias-conjuntas` — de
    `Teóricos Unidad 4 para ingenieros.pdf` (incluye regresión lineal
    simple).
  - `05-muestras-y-distribuciones-muestrales` — de `Teóricos Unidad 5.pdf`.
  - `06-estimacion` — de `Teóricos Unidad 6.pdf`; el `examen.json` reutiliza
    ejercicios reales de `Repaso Unidad 6.pdf`.
  - `07-test-de-hipotesis` — de `Teóricos Unidad 7cuarentena.pdf` (incluye
    inferencia sobre la pendiente de regresión, que conecta con la Unidad 4).
  - Verificado end-to-end con el servidor corriendo: las 21 combinaciones
    (7 unidades × apunte/quiz/examen) devuelven `existe:true` con el
    contenido esperado; se confirmó además que el Markdown de al menos una
    unidad renderiza correctamente a HTML (headers, tablas) con `marked`.

## Decisión de alcance ya resuelta
La población de contenido real que en las notas anteriores de este archivo
se dejaba pendiente para "el paso 5" **ya está hecha** para las 7 unidades
de Estadística. Ya no hace falta el aviso de "todavía no hay apunte/
práctica/examen" salvo que se borre algún archivo a propósito.

## Publicación y monetización (en curso)

Decisiones tomadas con el usuario: **hosting en Render** (free tier),
**subdominio gratuito** de Render por ahora (sin dominio propio todavía), y
**Google AdSense** como red de anuncios.

Lo que ya quedó preparado en el repo:
- **Git**: repo inicializado. `material-fuente/` (los PDFs de la cátedra)
  queda **excluido** del repo a propósito — no lo sirve la app, y si el
  repo de GitHub es público no correspondería redistribuir el material del
  profesor. Los `apunte.md` sí se versionan: son resúmenes escritos a partir
  de ese material, no copias textuales, pero siguen siendo contenido
  derivado de la cátedra — queda a criterio del usuario si eso le genera
  dudas antes de publicar.
- `render.yaml`: define el servicio web (`env: node`, `npm install` /
  `npm start`, plan free, Node 20). Render lo detecta solo al conectar el
  repo (Blueprint).
- `package.json`: agregado `engines.node >= 18.18.0`.
- **Scaffold de AdSense, apagado por defecto**:
  - `public/js/config.js`: `ADSENSE_CLIENT_ID = null`. Mientras sea `null`,
    no se carga ningún script de anuncios pase lo que pase.
  - `public/js/ads.js`: `cargarAdSense()` inserta el script de AdSense solo
    si hay `ADSENSE_CLIENT_ID` **y** el usuario dio consentimiento de
    cookies.
  - `public/ads.txt`: template comentado, listo para descomentar con el
    publisher ID real (lo exige AdSense para verificar el sitio).
- **Privacidad y cookies** (requisito de las políticas de AdSense):
  - `public/privacidad.html`: página con disclosure de uso de cookies de
    Google Ads y cómo inhabilitarlas. Tiene un `TODO: completar email de
    contacto` pendiente.
  - `public/js/cookie-banner.js`: banner fijo abajo de la pantalla que pide
    aceptar cookies antes de cargar cualquier script de ads; guarda el
    consentimiento en `localStorage`. Enlazado desde `app.js`.
  - Link "Privacidad" agregado al footer de `index.html`.
- Verificado localmente: la app sigue funcionando igual que antes (API y
  las 3 vistas de contenido intactas), `/ads.txt` y `/privacidad.html`
  responden 200, y los módulos JS nuevos pasan chequeo de sintaxis.

### Hecho por el usuario (cuentas propias)
1. ✅ **Repo en GitHub**: [github.com/NicoTomasino/plataforma-estudio](https://github.com/NicoTomasino/plataforma-estudio),
   pusheado a `main`.
2. ✅ **Render**: servicio web creado y desplegado. URL en producción:
   **https://plataforma-estudio-fuov.onrender.com** — verificada
   funcionando end-to-end (home, API, contenido real de Estadística,
   `/privacidad.html`, `/ads.txt`, todo responde 200).

### Lo que falta y SOLO lo puede hacer el usuario (cuentas y plata propias)
3. **Crear cuenta de Google AdSense**, agregar el sitio con la URL de Render
   de arriba, y esperar la revisión de Google (puede tardar de días a un
   par de semanas). Durante el alta, Google da un ID de publisher
   (`ca-pub-XXXXXXXXXXXXXXXX`).
4. Con ese ID: completar `ADSENSE_CLIENT_ID` en `public/js/config.js` y
   descomentar la línea de `public/ads.txt` con el ID real. Pushear el
   cambio — Render redeploya solo. Recomendado: activar **Auto ads** desde
   el panel de AdSense.
5. Completar el email de contacto en `public/privacidad.html` (quedó un
   `TODO` a propósito).
6. (Opcional) Comprar un dominio propio y configurarlo en Render.
7. **Para el examinador con IA** (ver sección siguiente): crear una cuenta
   en [console.anthropic.com](https://console.anthropic.com), generar una
   API key, y configurarla como variable de entorno — tanto local (archivo
   `.env`, ya excluido por `.gitignore`) como en Render (Dashboard →
   Environment).

### Expectativa realista
Publicar + activar AdSense no genera ingresos el mismo día: hay que esperar
la aprobación de Google, y después los ingresos dependen del tráfico real
al sitio (visitas, no solo que exista). Con audiencia chica o nula, los
ingresos van a ser mínimos hasta que haya gente usando la plataforma.

## Examinador conversacional con la API de Anthropic (paso 6, parcial)

Se implementó la mitad de código del paso 6 del roadmap (la otra mitad,
segunda materia, sigue bloqueada — ver abajo). El modo Examen ahora puede
corregir con IA real en vez de autoevaluación, manteniendo compatibilidad
con el modo local.

- **Modelo elegido: Claude Haiku 4.5** — decisión tomada con el usuario:
  es una tarea simple (comparar una respuesta corta contra una respuesta
  modelo), y como la app todavía no genera ingresos, se prioriza el costo
  más bajo (u$s1/u$s5 por millón de tokens) sobre la calidad máxima.
- `server/evaluadores/anthropic.js` (nuevo): `evaluar({ pregunta,
  respuestaAlumno, respuestaModelo })` llama a Claude con **structured
  outputs** (`output_config.format` con `json_schema`) para forzar una
  respuesta `{ evaluacion: 'correcta'|'parcial'|'incorrecta', feedback }`
  parseable de forma confiable. Devuelve `{ modo: 'automatica', correcta,
  feedback, respuestaModelo }`.
- `server/evaluadores/index.js` (nuevo, dispatcher): usa
  `evaluadores/anthropic.js` solo si `EVALUADOR=anthropic` **y**
  `ANTHROPIC_API_KEY` están seteadas; si no, cae a `evaluadores/local.js`
  (autoevaluación) con un aviso por consola — el modo Examen nunca se
  rompe por falta de configuración.
- `server/rateLimit.js` (nuevo): limitador simple por IP (10 req/minuto)
  aplicado **solo** a la ruta `POST .../examen/:preguntaId/evaluar` — es la
  única que cuesta dinero real (llama a la API de Anthropic), así que es la
  que hay que proteger de abuso una vez que el sitio sea público. Probado:
  el request #11 en un minuto da `429`.
- `server/index.js`: agregado `app.set('trust proxy', 1)` — necesario en
  Render (detrás de un proxy) para que el rate limit identifique la IP real
  de cada visitante y no la del proxy interno.
- `public/js/views/examen.js`: ahora distingue `evaluacion.modo`. Si es
  `'automatica'`, muestra el veredicto de Claude (Correcta/Parcial/
  Incorrecta) + su feedback y un botón "Siguiente"; si es
  `'autoevaluacion'` (el caso de hoy, sin key configurada), sigue con el
  flujo anterior de autoevaluación manual. El resumen final cuenta ambos
  casos de la misma forma.
- **Verificado sin key real** (no tengo ni debo tener la key del usuario):
  servidor arranca igual con y sin `EVALUADOR=anthropic`; con la variable
  puesta pero sin key, avisa por consola y cae a local; el endpoint
  `evaluar` sigue funcionando (`{"modo":"autoevaluacion",...}`); rate limit
  probado con 11 requests seguidos. **Falta probar el camino real con
  Claude** — eso requiere que el usuario ponga su propia
  `ANTHROPIC_API_KEY`.
- **Sin commitear todavía**: estos cambios están en el working directory
  pero no se hizo `git commit`/`push` — a diferencia del primer commit
  grande, esta vez conviene confirmar con el usuario antes de pushear (un
  push dispara un redeploy real en Render).

## Roadmap de CLAUDE.md — pendiente
6. (Resto) Segunda materia (Análisis Matemático) — **bloqueada**: no hay
   PDFs de esa cátedra en `/material-fuente` todavía. Por la regla de
   `CLAUDE.md` de no inventar contenido, hace falta que el usuario consiga
   y agregue ese material fuente antes de poder generar `content/analisis-matematico/`.

## Decisión del usuario: por ahora, modo gratis
El usuario prefiere dejar el examinador en modo local (autoevaluación,
gratis) por ahora. **No** hace falta que setee `ANTHROPIC_API_KEY` en
Render todavía — el sitio en producción ya funciona 100% gratis tal cual
está.

## Idea a futuro: freemium para la corrección con IA
El usuario quiere evaluar más adelante un modelo freemium: gratis con
autoevaluación (como hoy), y una **suscripción mensual** (~5 USD/mes, precio
a definir) que habilite corrección instantánea con IA "sin límite" (uso
razonable) durante ese mes — no es pago por respuesta suelta. Todavía
**no se empezó a construir** — falta bastante más que código:
- Elegir procesador de pagos (Stripe es la opción estándar; soporta
  suscripciones recurrentes de forma nativa, encaja bien con este modelo).
- Sistema de cuentas de usuario (hoy la app no tiene login/registro —
  necesario para saber quién pagó y habilitarle el modo IA).
- Armar el flujo de checkout + webhook de Stripe para activar/desactivar
  el acceso según el estado de la suscripción.
- Legales mínimos: términos de servicio, política de cancelación/reembolso.

## Bug crítico resuelto: pantalla en blanco por bloqueadores de anuncios
Después de publicar, el usuario reportó que la web le aparecía en blanco
(probó con Brave, que trae Shields activado por defecto). Diagnóstico:
`app.js` importaba de forma estática `cookie-banner.js`, que a su vez
importaba `ads.js` — y **cualquier bloqueador de anuncios (Brave Shields,
uBlock, AdBlock) bloquea por defecto cualquier archivo llamado `ads.js`**,
solo por el nombre, sin mirar el contenido. Al fallar esa importación
estática, todo el módulo `app.js` fallaba en cascada y no se ejecutaba
nada — ni siquiera el router de la app, que no tiene nada que ver con
anuncios.

**Arreglado**: se eliminaron `public/js/ads.js` y `public/js/cookie-banner.js`;
esa lógica (chiquita) ahora vive inline dentro de `app.js`, envuelta en
`try/catch`, así un bloqueo nunca puede tumbar el resto de la app. Probado
localmente (sintaxis OK, `/js/ads.js` y `/js/cookie-banner.js` dan 404 como
se espera, la app carga bien). **Falta pushear para que el fix llegue a
producción** — es el paso más urgente ahora mismo, la web en producción
sigue rota para usuarios con bloqueador hasta que se suba.

## Próximo paso concreto
1. **Urgente**: pushear a GitHub (`git push origin main`) para que Render
   redeploye con el fix de la pantalla en blanco. El push anterior falló
   por falta de credenciales en la sesión — el usuario tiene que correrlo
   él mismo con `!git push origin main`, o reautenticar la sesión.
2. Cuando el usuario decida avanzar con el modelo freemium: retomar la
   sección de arriba (elegir Stripe, definir precio y flujo).
3. En paralelo: usuario decide si sigue con AdSense (pasos 3-5 de arriba) o
   consigue los PDFs de Análisis Matemático para poder avanzar la segunda
   materia.

## Cómo correr la app
```
npm install
npm start
```
Sirve en `http://localhost:3000`. Las 7 unidades de Estadística ya tienen
apuntes, práctica y examen con contenido real.

Para probar la corrección de examen con IA real (opcional — sin esto usa
autoevaluación local):
```
ANTHROPIC_API_KEY=sk-ant-... EVALUADOR=anthropic npm start
```
