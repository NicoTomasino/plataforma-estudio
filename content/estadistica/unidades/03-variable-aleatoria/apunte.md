# Unidad 3 — Variable aleatoria

## Definición y clasificación

Una **variable aleatoria (v.a.)** es cualquier regla que atribuye un único número real a cada suceso elemental del espacio muestral E. Matemáticamente es una función cuyo dominio es E y cuyo codominio son los números reales: X: E → ℝ, tal que X(e) = xₑ. Se denota con mayúsculas (X, Y, Z) y sus valores con minúsculas. El **rango Rₓ** es el conjunto de todos los valores posibles de X.

Misma clasificación que para variable estadística:

- **Discreta**: sus valores posibles forman un conjunto discreto (con separación entre cada valor y el siguiente); puede ser infinito, por ejemplo todos los enteros.
- **Continua**: puede tomar cualquier valor de un intervalo real (entre dos valores siempre hay otro intermedio posible).

---

# Parte 1: Variable aleatoria discreta

**Ejemplo 3.1** — Se lanzan 3 monedas; X = "cantidad de caras", Y = "caras menos secas". E tiene 8 resultados equiprobables. Rx = {0,1,2,3}, Ry = {−3,−1,1,3}.

## Distribución de probabilidad (función masa de probabilidad, fmp)

Para una v.a. discreta X: p(x) = P(X=x) = P({e ∈ E : X(e)=x}), función que a cada valor le asigna un número entre 0 y 1.

**Condiciones** para que sea una fmp válida (si x₁,...,xₖ son los valores posibles de X):
1. p(xᵢ) ≥ 0 para todo i.
2. Σᵢ p(xᵢ) = 1.

**Ejemplo 3.1 (continuación)** — fmp de X: p(0)=1/8, p(1)=3/8, p(2)=3/8, p(3)=1/8. fmp de Y: p(−3)=1/8, p(−1)=3/8, p(1)=3/8, p(3)=1/8.

## Función de distribución acumulada (fda)

Para todo número x: F(x) = P(X ≤ x) = P({e ∈ E : X(e) ≤ x}).

**Ejemplo 3.1 (continuación)** — F(x) = 0 si x<0; 1/8 si 0≤x<1; 4/8 si 1≤x<2; 7/8 si 2≤x<3; 1 si x≥3.

**Propiedades de la fda**:
- Es creciente: x₁ < x₂ ⟹ F(x₁) ≤ F(x₂).
- Es continua a derecha.
- lim(x→−∞) F(x) = 0 y lim(x→+∞) F(x) = 1.
- Si a<b: P(a < X ≤ b) = F(b) − F(a).

**Ejemplo 3.2** — X = días de ausencia de un empleado (0 a 14). Con F(0)=0,58; F(1)=0,72; F(2)=0,76; F(3)=0,81; F(4)=0,88; F(5)=0,94, se pueden calcular P(2≤X≤5), P(2<X≤5), P(X≤3), P(X>3) combinando estos valores con las propiedades de la fda (queda como ejercicio de aplicación).

## Valor esperado

Para X discreta con valores posibles D y fmp p(x): **E(X) = μₓ = Σ(x∈D) x·p(x)**. Es un promedio ponderado de los valores posibles, donde las ponderaciones son sus probabilidades. Puede no existir (si la suma no converge).

**Ejemplo 3.3** — Con la fmp del ejemplo 3.1: E(X) = 0·(1/8)+1·(3/8)+2·(3/8)+3·(1/8) = 9/8.

### Esperanza de una función de una v.a. discreta

Si X toma valores x₁,x₂,... y h(X) es una función de X, entonces: **E(h(X)) = Σ(x∈Rx) h(x)·p(x)**, si la suma existe.

**Ejemplo 3.4** — X = tamaño de bidón comprado (20, 30 o 50 litros) con p(x) = 0,1 / 0,5 / 0,4. El precio Y=h(X)=10X−40. E(Y) = (10·20−40)·0,1 + (10·30−40)·0,5 + (10·50−40)·0,4 = 330.

**Interpretación**: E(X) es el "centro de gravedad" (punto de equilibrio) de la fmp — una medida del centro de la distribución. Si se repite el experimento indefinidamente, el promedio de los resultados tiende a estabilizarse en E(X). El valor esperado puede no ser un valor que la variable pueda tomar realmente.

### Propiedades de la esperanza

