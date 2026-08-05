# Unidad 1 — Estadística descriptiva

## ¿Qué es la estadística?

> "La estadística se ocupa de los métodos y procedimientos para recoger, clasificar, resumir, hallar regularidades y analizar los datos, siempre y cuando la variabilidad e incertidumbre sea una causa intrínseca de los mismos, así como de realizar inferencias a partir de ellos, con la finalidad de ayudar a la toma de decisiones y en su caso realizar predicciones."
> — *Elementos Básicos de Estadística Económica y Empresarial*, Montiel-Rius y Barón

Se clasifica en dos grandes ramas:

- **Estadística descriptiva**: describe, analiza y representa un grupo de datos usando métodos numéricos y gráficos.
- **Estadística inferencial**: a partir de datos muestrales y apoyándose en el cálculo de probabilidades, hace estimaciones, decisiones y generalizaciones sobre una población (es el tema de la Unidad 2 en adelante).

La estadística descriptiva se divide en dos áreas:

- Representar un conjunto de datos con técnicas visuales (gráficos).
- Calcular e interpretar medidas de resumen numéricas.

## Conceptos básicos

- **Individuo o elemento**: persona o cosa que contiene la información que se desea estudiar.
- **Población**: conjunto de todos los individuos que cumplen ciertas propiedades comunes. Puede ser finita o infinita.
- **Muestra**: subconjunto representativo de la población.
- **Parámetro**: función definida sobre los valores numéricos de una **población**.
- **Estadístico**: función definida sobre los valores numéricos de una **muestra**.

**Ejemplo 1.1** — Edad media de los estudiantes de la Unnoba:
- Individuo: un estudiante de la Unnoba.
- Población: todos los estudiantes de la Unnoba.
- Muestra: 10 alumnos de cada carrera.
- Parámetro: edad media de los estudiantes (de la población).
- Estadístico: edad media de los estudiantes de la muestra.

### Más definiciones

- **Caracteres**: propiedades o rasgos de los elementos. Pueden ser cualitativos o cuantitativos.
- **Modalidades**: las diferentes situaciones posibles de un carácter. Deben ser exhaustivas y mutuamente excluyentes.
- **Clases**: conjunto de una o más modalidades, donde cada modalidad pertenece a una y solo una clase.

## Variable estadística

Hace referencia a un carácter y toma cualquier modalidad de un conjunto (dominio o rango). Se denota con letras mayúsculas (X, Y, A, Z…). Según el tipo de dominio:

- **Cualitativas**: modalidades de tipo nominal.
- **Cuasicuantitativas**: nominales pero con orden posible entre ellas.
- **Cuantitativas**: valores numéricos con los que se puede operar aritméticamente.
  - **Discretas**: modalidades son valores enteros.
  - **Continuas**: modalidades son valores reales.

**Ejemplo 1.2** — Variable cualitativa E = "estado civil" en dos contingentes de jubilados (4 solteros, 5 casados, 7 viudos, 3 divorciados en el primero; 7, 9, 6, 5 respectivamente en el segundo). Se presenta en una tabla de frecuencias.

## Frecuencias

- **Frecuencia absoluta** de la clase xᵢ (nᵢ): número de observaciones de esa clase.
- **Frecuencia relativa** (fᵢ): fᵢ = nᵢ / N (N = total de observaciones).

Para variables cuantitativas o cuasicuantitativas, además:

- **Frecuencia absoluta acumulada** (Nᵢ): observaciones con modalidad ≤ xᵢ → Nᵢ = n₁ + n₂ + ... + nᵢ.
- **Frecuencia relativa acumulada** (Fᵢ): Fᵢ = Nᵢ / N.

**Ejemplo 1.3** — Se lanzan 3 monedas 8 veces y se cuenta el número de caras: 2,1,0,1,3,2,1,2. Se pide la distribución de frecuencias de X = "número de caras".

## Clases e intervalos

- Para variables **cualitativas o cuasicuantitativas**, las clases son las distintas modalidades (ver ejemplo 1.2).
- Para variables **cuantitativas discretas**, las clases pueden ser los valores que toma la variable (ejemplo 1.3), o agruparse en intervalos si son muchos valores distintos.
- Para variables **cuantitativas continuas**, las clases se definen siempre mediante intervalos.

**Notación de intervalos**: `[lᵢ₋₁ − lᵢ) = {x : lᵢ₋₁ ≤ x < lᵢ}`, donde lᵢ₋₁ es el límite inferior y lᵢ el límite superior del intervalo i.

- **Amplitud** del intervalo: aᵢ = lᵢ − lᵢ₋₁.
- **Marca de clase** (punto medio): xᵢ = (lᵢ + lᵢ₋₁) / 2.

**Elección del número de intervalos** — un criterio muy usado:

- Número de intervalos: k = √N (N = número de observaciones).
- Rango o recorrido: Re = x_máx − x_mín.
- Si los intervalos son de igual longitud, la amplitud es a = Re / k.

**Ejemplo 1.4** — Pesos registrados de 21 personas en una farmacia una mañana: 58, 51, 39, 49, 59, 58, 57, 59, 68, 54, 42, 54, 40, 63, 58, 66, 70, 72, 71, 69, 70. Se agrupan en la siguiente tabla:

| Intervalo | nᵢ | Nᵢ |
|---|---|---|
| 39 – 45,6 | 3 | 3 |
| 45,6 – 52,2 | 2 | 5 |
| 52,2 – 58,8 | 6 | 11 |
| 58,8 – 65,4 | 3 | 14 |
| 65,4 – 72 | 7 | 21 |

Este ejemplo se retoma más abajo para calcular media, mediana y moda.

## Gráficos y diagramas

- **Variables cualitativas**: gráfico de barras, gráfico de sectores, gráfico de Pareto (barras en orden descendente; usado en economía/empresa).
- **Variables cuantitativas discretas**: gráfico de barras.
- **Variables cuantitativas continuas**: histogramas, polígono de frecuencias.

### Histogramas

Se construyen a partir de una tabla estadística: sobre cada intervalo se dibuja un rectángulo cuya base es el intervalo y cuya altura es la frecuencia (relativa o absoluta) — si los intervalos tienen distinta longitud, la altura se calcula dividiendo la frecuencia por la amplitud (**frecuencia rectificada**).

### Polígono de frecuencias

Se construye uniendo con líneas rectas los puntos superiores de los rectángulos del histograma (en la marca de clase de cada intervalo). Para el primer y último intervalo se asume un intervalo adyacente de la misma longitud con frecuencia nula, de forma que la figura se cierra. El área del polígono es igual a la suma de las áreas de los rectángulos del histograma.

### Poligonal de frecuencias acumuladas (ojiva)

Línea poligonal que une los puntos cuya abscisa es el límite superior de cada intervalo y cuya ordenada es la frecuencia acumulada correspondiente.

### Diagrama de tallo y hoja (Tukey)

Forma compacta de resumir datos numéricos: cada número se divide en **tallo** (primeros dígitos) y **hoja** (dígitos finales). Por ejemplo, 213 puede separarse en tallo 2 / hoja 13, o tallo 21 / hoja 3. Se recomienda que el diagrama tenga entre 5 y 20 tallos — si la elección natural de los tallos genera muy pocos (y por lo tanto muchas hojas amontonadas), puede dividirse cada tallo en dos: hojas que empiezan con 0-4 ("low") y con 5-9 ("high"), listando cada tallo dos veces.

*(Ejemplos del PDF: número de páginas de 40 libros de misterio, con un valor atípico de 628 páginas; ingesta diaria de proteínas de 20 atletas.)*

## Medidas de tendencia central

### Media aritmética

- **Datos no agrupados**: x̄ = (x₁ + x₂ + ... + x_N) / N = (1/N)·Σxᵢ
- **Datos agrupados**: x̄ = (x₁n₁ + x₂n₂ + ... + xₖnₖ) / N = (1/N)·Σ(xᵢ·nᵢ), usando la marca de clase xᵢ de cada intervalo. Hay pérdida de precisión, mayor cuanto mayor es la longitud del intervalo.

**Ejemplo 1.4 (continuación)**: media sin agrupar x̄ = 58,43; media con los datos agrupados en la tabla de intervalos x̄ = 58,33.

**Observaciones sobre la media**:
- La suma de las desviaciones respecto de la media es cero: Σ(xᵢ − x̄) = 0.
- Es única y fácil de calcular, pero con datos agrupados la longitud de los intervalos influye en el resultado.
- Toma en cuenta todos los valores de la distribución, por lo que es muy sensible a valores extremos o anómalos.
- Puede no coincidir con ninguno de los valores posibles de la variable.

### Mediana (x̃)

Valor que divide a la muestra ordenada en dos partes iguales. Ventaja: no la afectan las observaciones extremas. Desventaja: tiene propiedades matemáticas complicadas que dificultan su uso en inferencia.

**Datos no agrupados** (valores ordenados de menor a mayor):
- N impar: la mediana es la observación en la posición (N+1)/2.
- N par: la mediana es el promedio de las observaciones en las posiciones N/2 y (N/2)+1.

**Datos agrupados**: se ubica el intervalo mediano (el que contiene la observación N/2), y:

```
x̃ = lᵢ₋₁ + ((N/2 − Nᵢ₋₁) / nᵢ) · aᵢ
```

donde [lᵢ₋₁, lᵢ) es el intervalo mediano, aᵢ su amplitud, nᵢ su frecuencia y Nᵢ₋₁ la frecuencia acumulada antes de ese intervalo.

**Ejemplo 1.4 (continuación)**: con los 21 valores ordenados, la mediana sin agrupar cae en el valor central (58). Con los datos agrupados: el intervalo mediano es 52,2–58,8 (Nᵢ₋₁=5, nᵢ=6, aᵢ=6,6), y x̃ = 52,2 + ((21/2 − 5)/6)·6,6 = 58,25. La diferencia con el valor sin agrupar es el **error de agrupamiento**: no es relevante cuando N es grande y el agrupamiento es adecuado.

### Moda

Valor más frecuente de la distribución. Puede no ser única.

