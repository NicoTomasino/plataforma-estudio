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

### Lo que falta y SOLO lo puede hacer el usuario (cuentas y plata propias)

1. **Crear un repo en GitHub** (público o privado, cualquiera sirve para
   Render) y pushear este repo local ahí. Yo puedo preparar los commits,
   pero no puedo crear el repo remoto ni loguearme con tu cuenta de GitHub.
2. **Crear cuenta en Render** (render.com), conectarla a GitHub, y crear un
   "New Web Service" apuntando a este repo — con `render.yaml` presente,
   Render debería proponer la config automáticamente. Al terminar el
   deploy, la app queda en una URL tipo
   `https://plataforma-estudio-xxxx.onrender.com`.
3. **Crear cuenta de Google AdSense**, agregar el sitio (con la URL de
   Render) y esperar la revisión de Google (puede tardar de días a un par
   de semanas). Durante el alta, Google te da un ID de publisher
   (`ca-pub-XXXXXXXXXXXXXXXX`).
4. Con ese ID: completar `ADSENSE_CLIENT_ID` en `public/js/config.js` y
   descomentar la línea de `public/ads.txt` con el ID real. Pushear el
   cambio — Render redeploya solo. Recomendado: activar **Auto ads** desde
   el panel de AdSense (Google decide dónde poner los anuncios sin tener
   que armar `<ins>` a mano en cada vista).
5. Completar el email de contacto en `public/privacidad.html` (dejé un
   `TODO` a propósito en vez de poner tu email sin confirmarlo primero).
6. (Opcional, más adelante) Comprar un dominio propio y configurarlo en
   Render — no bloquea nada de lo anterior.

### Expectativa realista
Publicar + activar AdSense no genera ingresos el mismo día: hay que esperar
la aprobación de Google, y después los ingresos dependen del tráfico real
al sitio (visitas, no solo que exista). Con audiencia chica o nula, los
ingresos van a ser mínimos hasta que haya gente usando la plataforma.

## Roadmap de CLAUDE.md — pendiente
6. (Futuro) Segunda materia (Análisis Matemático, misma estructura de
   `/content`) + examinador conversacional real con la API de Anthropic
   (swap de `server/evaluadores/local.js` por una implementación que llame
   a Claude, respetando la firma de `evaluar()`). Sigue pendiente; se
   priorizó la publicación por pedido explícito del usuario.

## Próximo paso concreto
Que el usuario haga los pasos 1-3 de la sección de arriba (GitHub, Render,
AdSense) — son cuentas que solo él puede crear. Cuando estén listos, retomo
para el paso 4 (activar el ID de AdSense) en cuanto lo tenga, y de ahí en
más seguimos con el roadmap (segunda materia) o iterando sobre la
publicación, según lo que priorice.

## Cómo correr la app
```
npm install
npm start
```
Sirve en `http://localhost:3000`. Las 7 unidades de Estadística ya tienen
apuntes, práctica y examen con contenido real.
