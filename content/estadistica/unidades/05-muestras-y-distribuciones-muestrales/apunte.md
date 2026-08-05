# Unidad 5 — Muestras y distribuciones muestrales

## Muestra aleatoria simple

Las v.a. X₁, X₂, ..., Xₙ forman una **muestra aleatoria simple** (o muestra aleatoria) de tamaño n si:

- Las Xᵢ son v.a. independientes.
- Todas las Xᵢ tienen la misma distribución de probabilidad.

Se anota que X₁,...,Xₙ son **iid** (independientes e idénticamente distribuidas). Si el muestreo es **con reemplazo**, o se toma de una población conceptualmente **infinita**, se cumplen estas condiciones.

Los principios del muestreo aleatorio simple son la base de la **inferencia estadística** (hacer inferencias sobre poblaciones a partir de la información de una muestra). Su extensión a otros métodos de muestreo es conceptualmente simple, aunque más elaborada matemáticamente.

## Estadísticos y sus distribuciones

Un **estadístico** es cualquier cantidad cuyo valor se calcula a partir de los datos de la muestra: es una característica de la **muestra** (mientras que un parámetro es una característica de la **población**). Antes de obtener los datos hay incertidumbre sobre qué valor tomará un estadístico, por lo que un estadístico **es una variable aleatoria** (se denota con mayúscula; su valor calculado/observado, con minúscula).

Son estadísticos, por ejemplo: la media muestral, la varianza muestral, la desviación estándar muestral. Como v.a., un estadístico tiene una distribución de probabilidad asociada, llamada **distribución de muestreo** — depende de la distribución de la población, del tamaño de la muestra y del método de muestreo.

Para obtener la distribución de muestreo de un estadístico se puede:
- Recurrir a las reglas de probabilidad, cuando el estadístico es una función "simple" de las Xᵢ.
- Llevar a cabo **experimentos de simulación**.

**Ejemplo 5.1** — Un jabón se vende en cajas de 25, 40 y 65 onzas, con probabilidades 0,2 / 0,5 / 0,3 (μₓ=44,5; σₓ²=212,25). Tomando X₁ y X₂ (dos compradores independientes), se construye la distribución de muestreo de X̄ (el promedio) y de S² (la varianza muestral) enumerando las 9 combinaciones posibles de (x₁,x₂). Resulta:
- E(X̄) = 44,5 = μₓ (el valor esperado del promedio coincide con la media poblacional).
- V(X̄) = 106,25 = σₓ²/2 (la varianza del promedio es la varianza poblacional dividida por n=2).
- E(S²) = 212,25 = σₓ² (el valor esperado de la varianza muestral coincide con la varianza poblacional).

Estas tres relaciones se generalizan más adelante en la unidad.

### Experimentos de simulación

Se usan cuando es difícil obtener la distribución de muestreo con reglas de probabilidad (normalmente con ayuda de una computadora). Se deben definir: el estadístico de interés, la distribución poblacional, el tamaño de muestra (n) y el número de repeticiones (k). Se simulan k muestras de tamaño n, se calcula el estadístico en cada una, y el histograma de esos k valores da la distribución de muestreo aproximada — cuanto mayor k, mejor la aproximación. *(El PDF muestra histogramas de simulaciones de X̄ para una población X~N(8,25; 0,75) con distintos tamaños de muestra n=5, 10, 20, 30 y k=500, donde se observa que la distribución de X̄ se va concentrando más cerca de la media a medida que aumenta n.)*

## Ley de los grandes números

Engloba varios teoremas sobre el comportamiento del promedio de una sucesión de v.a. a medida que aumenta su número, bajo condiciones que garantizan que ese promedio converge al promedio de las esperanzas involucradas.

**Ley fuerte de los grandes números (de Kolmogorov)**: si X₁,...,Xₙ tienen E(Xᵢ)=μᵢ y V(Xᵢ)=σᵢ² finitas, y Cov(Xᵢ,Xⱼ)=0 para i≠j, entonces el promedio (Σᵢ Xᵢ)/n converge (en casi todo punto) al promedio (Σᵢ μᵢ)/n — en particular, si todas las μᵢ=μ, entonces X̄ₙ converge a μ. Es decir: **cuanto más grande la muestra, más se acerca el promedio muestral al promedio poblacional** que se quiere estimar.

## Teorema Central del Límite (T.C.L.)

Si X₁,...,Xₙ son v.a. iid con E(X)=μ y V(X)=σ² finitas, entonces para n suficientemente grande:

```
(X̄ − μ) / (σ/√n)     tiene distribución aproximadamente N(0,1)
```

El tamaño de muestra necesario para una buena aproximación depende de la forma de la distribución de las Xᵢ (cuanto más simétrica y acampanada, más rápida la convergencia). **Regla empírica: n > 30** para aplicar el teorema.

Es, quizás, el teorema más importante de la inferencia estadística: asegura que la distribución de muestreo de la media se aproxima a la normal al aumentar n, **sin importar la forma de la distribución poblacional** de origen — esto permite usar estadísticas muestrales para inferir sobre parámetros poblacionales sin conocer completamente esa distribución.

### Suma de variables aleatorias

El TCL también aplica a la suma T = X₁+X₂+...+Xₙ (Xᵢ iid, E(X)=μ, V(X)=σ² finitas): para n grande,

```
(T − nμ) / (σ√n)     tiene distribución aproximadamente N(0,1)
```

