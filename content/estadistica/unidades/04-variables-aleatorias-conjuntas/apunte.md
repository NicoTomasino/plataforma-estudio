# Unidad 4 — Análisis conjunto de variables aleatorias discretas

## Variables aleatorias con distribución conjunta

Muchas veces interesa más de una variable aleatoria del mismo espacio muestral (por ejemplo, peso y altura de una población, o ganancias y gastos de una empresa). Se estudia el caso de dos v.a., aunque puede generalizarse a más. Así como la fmp de una sola v.a. discreta indica cuánta probabilidad se asigna a cada valor posible, la **fmp conjunta** de dos v.a. discretas X e Y describe cuánta probabilidad se asigna a cada **par** de valores (x, y).

## Función de masa de probabilidad conjunta (v.a. discretas)

Para X e Y definidas en el mismo espacio muestral E:

```
p(x,y) = P(X=x, Y=y)
```

Para que sea una fmp conjunta válida:
- p(x,y) ≥ 0 para todo par (x,y).
- Σₓ Σᵧ p(x,y) = 1.

Suele presentarse en **tablas de doble entrada**: filas para los valores de X, columnas para los de Y, y en cada celda P(xᵢ, yⱼ).

**Ejemplo 4.1** — Se tira 3 veces una moneda equilibrada. X = número de caras (total), Y = número de caras en las dos primeras tiradas. La fmp conjunta se presenta en una tabla de doble entrada.
- a) Verificación: todos los valores de la tabla son ≥ 0, y su suma es 1/8+1/8+2/8+2/8+1/8+1/8 = 8/8 = 1.
- b) P(X=1, Y=2) = 0 (no puede haber 2 caras en las dos primeras tiradas y solo 1 en total).
- c) P(X=3, Y=2) = 1/8.

## Funciones de masa de probabilidad marginal

Conocida la fmp conjunta, se puede obtener la distribución de cada variable por separado sumando sobre los valores de la otra:

```
pₓ(x) = Σᵧ p(x,y)          pᵧ(y) = Σₓ p(x,y)
```

Se llaman "marginales" porque se obtienen en los márgenes de la tabla de doble entrada.

**Ejemplo 4.1.1 (continuación)** — Sumando filas y columnas de la tabla del ejemplo 4.1: pₓ(x) para x=0,1,2,3 es 1/8, 3/8, 3/8, 1/8; pᵧ(y) para y=0,1,2 es 1/4, 1/2, 1/4.

## Función de densidad de probabilidad conjunta (v.a. continuas)

Para X e Y continuas, f(x,y) es la fdp conjunta si para cualquier región bidimensional A:

```
P((X,Y) ∈ A) = ∬ₐ f(x,y) dx dy
```

siempre que f(x,y) ≥ 0 y ∬(todo el plano) f(x,y) dx dy = 1.

Las **densidades marginales**:

```
fₓ(x) = ∫(−∞,+∞) f(x,y) dy      fᵧ(y) = ∫(−∞,+∞) f(x,y) dx
```

**Ejemplo 4.2** — X = proporción del tiempo que la ventanilla para automovilistas de un banco está en uso, Y = proporción análoga para la ventanilla normal, con fdp conjunta f(x,y) = (6/5)(x+y²) en el cuadrado [0,1]×[0,1]. Se verifica que f(x,y)≥0 y que la integral doble sobre el cuadrado da 1 *(se puede resolver la integral con una herramienta como wolframalpha.com)*. Luego se calculan las densidades marginales fₓ(x) y fᵧ(y) integrando f(x,y) respecto de la otra variable.

## Independencia de variables aleatorias

**Discretas**: X e Y son independientes si para todo par (x,y): **p(x,y) = pₓ(x) · pᵧ(y)**. Si no se cumple para algún par, son dependientes.

**Ejemplo 4.1.1 (continuación)** — p(2,2) = 1/8, pero pₓ(2)·pᵧ(2) = (3/8)·(1/4) = 3/32 ≠ 1/8. Como no coinciden, X e Y son **dependientes**. *(Nota: si hubiera coincidido para ese par, habría que verificarlo para todos los pares posibles antes de concluir independencia.)*

**Continuas**: X e Y son independientes si **f(x,y) = fₓ(x) · fᵧ(y)** para todo (x,y). En el ejemplo 4.2, al comparar f(x,y) con el producto de las marginales, no coinciden: X e Y son dependientes.

