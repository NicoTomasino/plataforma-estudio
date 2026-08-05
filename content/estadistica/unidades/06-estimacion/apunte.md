# Unidad 6 — Estimación

## Tipos de estimación

Hay dos tipos de estimaciones sobre parámetros de una población:

- **Estimación puntual**: es un solo número que se usa para estimar un parámetro poblacional desconocido.
- **Estimación por intervalo**: es un rango de valores que se usa para estimar un parámetro poblacional desconocido.

## Estimadores puntuales

Cualquier estadístico de la muestra usado para estimar un parámetro poblacional se llama **estimador**. Se usa la letra griega θ como símbolo genérico del parámetro de interés. El objetivo de la estimación puntual es elegir, con base en los datos muestrales, un único número que represente un valor sensible de θ; ese estadístico se llama **estimador puntual** de θ. Se suele anotar μ̂ = x̄ (el "sombrero" indica que es un valor estimado).

*Ejemplos*: la media muestral x̄ como estimador de μ; la varianza muestral s² como estimador de σ²; la proporción muestral como estimador de la proporción poblacional.

## Propiedades de los estimadores

En general hay más de un estimador posible para un mismo parámetro. Para elegir el "mejor" se consideran estas propiedades:

### Insesgamiento

Un estimador puntual θ̂ es **insesgado** si E(θ̂) = θ para todo valor posible de θ. Si no, es **sesgado**, y el sesgo se define como Sesgo(θ̂) = E(θ̂) − θ.

**Ejemplo 6.1** — Si X~Bi(n,p), la proporción muestral p̂=X/n es un estimador insesgado de p: E(p̂) = E(X)/n = np/n = p.

**Ejemplo 6.2** — Con x₁,...,xₙ muestra aleatoria simple de una normal con media μ y varianza σ²:
1. La media muestral x̄ es un estimador insesgado de μ: E(X̄) = μ.
2. La varianza muestral s² = Σ(xᵢ−x̄)²/(n−1) es un estimador insesgado de σ²: E(S²) = σ².

**Ejemplo 6.3 (estimador sesgado)** — Si en lugar de dividir por (n−1) se dividiera por n (llamemos a ese estimador s̃²), resulta E(s̃²) = ((n−1)/n)·σ², un estimador **sesgado**. Sesgo(s̃²) = ((n−1)/n)·σ² − σ² = −σ²/n. Notar que el sesgo tiende a 0 cuando n→∞ — esta es la razón por la que se usa (n−1) en el denominador de la varianza muestral: corrige este sesgo.

### Eficiencia

Se refiere al tamaño de la **varianza** del estadístico. Entre dos estadísticos del mismo tamaño de muestra, es más eficiente el que tiene menor varianza. La eficiencia de un estimador insesgado es la razón entre la mínima varianza alcanzable y la varianza del estimador. Entre todos los estimadores insesgados, se prefiere el de menor varianza: se lo llama **estimador insesgado de varianza mínima** de θ.

### Consistencia

Un estadístico es un **estimador consistente** de θ si, al aumentar el tamaño de la muestra, el valor del estadístico θ̂ se aproxima cada vez más (con probabilidad que tiende a 1) al valor del parámetro poblacional:

```
lim(n→∞) P(|θ̂ − θ| > ε) = 0
```

Una condición suficiente (pero no necesaria) para la consistencia es que lim(n→∞) Sesgo(θ̂) = 0 **y** lim(n→∞) Var(θ̂) = 0. Un estimador consistente se vuelve más confiable con muestras más grandes. *(En el ejemplo 6.3, el estimador sesgado s̃² (con denominador n) también es consistente, pese a ser sesgado.)*

### Suficiencia

Un estimador es **suficiente** si utiliza toda la información acerca de θ contenida en la muestra. Formalmente: dada una muestra X₁,...,Xₙ de una distribución f(x;θ), T(X₁,...,Xₙ) (sin depender de θ) es un estadístico suficiente para θ si la distribución condicional de las Xᵢ dado el valor de T no depende de θ.

*Ejemplo*: en n intentos de Bernoulli con probabilidad de éxito p, si T=número de éxitos, entonces p̂=T/n agota toda la información disponible sobre p — conocer el orden específico de éxitos y fracasos no aporta información adicional sobre p.

## Error estándar de un estimador

El **error estándar** de un estimador θ̂ es su desviación estándar: σ_θ̂ = √V(θ̂). Cuando el error estándar depende de parámetros desconocidos que deben estimarse, al sustituir esas estimaciones se obtiene el **error estándar estimado**, denotado σ̂_θ̂ o s_θ̂.