**Ejemplo 5.2** — Una calculadora redondea cada número al entero más próximo; el error de cada redondeo es U(−0,5; 0,5) independiente (μₓ=0, σₓ=1/√12). Sumando 1500 números, T=Σxᵢ, y por TCL (T−0)/√(1500/12) ~ N(0,1). Se calcula P(|T|>15) ≈ 1 − [Φ(1,34) − Φ(−1,34)] ≈ 0,18.

## Aproximación normal a la distribución Binomial

Si X~Bi(n,p) cuenta el número de éxitos en n pruebas independientes, el TCL implica que para n grande, tanto la suma T=ΣXᵢ como el promedio T/n (con Xᵢ Bernoulli iid) tienen distribuciones aproximadamente normales. Se considera n suficientemente grande cuando **n·p ≥ 10 y n·(1−p) ≥ 10**.

- Para T: E(T)=n·p, V(T)=n·p(1−p), entonces T ≈ N(np, np(1−p)); estandarizando, (T−np)/√(np(1−p)) ≈ N(0,1).
- Para X̄=T/n: E(X̄)=p, V(X̄)=p(1−p)/n, entonces X̄ ≈ N(p, p(1−p)/n); estandarizando, (X̄−p)/√(p(1−p)/n) ≈ N(0,1).

### Corrección por continuidad

Al aproximar una distribución discreta (Binomial) con una continua (Normal), hace falta una **corrección por continuidad**, porque con una v.a. continua P(X=x)=0 exactamente, cosa que no ocurre en la discreta.

**Ejemplo 5.3** — X~Bi(100; 0,6): n·p=60≥10 y n·(1−p)=40≥10, entonces se aproxima con Normal de E(X)=60 y V(X)=24.
- a) P(X≤50): se aproxima como P(49,5 ≤ X ≤ 50,5) = Φ((50,5−60)/√24) − Φ((49,5−60)/√24) ≈ Φ(−1,94) − Φ(−2,14) ≈ 0,01014 (el valor exacto binomial es ≈ 0,010338 — la aproximación es muy cercana).
- b) P(60≤X≤80): se aproxima como F(80,5) − F(59,5) ≈ 0,5406 (valor exacto ≈ 0,5432).

En general, la corrección necesaria para P(a ≤ X ≤ b) es:

```
P(a ≤ X ≤ b) ≈ Φ((b+0,5−E(X))/√Var(X)) − Φ((a−0,5−E(X))/√Var(X))
```

## Distribución de la media y la suma muestral

**Proposición** — Sea X₁,...,Xₙ una muestra aleatoria iid de una distribución con media μ y varianza σ². Entonces:

1. E(X̄) = μ_x̄ = μ
2. V(X̄) = σ²_x̄ = σ²/n  ⟹  σ_x̄ = σ/√n

Y si T = X₁+X₂+...+Xₙ:

1. E(T) = n·μ
2. V(T) = n·σ²  ⟹  σ_T = √n · σ

**Ejemplo 5.4** — Una máquina llena botellas con media 125 g y desvío 20 g. Con una muestra de 20 botellas: E(X̄)=125 g, σ_x̄=20/√20≈4,47 g. Para el total de las 20 botellas: E(T)=20·125=2500 g, σ_T=√20·20≈89,44 g.

## Distribución de la varianza muestral

**Proposición** — Sea X₁,...,Xₙ una muestra aleatoria iid con media μ y varianza σ². Entonces:

1. E(S²) = σ² (el valor esperado de la varianza muestral es la varianza poblacional).
2. V(S²) → 0 cuando n → ∞.
3. Si la muestra proviene de una **población normal**, entonces (n−1)·S²/σ² tiene distribución **chi-cuadrado con n−1 grados de libertad** (χ²ₙ₋₁). Esto se usará más adelante para estimar la varianza poblacional.

## Distribución de X̄ si la población es normal

**Proposición** — Si X₁,...,Xₙ es una muestra aleatoria de una población **normal** con media μ y desvío σ, entonces para **cualquier n** (no hace falta n grande), X̄ tiene distribución normal:

```
X̄ ~ N(μ, σ²/n)
```

**Ejemplo 5.5** — Cuentas de ahorro ~N(2000, 600²). Con muestra de n=100: X̄~N(2000, 60²). P(1900≤X̄≤2050) = Φ(0,83) − Φ(−1,67) = 0,7967 − (1−0,9525) = 0,7492.

## Distribución de X̄ si la población NO es normal

Si la población no es normal, el **TCL** garantiza que para n suficientemente grande, X̄ tiene distribución **aproximadamente** normal con media μ y desvío σ/√n. Cuanto más grande n, mejor la aproximación (regla empírica: n>30).

**Ejemplo 5.6** — Saldo promedio de tarjeta de crédito: μ=$112, σ=$56. Con muestra de 50 cuentas, se puede aproximar la distribución de X̄ por Normal(112, 56²/50) para calcular P(X̄<100) o P(100<X̄<130).

## Caso de población finita

El TCL (y las proposiciones anteriores) valen para muestreo con reemplazo o de una población conceptualmente infinita. Cuando la población es **finita** de tamaño N, la desviación estándar de la media debe corregirse con el **factor de corrección para poblaciones finitas**:

```
σ_x̄ = (σ/√n) · √((N−n)/(N−1))
```

**Ejemplo 5.7** — Población de N=125 artículos, μ=105, σ=17; muestra de n=64.
- a) σ_x̄ = (17/√64)·√((125−64)/(125−1)) ≈ 1,4904.
- b) P(107,5 ≤ X̄ ≤ 109) = Φ(2,68) − Φ(1,68) ≈ 0,0428 (usando la σ_x̄ corregida).
- c) Si el muestreo fuera **con reemplazo** (no haría falta la corrección): σ_x̄ = 17/√64 = 2,125.