Para h(X) = aX + b (a, b constantes reales): **E(aX+b) = a·E(X) + b**. De acá se deduce:
- E(aX) = a·E(X)
- E(b) = b (la esperanza de una constante es la misma constante)

## Varianza de una v.a. discreta

Mide la variabilidad de X alrededor de su esperanza μₓ:

```
V(X) = σₓ² = Σ(x∈Rx) (x − μₓ)² · p(x) = E[(X − μₓ)²]
```

Desvío estándar: σₓ = √V(X).

**Ejemplo 3.5** — Dos v.a. con la misma esperanza (=3) pero distinta forma: V(X) ≈ 0,6667 (σₓ≈0,8164) y V(Y) ≈ 1,8333 (σᵧ≈1,354) — mismo centro, distinta dispersión.

**Fórmula abreviada**: V(X) = E(X²) − [E(X)]².

**Propiedades de la varianza** (a, b constantes): 
- V(aX+b) = a²·V(X)
- σ(aX+b) = |a|·σₓ
- De aquí: V(aX) = a²·V(X), y V(b) = 0 (la varianza de una constante es cero).

## Parámetro de una fmp

**Ejemplo 3.6** — X = número de nacimientos observados hasta que nace un varón (B, con P(B)=p), nacimientos independientes. Se deduce la fórmula general: p(x) = (1−p)^(x−1)·p para x=1,2,3,..., y 0 en otro caso. La cantidad p es el **parámetro** de esta distribución: distintos valores de p dan distintas distribuciones, y esa colección se llama **familia de distribuciones de probabilidad**.

## Principales leyes de distribución de v.a. discretas

### Distribución Bernoulli — X ~ B(p)

Un experimento se realiza una vez; ocurre un suceso (éxito, probabilidad p) o no (fracaso, probabilidad 1−p). X toma valor 1 (éxito) o 0 (fracaso):

```
p(x) = p si x=1;  1−p si x=0;  0 en otro caso
```

E(X) = p, V(X) = p(1−p).

### Distribución Binomial — X ~ Bi(n, p)

Un **experimento Binomial** cumple: n pruebas fijas, idénticas, con solo dos resultados posibles (éxito/fracaso) cada una; las pruebas son independientes; la probabilidad de éxito p es constante en todas ellas. Es la suma de n v.a. de Bernoulli independientes.

*Ejemplos*: n lanzamientos de moneda (éxito=cara); muestra de 50 tubos fluorescentes (éxito=dura más de 400hs); 3 extracciones con reposición de una urna (éxito=bolilla roja).

Si X = número de éxitos en las n repeticiones, X ~ Bi(n,p):

```
p(k) = P(X=k) = C(n,k)·p^k·(1−p)^(n−k)     k = 0,1,...,n
```

- Rx = {0,1,...,n}
- **E(X) = n·p**
- **V(X) = n·p·(1−p)**

**Ejemplo 3.7** — Dado honesto tirado 5 veces, éxito="sale 4", X~Bi(5, 1/6). P(X=3) = C(5,3)·(1/6)³·(5/6)² = 125/3888 ≈ 0,0322. P(X≤2) = F(2) ≈ 0,965 (se usan tablas estadísticas para las probabilidades acumuladas).

### Variable aleatoria Geométrica — X ~ G(p)

Igual que la Binomial pero el experimento se repite hasta lograr el **primer éxito** (el número de repeticiones no es fijo). Rx = ℕ (1,2,3,...).

```
p(x) = p·(1−p)^(x−1)     x = 1,2,3,...
```

E(X) = 1/p ; V(X) = (1−p)/p².

**Ejemplo 3.8** — Se tira un dado hasta obtener el primer as: se puede calcular la probabilidad de que salga en la 7ª tirada, o de necesitar al menos 6 tiradas, y la esperanza/varianza de X con las fórmulas de arriba.

### Distribución de Poisson — X ~ P(λ)

fmp: p(x) = (e^(−λ)·λ^x) / x!  para x=0,1,2,... (con λ>0); 0 en otro caso.

E(X) = λ, V(X) = λ. λ representa la tasa de ocurrencia de un fenómeno por unidad de tiempo o área.

Se usa para sucesos con probabilidad baja de ocurrir, y es la distribución **límite** de una sucesión de binomiales cuando λ=n·p permanece fija y n→∞ (p→0). Regla empírica para aproximar Bi(n,p) por P(n·p): n>30, p≤0,01 y n·p≤20.

