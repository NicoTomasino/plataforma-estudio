# Unidad 2 — Estadística inferencial: probabilidad

## Introducción

Hasta la Unidad 1 solo se estudiaron, describieron y analizaron resultados de un experimento o datos ya obtenidos. Cuando se pretende usar esa información para extraer conclusiones generales o predecir resultados que ayuden a la toma de decisiones, la **teoría de la probabilidad** es la herramienta fundamental: suministra las reglas para el estudio de los experimentos aleatorios o de azar, y es la base de la estadística inferencial.

## Tipos de experimentos

- **Deterministas**: se puede predecir el resultado antes de realizarlos.
- **Aleatorios**: no se puede predecir el resultado (depende del azar), pero se conoce el conjunto de resultados posibles.

Un experimento es **aleatorio** si se verifica que: se puede repetir indefinidamente en las mismas condiciones, no se puede predecir el resultado, y el resultado obtenido pertenece a un conjunto de resultados posibles conocido de antemano.

## Definiciones básicas

- **Espacio muestral (E)**: conjunto de todos los posibles resultados de una experiencia aleatoria.
- **Suceso elemental**: cada uno de los elementos que forman parte de E.
- **Suceso compuesto**: cualquier subconjunto de E con más de un resultado.
- **Suceso seguro (S)**: está formado por todos los resultados posibles (el espacio muestral).
- **Suceso imposible (∅)**: no tiene ningún elemento.
- **Sucesos compatibles**: A y B son compatibles cuando tienen algún suceso elemental en común.
- **Sucesos incompatibles**: A y B son incompatibles cuando no tienen ningún elemento en común.
- **Suceso contrario o complementario** de A (se denota A′ o Ā): se realiza cuando no se realiza A.

*(Los sucesos también se llaman "eventos" en algunos textos.)*

La teoría de probabilidades se ocupa de asignar un número a cada resultado posible de un experimento aleatorio, para cuantificarlos y saber si un suceso es más probable que otro.

## Probabilidad: definición clásica (Regla de Laplace)

Si un experimento aleatorio tiene un número finito de resultados posibles, todos equiprobables, la probabilidad de que ocurra un suceso A es:

```
P(A) = (número de casos favorables en A) / (número de casos posibles)
```

### Axiomas de la probabilidad

1. Para cualquier suceso A: 0 ≤ P(A) ≤ 1.
2. La probabilidad del suceso seguro es 1: P(E) = 1.
3. Si A y B son incompatibles (A ∩ B = ∅), entonces P(A ∪ B) = P(A) + P(B).

### Propiedades de la probabilidad

- La suma de las probabilidades de un suceso y su contrario vale 1: P(Ā) = 1 − P(A).
- La probabilidad del suceso imposible es cero: P(∅) = 0.
- Probabilidad de la unión de dos sucesos: P(A∪B) = P(A) + P(B) − P(A∩B).

## Técnicas de conteo

- **Regla del producto**: para una colección ordenada de k elementos donde hay n₁ opciones para el primero, n₂ para el segundo, ..., nₖ para el k-ésimo, hay n₁·n₂·...·nₖ posibilidades. *(Ejemplo 2.1: 5 pantalones, 6 remeras, 3 pares de zapatos → 5·6·3 = 90 formas de vestirse.)*
- **Permutaciones** (Pₙ): secuencias ordenadas de los n elementos de un conjunto. Pₙ = n!. *(Ejemplo 2.2: repartir 5 regalos distintos a 5 personas distintas → 5! = 120 formas.)*
- **Variaciones** (Vₙᵏ): secuencias ordenadas de k elementos tomados de un conjunto de n. Vₙᵏ = n! / (n−k)!. *(Ejemplo 2.3: repartir 3 regalos distintos entre 5 niños → V₅³ = 5!/(5−3)! = 5·4·3 = 60.)*
- **Combinaciones** (Cₙᵏ): subconjuntos no ordenados de tamaño k de un conjunto de n. Cₙᵏ = n! / (k!·(n−k)!). *(Ejemplo 2.4: repartir 3 regalos iguales entre 5 niños → C₅³ = 5!/(3!·2!) = 10.)*
- **Permutaciones con repetición** (PRₙ^(a,b,c,...)): cuando entre los n elementos hay repetidos (uno aparece a veces, otro b veces, etc., con a+b+c+...=n). PRₙ^(a,b,c,...) = n! / (a!·b!·c!·...). *(Ejemplo 2.5: anagramas de "ESTADÍSTICAS" → 12!/(3!·2!·2!·2!) = 9.979.200.)*
- **Variaciones con repetición** (VRₙᵏ): agrupaciones de k elementos tomados de un conjunto de n, permitiendo repetición. VRₙᵏ = nᵏ. *(Ejemplo 2.6: 10 tipos de bandera, señales de 4 banderas → VR₁₀⁴ = 10⁴ = 10.000.)*
- **Combinaciones con repetición** (CRₙᵏ): grupos de k elementos de un conjunto de n (n≥k) donde no importa el orden, no entran todos los elementos y pueden repetirse. CRₙᵏ = (n+k−1)! / (k!·(n−1)!). *(Ejemplo 2.7: elegir 4 botellas entre 5 tipos → CR₅⁴ = 8!/(4!·4!) = 70.)*

## Probabilidad condicional

**Ejemplo 2.8** — Se lanza un dado normal:
- a) P(sale 4) = 1/6 (espacio muestral {1,2,3,4,5,6}, equiprobables).
- b) Sabiendo que salió un número par, P(sale 4) = 1/3 (el espacio muestral se reduce a {2,4,6}).