## Distribuciones condicionales

**Discretas**: para x tal que pₓ(x)>0, la fmp condicional de Y dado X=x es:

```
p_{Y/X}(y/x) = p(x,y) / pₓ(x)
```

**Ejemplo 4.1.3** — p_{Y/X}(Y=2/X=2) = p(2,2)/pₓ(2) = (1/8)/(3/8) = 1/3: es la probabilidad de que en las dos primeras tiradas hayan salido 2 caras, dado que en total (en las 3 tiradas) salieron 2 caras.

**Continuas**: para x tal que fₓ(x)>0, la fdp condicional de Y dado X=x es:

```
f_{Y/X}(y/x) = f(x,y) / fₓ(x)
```

**Ejemplo 4.2.2** — Con X=0,8 fijo, se calcula primero f_{Y/X}(y/0,8) y luego se usa para calcular la probabilidad de que la ventanilla normal esté ocupada como mucho la mitad del tiempo dado que la ventanilla de auto lo está el 80%.

## Valor esperado de una función de dos v.a.

Igual que E(h(X)) = Σ h(x)·p(x) para una sola variable, para dos v.a. distribuidas conjuntamente:

```
E(h(X,Y)) = Σₓ Σᵧ h(x,y)·p(x,y)              (discretas)
E(h(X,Y)) = ∫∫(−∞,+∞) h(x,y)·f(x,y) dx dy    (continuas)
```

**Ejemplo 4.1.4** — E(X+Y) para el ejemplo 4.1, calculado sumando (x+y)·p(x,y) sobre toda la tabla, da 20/8. (Se puede verificar hallando la distribución de H=X+Y, con Rh={0,1,2,3,4,5}, y calculando E(H) directamente: da el mismo resultado, 20/8.)

**Ejemplo 4.2.3** — E(X+Y) para las v.a. continuas del ejemplo 4.2, integrando (x+y)·f(x,y) en el cuadrado [0,1]×[0,1], da 6/5.

### Propiedades del valor esperado

- Si E(X) y E(Y) existen, entonces existe E(X+Y) y: **E(X+Y) = E(X) + E(Y)** (siempre, sin necesidad de independencia).
- Si X e Y son **independientes** y E(X), E(Y) existen: **E(X·Y) = E(X) · E(Y)**.

## Covarianza

Cuando dos v.a. no son independientes, interesa medir cuán estrecha es su relación. De forma análoga a la varianza:

```
Cov(X,Y) = E[(X−μₓ)(Y−μᵧ)] = E(X·Y) − E(X)·E(Y)
```

donde μₓ=E(X), μᵧ=E(Y).

**Interpretación**:
- Cov(X,Y) > 0: dependencia directa (positiva) — a valores grandes de x corresponden valores grandes de y.
- Cov(X,Y) = 0: no hay relación **lineal** entre las variables (pero podrían estar relacionadas de otra forma, no lineal).
- Cov(X,Y) < 0: dependencia inversa (negativa) — a valores grandes de x corresponden valores pequeños de y.

**Propiedades de la covarianza** (X, Y v.a.; a, b ∈ ℝ):

- Cov(X, a) = 0 (con a constante)
- Cov(X, X) = Var(X)
- Cov(aX, bY) = a·b·Cov(X,Y)
- Cov(X+a, Y+b) = Cov(X,Y)
- Si X e Y son independientes: Cov(X,Y) = 0 (la recíproca no es cierta en general)
- Cov(X,Y) = E(X·Y) − E(X)·E(Y)

## Varianza de la suma y la resta de v.a.

```
V(X+Y) = V(X) + V(Y) + 2·Cov(X,Y)
V(X−Y) = V(X) + V(Y) − 2·Cov(X,Y)
```

Si X e Y son **independientes** (Cov(X,Y)=0):

```
V(X ± Y) = V(X) + V(Y)
```

## Correlación

Un "defecto" de la covarianza es que su valor depende de las unidades de medición. Para tener una medida de la fuerza de la relación que no dependa de las unidades, se define el **coeficiente de correlación de Pearson**:

```
corr(X,Y) = ρ(X,Y) = Cov(X,Y) / √(Var(X)·Var(Y))
```