**Ejemplo 3.9** — X = árboles infectados por hectárea, X~P(5). P(X=2) = e^(−5)·5²/2! ≈ 0,084. P(X≤2) ≈ 0,125.

### El proceso de Poisson

Bajo ciertos supuestos, el número de eventos en un intervalo de longitud t sigue una distribución de Poisson de parámetro α·t (α = tasa del proceso):

```
p(x) = e^(−α·t)·(α·t)^x / x!    x = 0,1,2,...
```

**Ejemplo 3.10** — Llegan autos a una estación a tasa α=10/hora. P(llegan exactamente 7 en media hora): con λ=α·t=5, p(7)=e^(−5)·5⁷/7! ≈ 0,1044.

---

# Parte 2: Variable aleatoria continua

## Función de densidad de probabilidad (fdp)

Para X continua, la fdp fₓ verifica que para todo a≤b: **P(a≤X≤b) = ∫ₐᵇ fₓ(x) dx**.

*Ejemplos*: profundidad de un lago en puntos al azar, altura de un adulto, duración de una batería.

**Propiedades**: f(x) ≥ 0 para todo x; ∫(−∞,+∞) f(x) dx = 1.

Notar: f(xᵢ) NO es una probabilidad (puede ser mayor que 1), es solo el valor de la función en un punto. Además, **P(X=a) = 0** para cualquier a real (el área de un solo punto es nula). Geométricamente, P(X en [a,b]) es el área bajo la curva f(x) entre a y b.

**Ejemplo 3.11** — f(x) = a·x² si 1≤x≤3, 0 en otro caso.
- a) Para que sea función de densidad: ∫₁³ a·x² dx = 1 → a·(27−1)/3 = 1 → a = 3/26.
- b) P(X≥2) = ∫₂³ (3/26)x² dx = (27−8)/26 = 19/26.

## Función de distribución acumulada (fda)

Para X continua con fdp f(x): **F(x) = P(X≤x) = ∫(−∞,x) f(t) dt**.

**Ejemplo 3.11 (continuación)** — F(x) = 0 si x<1; (x³−1)/26 si 1≤x≤3; 1 si x>3.

**Propiedades de la fda** (v.a. continua):
- Fₓ(x) ∈ [0,1] para todo x.
- Es monótona creciente.
- Es continua en todo punto (a diferencia del caso discreto).
- lim(x→−∞) F(x) = 0, lim(x→+∞) F(x) = 1.

**Cómo usar la fda**: para a≤b, P(a≤X≤b) = P(a<X≤b) = P(a≤X<b) = P(a<X<b) = F(b) − F(a) (en el caso continuo da igual la inclusión de los extremos, porque P(X=a)=0). Además, P(X≥a) = 1 − F(a).

**Obtención de f(x) a partir de F(x)**: en todo punto donde F(x) es derivable, F'(x) = f(x).

## Percentiles de una distribución continua

El percentil 100p-ésimo (0<p<1) es el valor xₚ tal que F(xₚ) = P(X≤xₚ) = p: deja a su izquierda un área p y a su derecha 1−p.

**Ejemplo 3.12** — Percentil 25 del ejemplo 3.11: se busca x₀,₂₅ tal que (x₀,₂₅³−1)/26 = 0,25 → x₀,₂₅ = (0,25·26+1)^(1/3) ≈ 1,96.

## Esperanza de una v.a. continua

```
E(X) = μₓ = ∫(−∞,+∞) x·f(x) dx
```

(no existe si la integral diverge).

**Ejemplo 3.13** — Para el ejemplo 3.11: E(X) = ∫₁³ x·(3/26)x² dx = 30/13.

**Esperanza de una función**: E(h(X)) = ∫(−∞,+∞) h(x)·f(x) dx.

## Varianza de una v.a. continua

```
V(X) = σₓ² = ∫(−∞,+∞) (x−μₓ)²·f(x) dx = E[(X−μₓ)²]
```

Fórmula abreviada (igual que en el caso discreto): V(X) = E(X²) − [E(X)]².

**Propiedades de E(X) y V(X)** — son las mismas que para v.a. discretas: E(aX+b) = a·E(X)+b; V(aX+b) = a²·V(X); σ(aX+b) = |a|·σₓ.

## Principales leyes de distribución de v.a. continuas

### Distribución Uniforme — X ~ U(a,b)

```
f(x) = 1/(b−a)   si a≤x≤b;   0 en otro caso
```