- **Datos no agrupados**: el o los valores que más se repiten. En el ejemplo 1.4, Moda = 58 (se repite 3 veces).
- **Datos agrupados**: se ubica el intervalo modal (mayor frecuencia) y, si los intervalos son de igual longitud:

```
Moda = lᵢ₋₁ + ((nᵢ − nᵢ₋₁) / ((nᵢ − nᵢ₊₁) + (nᵢ − nᵢ₋₁))) · aᵢ
```

Si los intervalos son de distinta longitud, se usan las frecuencias rectificadas (n'ᵢ = nᵢ / aᵢ).

**Ejemplo 1.4 (continuación)**: el intervalo modal es 65,4–72 (nᵢ=7). Moda = 65,4 + ((7−3)/((7−0)+(7−3)))·6,6 = 67,8.

### Cuartiles, deciles y percentiles

Dividen los datos ordenados en 4, 10 y 100 partes iguales respectivamente. Para datos agrupados en intervalos de igual longitud:

```
Qₛ = lᵢ₋₁ + ((s·N/4 − Nᵢ₋₁) / nᵢ) · aᵢ      s = 1, 2, 3
Dₛ = lᵢ₋₁ + ((s·N/10 − Nᵢ₋₁) / nᵢ) · aᵢ     s = 1, ..., 9
Pₛ = lᵢ₋₁ + ((s·N/100 − Nᵢ₋₁) / nᵢ) · aᵢ    s = 1, ..., 99
```

Cuando s=2, la fórmula del cuartil coincide con la de la mediana.

*(El PDF propone el ejemplo 1.5 — calcular cuartiles, decil 8 y percentil 30 de una distribución dada en intervalos [0-1), [1-2), [2-3), [3-4), [4-5) con nᵢ = 10, 12, 12, 10, 7 — como ejercicio, sin resolverlo. Queda como práctica de aplicación de las fórmulas de arriba.)*

## Medidas de variabilidad o dispersión

Las medidas de tendencia central dan información parcial: distintas muestras pueden compartir media y mediana pero tener dispersión muy distinta en torno al centro.

- **Rango o recorrido**: Re = x_máx − x_mín. Fácil de calcular, pero solo usa dos observaciones y es sensible a valores extremos.
- **Cuarta dispersión**: fs = Q₃ − Q₁. Contiene el 50% central de los datos y no se ve alterada por valores extremos.
- **Varianza** (media de las diferencias cuadráticas respecto de la media):
  - Poblacional: σ² = (1/N)·Σ(xᵢ − x̄)² = (1/N)·Σxᵢ² − x̄²
  - **Muestral**: al aproximar la varianza poblacional a partir de una muestra, el error es menor dividiendo por N−1 en vez de N: s² = (1/(N−1))·Σ(xᵢ − x̄)². Con datos agrupados: s² = (1/(N−1))·Σ(xᵢ − x̄)²·nᵢ = (1/(N−1))·(Σxᵢ²·nᵢ − N·x̄²)
- **Desviación típica** (misma unidad que las observaciones, es la raíz cuadrada de la varianza):
  - Poblacional: σ = √σ²
  - Muestral: s = √s²
- **Coeficiente de variación**: la medida de dispersión más usada para comparar dos poblaciones. CV = s / x̄. Solo debe calcularse con variables de valores todos positivos. No es invariante ante cambios de origen, pero sí ante cambios de escala.

**Propiedades de la media y la varianza ante transformaciones lineales** (con a, b ∈ ℝ):

- Si Y = X + a, entonces V(Y) = V(X) y Ȳ = X̄ + a.
- Si Y = b·X, entonces V(Y) = b²·V(X) y Ȳ = b·X̄.

## Forma o simetría de la distribución

Una distribución de frecuencias es **simétrica** si el lado derecho a partir de la mediana es la imagen especular del izquierdo.

- **Asimétrica positiva**: las frecuencias más altas están a la izquierda de la mediana, con una cola de frecuencias más chicas a la derecha.
- **Asimétrica negativa**: la cola está del lado izquierdo.

**Índice de Yule-Bowley**: si la distribución es simétrica, Q₃ − Q₂ = Q₂ − Q₁. El signo de la diferencia entre ambas cantidades indica el signo de la asimetría. Para adimensionalizar, se divide por la cuarta dispersión:

```
As = ((Q₃ − Q₂) − (Q₂ − Q₁)) / (Q₃ − Q₁)     con  −1 < As < 1
```

As positivo → asimetría positiva; As negativo → asimetría negativa.

## Valores atípicos

Cualquier observación más allá de 1,5·fs del cuartil más cercano es un **valor atípico**:

- **Extremo**: más allá de 3·fs del cuartil más cercano.
- **Moderado**: entre 1,5·fs y 3·fs del cuartil más cercano.

## Formas de los histogramas

Se caracterizan por el número de "picos" o modos:

- **Unimodal**: un único pico (el más común).
- **Bimodal**: dos picos.
- **Multimodal**: más de dos picos.

Dentro de los unimodales:

- **Simétricos**.
- **Asimétricos**: si la cola superior es mucho más larga que la inferior, la distribución es asimétrica positiva; si la cola inferior es mucho mayor que la superior, es asimétrica negativa.
