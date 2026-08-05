# Unidad 7 — Test de hipótesis

## Introducción

Muchas veces el objetivo de una investigación no es estimar un parámetro sino decidir cuál de dos pretensiones contradictorias sobre él es la correcta. Esa parte de la inferencia estadística se llama **prueba (test) de hipótesis**. En todo problema de este tipo se consideran dos hipótesis contradictorias — por ejemplo, μ=0,75 vs. μ≠0,75, o p=0,10 vs. p>0,10 — y el objetivo es decidir, con base en la muestra, cuál es la correcta.

El problema se formula de modo que una de las pretensiones sea **inicialmente favorecida**: esa pretensión no se rechaza a favor de la alternativa a menos que la evidencia muestral la contradiga fuertemente.

## Definiciones

- **Hipótesis nula (H₀)**: la pretensión que inicialmente se supone cierta (la "creencia previa").
- **Hipótesis alternativa (H₁)**: la aseveración contradictoria de H₀.

H₀ se rechaza a favor de H₁ solo si la evidencia muestral sugiere que H₀ es falsa. Las dos conclusiones posibles de un test son: **rechazar** o **no rechazar** H₀ (nunca se "acepta" H₀ como verdadera con certeza).

Se plantean tres casos posibles de test, con H₀: θ=θ₀ y:

1. H₁: θ ≠ θ₀ (test bilateral, de dos colas)
2. H₁: θ > θ₀ (test de cola superior)
3. H₁: θ < θ₀ (test de cola inferior)

## Procedimiento de prueba

Se debe especificar:
1. Un **estadístico de prueba**: función de los datos muestrales en la que se basa la decisión.
2. Una **región de rechazo**: conjunto de valores del estadístico de prueba para los cuales se rechaza H₀.

H₀ se rechaza si y solo si el valor observado del estadístico de prueba cae dentro de la región de rechazo.

**Ejemplo 7.1** — Una tabacalera afirma que el contenido de nicotina de sus cigarrillos marca B es, cuanto mucho, 1,5 mg. Como sería imprudente rechazar esa afirmación sin fuerte evidencia en contra, se plantea: H₀: μ=1,5, H₁: μ>1,5. Con una muestra de 32 cigarrillos y x̄ el promedio muestral: si H₀ es verdadera, E(X̄)=1,5; si es falsa, se espera x̄>1,5. La elección de qué tan por encima de 1,5 debe estar x̄ para rechazar H₀ (por ejemplo, x̄≥1,55 ó x̄≥1,6) es arbitraria y depende de los errores que se estén dispuestos a asumir.

## Errores en el test de hipótesis

- **Error de tipo I**: rechazar H₀ cuando es verdadera. Su probabilidad se denota **α**: P(rechazar H₀ | H₀ verdadera) = P(eI) = α.
- **Error de tipo II**: no rechazar H₀ cuando es falsa. Su probabilidad se denota **β**: P(no rechazar H₀ | H₀ falsa) = P(eII) = β.

Como H₀ especifica un único valor del parámetro, hay un solo valor de α. Pero como H₁ admite muchos valores posibles del parámetro, hay un valor **distinto de β para cada valor** compatible con H₁.

**Ejemplo 7.1 (continuación)** — Si el contenido de nicotina es normal con σ=0,20, entonces X̄~N(μ, σ²/32), con σ_x̄=0,20/√32≈0,0354. Estandarizando bajo H₀: Z=(X̄−1,5)/0,0354 ~ N(0,1). La región de rechazo es z≥c. Fijando α=0,05: c=z₀,₀₅=1,645, lo que equivale a rechazar H₀ si x̄>1,558. Entonces β=P(X̄<1,558 | H₀ es falsa), que toma un valor distinto para cada posible μ≠1,5.

## Relación entre α, β y el tamaño de muestra

Para un experimento y tamaño de muestra fijos, reducir el tamaño de la región de rechazo (para lograr un α menor) aumenta β. Como en H₀ siempre se plantea la hipótesis que se supone cierta a priori, **es más grave cometer error de tipo I** (rechazarla siendo verdadera) que error de tipo II (no rechazarla siendo falsa).

El enfoque habitual es **fijar de antemano el valor máximo tolerable de α** (llamado **nivel de significación** de la prueba) y elegir la región de rechazo con exactamente ese α, minimizando β sujeto a esa restricción. Niveles tradicionales: 0,10; 0,05 y 0,01 — cuanto más grave sea el error de tipo I en el problema concreto, menor debe ser el nivel de significación elegido. Si, fijado α, el valor resultante de β es demasiado grande, puede reducirse **aumentando el tamaño de la muestra** (cuando sea posible).

## Pruebas sobre la media de una población

### Caso 1 — Población normal, σ conocida

X̄ ~ N(μ₀, σ²/n) bajo H₀. Estadístico de prueba: z = (x̄−μ₀)/(σ/√n).

| H₁ | Región de rechazo (nivel α) |
|---|---|
| μ > μ₀ | z ≥ z_α (cola superior) |
| μ < μ₀ | z ≤ −z_α (cola inferior) |
| μ ≠ μ₀ | z ≥ z_(α/2) o z ≤ −z_(α/2) (dos colas) |

**Ejemplo 7.2** — Un fabricante afirma que la temperatura de activación promedio de su rociador contra incendios es 130°. Con n=9, x̄=131,08°, distribución normal con σ=1,5°, se prueba H₀:μ=130 vs. H₁:μ≠130 (test de dos colas) a nivel α=0,01, calculando z=(131,08−130)/(1,5/√9) y comparando contra ±z_(0,005).