Este segundo caso es una **probabilidad condicional**.

**Definición**: para dos eventos A y B con P(B) > 0, la probabilidad condicional de A dado que ocurrió B es:

```
P(A/B) = P(A∩B) / P(B)
```

**Ejemplo 2.9** — El 60% de los compradores de una cámara digital lleva tarjeta de memoria opcional (A), el 40% lleva batería extra (B), el 30% lleva ambas cosas. Dado que compró batería extra, P(A/B) = P(A∩B)/P(B) = 0,3/0,4 = 0,75.

### Regla de la multiplicación

De la definición de probabilidad condicional se obtiene:

```
P(A∩B) = P(A/B) · P(B)      (equivalentemente, P(A∩B) = P(B/A) · P(A))
```

Es útil porque normalmente se busca P(A∩B), mientras que P(A/B) y P(B) suelen obtenerse directamente de la descripción del problema.

**Ejemplo 2.10** — De 4 donantes, solo uno tiene sangre 0+. Se tipifican al azar hasta encontrarlo. P(hay que tipificar al menos a 3) = P(A₁ ∩ A₂) [los dos primeros no son el buscado] = P(Ā₁) · P(Ā₂/Ā₁) = (3/4)·(2/3) = 1/2.

### Diagramas de árbol

Útiles cuando el experimento consiste en una secuencia de varias etapas. Se dibuja una rama por cada posibilidad, con su probabilidad; el final de cada rama es un nudo del que parten nuevas ramas (salvo que sea un final del experimento). La suma de las probabilidades de las ramas de un mismo nudo debe dar 1.

**Ejemplo 2.11** — Clase de 6 niñas y 10 niños, se elige un comité de 3 al azar: P(3 niños) = 3/14, P(2 niños y 1 niña) = 27/56, P(3 niñas) = 1/28.

### Ley de la probabilidad total

Si A₁, A₂, ..., Aₖ son eventos mutuamente excluyentes y exhaustivos, entonces para cualquier evento B:

```
P(B) = P(B/A₁)·P(A₁) + P(B/A₂)·P(A₂) + ... + P(B/Aₖ)·P(Aₖ) = Σᵢ P(B/Aᵢ)·P(Aᵢ)
```

**Ejemplo 2.12** — Tres cajas con bombillas: caja 1 tiene 10 bombillas (4 fundidas), caja 2 tiene 6 (1 fundida), caja 3 tiene 8 (3 fundidas). Al elegir una caja al azar y luego una bombilla al azar, P(fundida) = (4/10)(1/3) + (1/6)(1/3) + (3/8)(1/3) = 113/360.

### Teorema de Bayes

Permite calcular probabilidades condicionales "inversas" (probabilidades posteriores a partir de la ocurrencia de un suceso). Es una aplicación de la regla de la multiplicación y la ley de la probabilidad total. Si A₁, ..., Aₖ son mutuamente excluyentes y exhaustivos, y P(B) > 0:

```
P(Aⱼ/B) = P(B/Aⱼ)·P(Aⱼ) / Σᵢ P(B/Aᵢ)·P(Aᵢ)      j = 1, ..., k
```

**Ejemplo 2.13** — 20% de los empleados son ingenieros (I), 20% economistas (E), el resto (O) ni una cosa ni otra. El 75% de los ingenieros, el 50% de los economistas y el 20% de los "otros" tienen puesto directivo (D). Dado un directivo al azar, P(I/D) = (0,75·0,2) / (0,75·0,2 + 0,5·0,2 + 0,2·0,6) = 15/37 ≈ 0,405.

**Ejemplo 2.14** — P(incidente) = 0,1; P(suena alarma / incidente) = 0,97; P(suena alarma / no incidente) = 0,02. Dado que sonó la alarma, P(no incidente / alarma) = (0,02·0,9) / (0,02·0,9 + 0,97·0,1) = 18/115 ≈ 0,156.

## Independencia

La probabilidad condicional permite comparar la probabilidad asignada a A antes y después de saber que ocurrió B (ver ejemplo 2.8). Cuando P(A) no cambia al saber que ocurrió B, los sucesos son **independientes**.

**Definición**: A y B son independientes si P(A/B) = P(A) (si no, son dependientes). De ahí se deduce que A y B son independientes si y solo si:

```
P(A∩B) = P(A) · P(B)
```

Esto se generaliza: A₁, ..., Aₙ son **mutuamente independientes** si para todo k=2,...,n y todo subconjunto de índices i₁,...,iₖ:

```
P(A_i1 ∩ A_i2 ∩ ... ∩ A_ik) = P(A_i1) · P(A_i2) · ... · P(A_ik)
```

**Ejemplo 2.15** — Se lanzan dos dados (rojo y verde) de forma independiente. A = "el rojo muestra 3", B = "el verde muestra 4", C = "la suma de ambos es 7". P(A)=P(B)=1/6, P(C)=6/36=1/6.
- P(A∩B) = P(A)·P(B) = 1/36 → A y B son independientes.
- P(A∩C) = P(A)·P(C) = 1/36 → A y C son independientes.
- P(B∩C) = P(B)·P(C) = 1/36 → B y C son independientes.
- Son independientes **por pares**. Pero como "rojo=3 y verde=4" implica automáticamente que la suma es 7, se tiene P(A∩B∩C) = P(A∩B) = 1/36, mientras que P(A)·P(B)·P(C) = 1/216. Como 1/36 ≠ 1/216, **A, B y C no son mutuamente independientes** — la independencia por pares no garantiza la independencia conjunta de los tres.