**Propiedades de ρ(X,Y)**:
- −1 ≤ ρ(X,Y) ≤ 1.
- Si X e Y son independientes, ρ=0 — pero ρ=0 **no implica** independencia.
- ρ=1 o ρ=−1 si y solo si Y = aX+b para algunos a≠0, b (relación lineal exacta).
- ρ es una medida del grado de relación **lineal** entre X e Y: |ρ|=1 indica relación lineal perfecta; |ρ|<1 indica que la relación no es completamente lineal; ρ=0 indica que las variables no están correlacionadas (linealmente).

---

## Regresión lineal simple

La relación determinista más simple entre dos variables es la relación lineal: y = α + βx. El análisis de regresión desarrolla un modelo **probabilístico** lineal a partir de ella. El primer paso es graficar la **nube de puntos** (diagrama de dispersión) de los pares (x,y) observados: X es la variable regresora (independiente, elegida por el investigador) e Y es la v.a. dependiente que se quiere explicar/predecir.

**Ejemplo 4.3** — Relación entre hectáreas cosechadas de caña de azúcar (X) y producción total en toneladas (Y) en 14 departamentos. El diagrama de dispersión muestra una relación lineal fuerte y positiva: los puntos se ven cercanos a una recta de pendiente positiva.

### Modelo probabilístico lineal

Se asume que el valor esperado de Y es una función lineal de X, pero que para una x fija, Y difiere de su valor esperado por una cantidad aleatoria:

```
Y = α + β·x + ε        con ε ~ N(0, σ²)  ("error aleatorio")
```

Sin el término ε, todos los pares observados caerían exactamente sobre la recta de regresión "verdadera" (poblacional). El investigador nunca conoce α, β y σ² reales, solo n observaciones muestrales, a partir de las cuales debe **estimarlos**.

### Principio de los mínimos cuadrados

La recta tendrá "buen ajuste" si minimiza el error entre los valores estimados por la recta y los valores observados. El error (residuo) de cada observación es eᵢ = yᵢ − (A + Bxᵢ). Se busca minimizar la suma de los errores al cuadrado:

```
f(A,B) = Σᵢ (yᵢ − (A + Bxᵢ))²
```

Los valores A y B que minimizan f(A,B) son las estimaciones puntuales de α y β (se anotan α̂=A, β̂=B). La recta de regresión de mínimos cuadrados es: **ŷ = A + Bx**.

Igualando a cero las derivadas parciales de f respecto de A y B se obtienen las **ecuaciones normales**:

```
n·A + B·Σxᵢ = Σyᵢ
A·Σxᵢ + B·Σxᵢ² = Σ(xᵢ·yᵢ)
```

de donde se despejan A (ordenada al origen) y B (pendiente).

### Error estándar de la estimación

Se simboliza sₑ. Es, al igual que la desviación estándar, una medida de dispersión: mide la variabilidad de los valores observados alrededor de la recta de regresión ajustada.

### Coeficiente de determinación (r²)

Mide la bondad del ajuste, es decir, la proporción de la variabilidad total de Y (respecto de su media) que es explicada por el modelo de regresión:

```
r² = 1 − SSE/SST
```

donde SSE es la suma de los cuadrados del error (residuos) y SST es la suma de los cuadrados totales. Cuanto mayor es r² (habitualmente expresado en %), más exitoso es el modelo explicando la variación de y. En el caso de una regresión lineal simple entre dos variables, r² coincide numéricamente con el **coeficiente de correlación muestral al cuadrado**:

```
r² = [Cov(X,Y) / √(Var(X)·Var(Y))]² = r²ₓᵧ
```

**Ejemplo 4.3 (continuación, resuelto en planilla de cálculo)** — Con los datos de las 14 observaciones: B (pendiente) = 70,374, A (ordenada) = 12340,792, r = 0,9939, r² = 0,9879. La recta de regresión de mínimos cuadrados es **ŷ = 12340,792 + 70,374·x**.

- Como r² = 0,9879, el 98,79% de la variación observada de y es explicada por el modelo.
- La ordenada al origen (12340,792) no tiene una interpretación práctica razonable aquí (sería la producción esperada cosechando 0 hectáreas).
- La pendiente (70,374) se interpreta como: se espera que, en promedio, la producción aumente 70,374 toneladas por cada hectárea adicional cosechada.