### Caso 2 — Muestra grande, σ desconocida

Cuando n es grande, sin suponer normalidad y sin conocer σ², X̄ también tiene distribución aproximadamente normal, estimando σ² con s². El estadístico de prueba z=(x̄−μ₀)/(s/√n) tiene las mismas regiones de rechazo que el Caso 1.

### Caso 3 — Muestra chica, σ desconocida

Si la muestra proviene de una población **normal** con σ desconocida y n es pequeño, T=(x̄−μ₀)/(s/√n) tiene distribución t con n−1 grados de libertad bajo H₀.

| H₁ | Región de rechazo (nivel α) |
|---|---|
| μ > μ₀ | t ≥ t_(α,n−1) (cola superior) |
| μ < μ₀ | t ≤ −t_(α,n−1) (cola inferior) |
| μ ≠ μ₀ | t ≥ t_(α/2,n−1) o t ≤ −t_(α/2,n−1) (dos colas) |

## Pruebas para una proporción

### Caso 4 — muestras grandes

Como p̂~N(p, p(1−p)/n) aproximadamente, y para n grande el error de reemplazar p por p̂ en la varianza es despreciable, bajo H₀ el estadístico de prueba es:

```
z = (p̂ − p₀) / √(p₀(1−p₀)/n)
```

| H₁ | Región de rechazo (nivel α) |
|---|---|
| p > p₀ | z ≥ z_α (cola superior) |
| p < p₀ | z ≤ −z_α (cola inferior) |
| p ≠ p₀ | z ≥ z_(α/2) o z ≤ −z_(α/2) (dos colas) |

Válido siempre que n·p₀≥10 y n·(1−p₀)≥10.

**Ejemplo 7.4** — Sondeo de 6000 hogares: 335 comprarían una salsa picante nueva. Un estudio previo indicaba que el 5% la compraría. Se prueba si el interés aumentó: H₀:p=0,05, H₁:p>0,05, α=0,02 (z_α=2,053). Se verifica primero 6000·0,05≥10 y 6000·0,95≥10. El estadístico da z=(335/6000−0,05)/√(0,05·0,95/6000) ≈ 2,073. Como z≥z_α, se **rechaza H₀**: el interés actual es significativamente mayor que dos años atrás.

## Prueba sobre la varianza de una población

Retomando el teorema de la Unidad 6: si la muestra proviene de una población **normal**, el estadístico de prueba es:

```
χ² = (n−1)·s² / σ₀²    ~   χ²_(n−1)  (bajo H₀)
```

| H₁ | Región de rechazo (nivel α) |
|---|---|
| σ > σ₀ | χ² ≥ χ²_(α;n−1) (cola superior) |
| σ < σ₀ | χ² ≤ χ²_(1−α;n−1) (cola inferior) |
| σ ≠ σ₀ | χ² ≤ χ²_(1−α/2;n−1) o χ² ≥ χ²_(α/2;n−1) (dos colas) |

**Ejemplo 7.5** — Llegada de un metrobús cada 45 seg en promedio, con varianza teórica σ²=5 seg². Con muestra de n=16 y s²=7,91, se prueba H₀:σ²=5 vs. H₁:σ²>5, con α=0,05. χ²_obs = (15·7,91)/5 = 23,73. χ²_crít = χ²_(0,05;15) = 24,996. Como χ²_obs < χ²_crít, **no hay evidencia suficiente** para afirmar que la varianza aumentó.

---

## Inferencia sobre la pendiente de la recta de regresión

*(Retoma el modelo de regresión lineal simple de la Unidad 4.)* La pendiente poblacional β es el cambio promedio verdadero en Y asociado a un incremento de una unidad en X. La pendiente muestral b (hallada por mínimos cuadrados) es su estimación puntual: β̂=b.

De las ecuaciones normales: b = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)². Se puede demostrar que b tiene distribución normal con:

```
E(b) = β        V(b) = σb² = σ² / Sxx        donde Sxx = Σxᵢ² − (Σxᵢ)²/n
```

Reemplazando σ por su estimación sₑ (error estándar de la estimación, Unidad 4): sb = sₑ/√Sxx.

### Intervalo de confianza para β

Bajo los supuestos del modelo, T=(b−β)/sb tiene distribución t con **n−2** grados de libertad. El intervalo de confianza del 100(1−α)% para β es:

```
b ± t_(α/2;n−2) · sb
```

### Test de utilidad del modelo (H₀: β=0)

Prueba si existe relación lineal significativa entre X e Y: H₀:β=0, H₁:β≠0. Estadístico de prueba: t = b/sb. Se rechaza H₀ si t≥t_(α/2;n−2) o t≤−t_(α/2;n−2) (si se rechaza, hay evidencia de que **sí existe regresión**, es decir, relación lineal entre las variables).

**Ejemplo 7.6** — Regresión con n=17, b=3,73, sₑ=28,654, Sxx=871,56.
- a) sb = 28,654/√871,56 ≈ 0,9706.
- b) IC del 98% para β: t_(0,01;15)=2,6 → 3,73 ± 2,6·0,9706 = 3,73±2,53 → (1,20; 6,26).
- c) Test H₀:β=0 vs H₁:β≠0: t = 3,73/0,9706 ≈ 3,84. Como t≥t_(0,01;15), se **rechaza H₀**: hay evidencia estadística de que existe regresión (relación lineal significativa entre X e Y).