fda: F(x) = 0 si x<a; (x−a)/(b−a) si a≤x≤b; 1 si x>b.

**E(X) = (a+b)/2**  ;  **V(X) = (b−a)²/12**

### Distribución Normal — X ~ N(μ, σ²)

La más importante de la probabilidad y la estadística: muchas poblaciones (alturas, pesos, errores de medición) se ajustan bien con una curva normal, y sumas/promedios de variables tienden a distribución normal bajo condiciones adecuadas.

```
f(x) = (1/(σ√(2π))) · e^(−(x−μ)²/(2σ²))     −∞ < x < +∞
```

E(X) = μ, V(X) = σ² — los parámetros son directamente la media y la varianza. Gráfico en forma de campana, simétrico respecto de x=μ, con puntos de inflexión en x=μ±σ.

#### Distribución Normal estándar — Z ~ N(0,1)

Caso particular con μ=0, σ²=1. Su fda se denota con la letra griega Φ (fi) en vez de F, y está tabulada:

```
f(z) = (1/√(2π))·e^(−z²/2)          Φ(z) = ∫(−∞,z) (1/√(2π))e^(−t²/2) dt
```

**Ejemplo 3.14** — a) P(0<Z<2,17) = Φ(2,17)−Φ(0) = 0,9850−0,5 = 0,4850. b) P(−1,5<Z<2) = Φ(2)−Φ(−1,5) = Φ(2)−[1−Φ(1,5)] = 0,9972−(1−0,9332) = 0,9104.

**Ejemplo 3.15** (proceso inverso: dado un área, hallar el valor de z) — a) Φ(c)=0,9838 → c=2,14. b) P(c<Z)=0,121 → P(Z≤c)=0,879=Φ(c) → c=1,17.

**Notación Zα**: es el valor en el eje z tal que el área bajo la curva a la **derecha** de Zα vale α.

#### Distribuciones normales no estándar (estandarización)

Para X~N(μ,σ²), se estandariza con **Z = (X−μ)/σ**, que resulta Z~N(0,1). Así:

```
P(a<X<b) = P((a−μ)/σ < Z < (b−μ)/σ) = Φ((b−μ)/σ) − Φ((a−μ)/σ)
```

**Ejemplo 3.16** — Tiempo para completar un entrenamiento, X~N(500, 100²).
- a) P(X>500) = 1−P(X<500) = 1−Φ(0) = 1−0,5 = 0,5.
- b) P(500<X<650) = Φ(1,5)−Φ(0) = 0,9332−0,5 = 0,4332.

### Distribución Exponencial — X ~ Exp(λ)

```
f(x,λ) = λ·e^(−λx)   si x≥0;   0 en otro caso     (λ>0)
```

**E(X) = 1/λ**  ;  **V(X) = 1/λ²**

fda: F(x) = 0 si x<0; 1−e^(−λx) si x≥0.

**Ejemplo 3.17** — Tiempo de respuesta de una terminal, E(X)=5 → X~Exp(1/5). a) P(X>10) = 1−F(10) = e^(−2) ≈ 0,135. b) P(5<X<10) = F(10)−F(5) = e^(−1)−e^(−2) ≈ 0,233.

### Relación entre Poisson y Exponencial

La exponencial modela el **tiempo entre dos eventos sucesivos** de un proceso (llamadas a un conmutador, llegada de clientes), por lo que está fuertemente relacionada con la Poisson. Si la ocurrencia de eventos sigue un proceso de Poisson de parámetro λ, el tiempo entre dos eventos sucesivos sigue una **Exponencial de parámetro λ**. (La Poisson cuenta el número de éxitos en un intervalo; la Exponencial, el tiempo entre éxitos sucesivos.)

**Ejemplo 3.18** — Llamadas a una línea de ayuda según Poisson con λ=0,5/hora. P(pasan 2 horas sin llamadas) = P(T>2) con T~Exp(0,5) = 1−(1−e^(−1)) = e^(−1) ≈ 0,368.

**Propiedad de "falta de memoria"**: si la vida útil de un componente es Exp(λ=0,6), la probabilidad de que dure 2 horas más *dado que* ya funcionó 3 horas es igual a la probabilidad de que dure más de 2 horas desde el inicio: P(T≥3+2 / T≥3) = P(T≥5)/P(T≥3) = e^(−0,6·2) ≈ 0,301 — el tiempo ya transcurrido "no importa", la distribución no tiene memoria de él.