**Ejemplo 6.4** — Para p̂=X/n (ejemplo 6.1): σ_p̂ = √(V(X)/n²) = √(p(1−p)/n). Como p es desconocido, se estima con σ̂_p̂ = √(p̂(1−p̂)/n).

## Métodos de estimación puntual

- **Método de momentos**: iguala características muestrales (como la media) a los valores esperados poblacionales correspondientes, y resuelve esas ecuaciones para obtener los estimadores.
- **Estimación de máxima verosimilitud**: recomendado por la mayoría de los estadísticos, especialmente con muestras grandes, porque sus estimadores tienen buenas propiedades de eficiencia. La idea es hallar el valor del parámetro para el cual la probabilidad de haber obtenido esa muestra es máxima.

---

## Estimación por intervalos

Una estimación puntual, al ser un solo número, no da información sobre su precisión ni confiabilidad. Una **estimación por intervalo** da un rango de valores donde es posible que esté el parámetro, junto con un **nivel de confianza** (grado de confiabilidad del intervalo). Cuanto más alto el nivel de confianza, más fuerte la creencia de que el parámetro está dentro del intervalo.

El **ancho del intervalo** da información sobre la precisión: con nivel de confianza alto y un intervalo angosto, la estimación es razonablemente precisa; un intervalo muy amplio transmite mucha incertidumbre.

### Interpretación del nivel de confianza

Decir que un evento tiene probabilidad 0,95 significa que, repitiendo el experimento muchas veces, el evento ocurrirá el 95% de las veces. Trasladado al intervalo de confianza: si se toman muchas muestras y se calcula el intervalo de confianza del 95% para μ en cada una, **el 95% de esos intervalos contendrá el verdadero valor de μ** (no es que "hay 95% de probabilidad de que μ esté en este intervalo particular" — μ es fijo, lo aleatorio es el intervalo).

## Intervalo de confianza para μ

### Caso 1 — Población normal, σ conocida

Si x₁,...,xₙ provienen de una muestra aleatoria de una distribución **normal** con media μ y desvío σ **conocido**, entonces X̄~N(μ, σ²/n). Estandarizando, Z=(X̄−μ)/(σ/√n)~N(0,1). Buscando a=−1,96 y b=1,96 en la tabla para que P(a<Z<b)=0,95, y despejando algebraicamente:

```
P(x̄ − 1,96·σ/√n < μ < x̄ + 1,96·σ/√n) = 0,95
```

Para un nivel de confianza general 100(1−α)%, con P(−z_(α/2) < Z < z_(α/2)) = 1−α, el intervalo de confianza para μ es:

```
(x̄ − z_(α/2)·σ/√n  ;  x̄ + z_(α/2)·σ/√n)
```

### Nivel de confianza, precisión y tamaño de muestra

El ancho del intervalo es w = l_sup − l_inf = 2·z_(α/2)·σ/√n. Para n fijo, mayor nivel de confianza implica mayor ancho. Para un nivel de confianza fijo, se puede "achicar" el intervalo aumentando n. Despejando n para lograr un ancho w determinado:

```
n = (2·z_(α/2)·σ / w)²
```

**Ejemplo 6.5** — Población con varianza conocida 185, muestra de n=64 con x̄=217.
- a) Error estándar: σ_x̄ = √(185/64) ≈ 1,7.
- b) IC que incluya μ el 68,26% del tiempo: z_(α/2)=1 (ya que 1−α=0,6826) → (217±1·1,7) = (215,3; 218,7).
- c) Ancho del intervalo anterior: w = 2·1·1,7 = 3,4.
- d) IC del 95%: z_(α/2)=1,96 → (217±1,96·1,7) = (213,668; 220,332), ancho w=6,664.
- e) Tamaño de muestra para lograr ancho 3,4 con 95% de confianza: n = (2·1,96·√185/3,4)² ≈ 245,91 → n=246.

### Caso 2 — Población no necesariamente normal, σ conocida, n grande

Si σ es conocida pero la población no es necesariamente normal, para n suficientemente grande el TLC garantiza X̄~N(μ, σ²/n) aproximadamente. El intervalo de confianza del Caso 1 sigue siendo válido (de forma aproximada).

### Caso 3 — σ desconocida, n grande

Si σ es desconocida y n es grande, se puede reemplazar σ por s (desvío estándar muestral): la variable Z=(X̄−μ)/(s/√n) tiene aproximadamente distribución normal estándar. Esto da un intervalo de confianza de muestra grande, válido sin importar la forma de la distribución poblacional:

