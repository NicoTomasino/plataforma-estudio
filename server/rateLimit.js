const VENTANA_MS = 60 * 1000;

// Limitador simple en memoria (alcanza para una única instancia como el
// plan free de Render). Protege la ruta de evaluar examen, que es la única
// que cuesta dinero real (llama a la API de Anthropic) — sin esto, cualquiera
// podría hacer spam del endpoint una vez que el sitio sea público.
export function limitarPorIp({ maxPorMinuto }) {
  const solicitudesPorIp = new Map();

  return function limitador(req, res, next) {
    const ip = req.ip;
    const ahora = Date.now();
    const solicitudes = (solicitudesPorIp.get(ip) ?? []).filter(
      (marca) => ahora - marca < VENTANA_MS
    );

    if (solicitudes.length >= maxPorMinuto) {
      res.status(429).json({ error: 'Demasiadas solicitudes. Esperá un minuto e intentá de nuevo.' });
      return;
    }

    solicitudes.push(ahora);
    solicitudesPorIp.set(ip, solicitudes);
    next();
  };
}