```
(x̄ − z_(α/2)·s/√n  ;  x̄ + z_(α/2)·s/√n)
```

Regla empírica: **n > 40** es suficiente para esta aproximación.

### La distribución t (Student)

Cuando n es pequeño, no es razonable suponer que s se aproxime bien a σ. Para ese caso se usa la familia de distribuciones **t de Student**, con un único parámetro llamado grados de libertad (gl), denotado ν. **Notación**: t_(α,ν) es el valor sobre el eje que deja debajo de la curva t con ν grados de libertad un área α a la derecha.

### Caso 4 — Población normal, σ desconocida, n pequeño

Si las observaciones vienen de una población **normal** con σ desconocida y n es pequeño, entonces T=(X̄−μ)/(s/√n) tiene distribución t con n−1 grados de libertad. El intervalo de confianza del 100(1−α)% para μ es:

```
(x̄ − t_(α/2,n−1)·s/√n  ;  x̄ + t_(α/2,n−1)·s/√n)
```

**Ejemplo 6.6** — Consumo de carbón: muestra de n=10 semanas, x̄=11.400 toneladas, s=700 toneladas, distribución aproximadamente normal. Para 95% de confianza: t_(0,025;9) = 2,262. Intervalo: (11400 ± 2,262·700/√10) = (10899,28; 11900,71).

## Intervalo de confianza para una proporción

### Caso 5

Sea p la proporción de "éxitos" en una población; se toma una muestra de n individuos y X=número de éxitos. Si n es pequeño respecto de la población, X~Bi(n,p), con E(X)=np y V(X)=np(1−p). Si np≥10 y n(1−p)≥10, X tiene distribución aproximadamente normal.

Para n grande, el error al reemplazar p por p̂ en la varianza es despreciable. Estandarizando Z=(p̂−p)/√(p̂(1−p̂)/n) ~ N(0,1) aproximadamente, y despejando, se obtiene el intervalo de confianza del (1−α)·100% para p:

```
(p̂ − z_(α/2)·√(p̂(1−p̂)/n)  ;  p̂ + z_(α/2)·√(p̂(1−p̂)/n))
```

**Ejemplo 6.7** — De 150 ejecutivos entrevistados, 42% no puede sumar fracciones correctamente. Se puede estimar el error estándar de p̂ y construir un intervalo de confianza del 99% para la proporción verdadera con la fórmula anterior.

## Intervalos de confianza unilaterales

Cuando solo interesa un límite superior o inferior para el parámetro, se reemplaza z_(α/2) por z_α (o t_(α/2,n−1) por t_(α,n−1)) según corresponda.

**Ejemplo 6.8** — Muestra de 539 familias, 133 poseen al menos un arma de fuego: p̂=133/539≈0,247. Límite de confianza inferior del 95% para la proporción poblacional: p > p̂ − 1,64·√(p̂(1−p̂)/539) ≈ 0,216. Interpretación: se tiene 95% de confianza en que al menos el 21,6% de las familias posee un arma de fuego.

## Intervalo de confianza para la varianza de una población normal

### La distribución Ji-cuadrado (χ²)

Distribución de probabilidad continua con un parámetro ν (grados de libertad), ν=1,2,3,.... A medida que ν aumenta, la distribución se vuelve más simétrica.

Si la muestra proviene de una población **normal** con varianza σ², entonces (n−1)·S²/σ² ~ χ²_(n−1) (ver también Unidad 5). De ahí se obtiene un intervalo de confianza del (1−α)·100% para σ²:

```
( (n−1)·s² / χ²_(α/2, n−1)  ;  (n−1)·s² / χ²_(1−α/2, n−1) )
```

Para un intervalo de confianza para la desviación estándar σ, basta tomar la raíz cuadrada de los extremos del intervalo anterior. **Importante**: este intervalo solo es válido si la población de origen es normal (a diferencia de los intervalos para μ con muestra grande, que valen aproximadamente para cualquier distribución gracias al TLC).

**Ejemplo 6.9** — Tenacidad a la fractura de 22 observaciones: s=5,037. Para 99% de confianza con n−1=21 grados de libertad: χ²_(0,005;21)=41,40 y χ²_(0,995;21)=8,033. El intervalo para σ² es ((21·5,037²)/41,40 ; (21·5,037²)/8,033), y tomando raíz cuadrada a ambos extremos se obtiene el intervalo para la **desviación estándar** σ ≈ (3,63; 8,09). Este intervalo solo es válido porque se supone que la distribución de la población es normal.
