# Simulador de Torneo Argentino — CLAUDE.md

## Descripción del proyecto

Aplicación React interactiva que simula la Liga Profesional Argentina bajo distintos formatos de torneo, usando probabilidades derivadas de odds históricas reales (football-data.co.uk). El objetivo es comparar qué tan "justo" es cada formato — es decir, con qué frecuencia el mejor equipo termina siendo campeón.

## Stack técnico

- **React + Vite** — scaffolding estándar (`npm create vite@latest . -- --template react`)
- **D3.js** — todas las visualizaciones
- **GitHub Pages** — despliegue via `gh-pages` o GitHub Actions
- **Vite config**: `base: '/<nombre-del-repo>/'` en `vite.config.js` para GitHub Pages

## Datos fuente

Archivo: `ARG.csv` (football-data.co.uk)

### Estructura del CSV

| Columna | Descripción |
|--------|-------------|
| `Country`, `League`, `Season` | Metadatos |
| `Date`, `Time` | Fecha y hora del partido |
| `Home`, `Away` | Equipos local y visitante |
| `HG`, `AG` | Goles local y visitante (resultado real) |
| `Res` | Resultado: `H` (local), `D` (empate), `A` (visitante) |
| `AvgCH`, `AvgCD`, `AvgCA` | **Odds promedio** de múltiples casas: local / empate / visitante ← **fuente principal** |
| `B365CH`, `B365CD`, `B365CA` | Odds Bet365 (validación) |
| `MaxCH`, `MaxCD`, `MaxCA` | Máximo de mercado |
| `BFECH`, `BFECD`, `BFECA` | Betfair Exchange (solo 210/253 partidos en 2026) |

### Temporadas disponibles
- Histórico desde 2012/2013 hasta 2026
- **2026**: 253 partidos, enero–marzo, 30 equipos

---

## Pipeline de datos

### Paso 1 — Conversión de odds a probabilidades

Las cuotas europeas incluyen el margen de la casa (_overround_). Convertir usando normalización simple:

```
p_raw_H = 1 / AvgCH
p_raw_D = 1 / AvgCD
p_raw_A = 1 / AvgCA
total = p_raw_H + p_raw_D + p_raw_A

p_local   = p_raw_H / total
p_empate  = p_raw_D / total
p_visitante = p_raw_A / total
```

Alternativamente, método de Shin para mayor precisión (opcional).

### Paso 2 — Construcción de la tabla de probabilidades

Para cada par `(local, visitante)`:

1. **Si hay datos 2026** → usar `AvgC` del partido correspondiente
2. **Si no hay datos 2026** → buscar el mismo matchup en temporadas recientes (2024, 2025), promediando con mayor peso a la más reciente
3. **Si no hay datos históricos** → estimar usando el promedio de rendimiento de cada equipo (ataque/defensa relativo) sobre el histórico disponible

Tabla resultante: una fila por par ordenado `(local, visitante)`, 870 filas para 30 equipos.

### Paso 3 — Simulación de partidos

Función `simularPartido(p_local, p_empate, p_visitante)`:
- Sorteo aleatorio con `Math.random()` sobre los tres rangos de probabilidad
- Devuelve `"H"`, `"D"`, o `"A"`

Para simulaciones de marcador (necesario para desempate por diferencia de gol):
- Modelar goles con distribución de Poisson usando λ estimado por equipo
- `λ_local = ataque_local * defensa_visitante * factor_localía`

### Paso 4 — Formatos de torneo a simular

#### Formato actual (Apertura / Clausura)
- Dos torneos anuales cortos (~14–16 equipos por zona, todos contra todos)
- Clasifican al playoff: campeones de zona + wildcards por puntaje/diferencia de gol
- Semifinales y final a partido único o doble partido (verificar reglamento vigente)
- El campeón de zona tiene ventaja de localía en la final

#### Formato liga anual ("europeo")
- Todos los equipos, todos contra todos, dos ruedas
- Campeón = primero en tabla por puntos (criterio de desempate: diferencia de gol, luego goles a favor)
- Sin playoffs

#### Métricas de comparación
- **% de veces que el "mejor equipo" gana** (el que tiene mayor probabilidad acumulada implícita)
- **Distribución de campeones** por equipo en N simulaciones
- **Upset rate**: frecuencia con que gana un equipo con probabilidad < X%
- **Entropía del resultado**: qué tan concentrado o distribuido es el ganador

---

## Estructura del proyecto

```
/
├── public/
│   └── data/
│       └── ARG.csv
├── src/
│   ├── components/
│   │   ├── TorneoSimulator.jsx     # Componente principal
│   │   ├── TablaEquipos.jsx        # Tabla de probabilidades base
│   │   ├── DistribucionCampeones.jsx  # Bar chart D3: % campeón por equipo
│   │   ├── ComparacionFormatos.jsx    # Vista comparativa lado a lado
│   │   └── BracketPlayoff.jsx      # Diagrama del bracket (formato actual)
│   ├── utils/
│   │   ├── oddsUtils.js            # Conversión odds → probabilidades
│   │   ├── simulacion.js           # Lógica de simulación de partidos y torneo
│   │   ├── formatos.js             # Implementación de cada formato de torneo
│   │   └── dataLoader.js           # Carga y procesamiento del CSV
│   ├── App.jsx
│   └── main.jsx
├── CLAUDE.md
├── vite.config.js
└── package.json
```

---

## Convenciones de código

- **Idioma**: comentarios y variables en español. Nombres de funciones en camelCase español (`simularTorneo`, `cargarDatos`, `calcularProbabilidades`)
- **D3**: manipulación de DOM solo dentro de `useEffect` con refs, nunca mezclado con JSX
- **Simulaciones**: parametrizar N (número de iteraciones), default 10.000. Ejecutar en `Web Worker` si el rendimiento lo requiere
- **CSV parsing**: usar `d3.csv()` para cargar `ARG.csv` desde `/public/data/`

---

## Despliegue en GitHub Pages

```js
// vite.config.js
export default {
  base: '/<nombre-del-repo>/',
  build: { outDir: 'dist' }
}
```

```json
// package.json — script de deploy
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

O via GitHub Actions con `peaceiris/actions-gh-pages@v4` con `permissions: contents: write`.

---

## Notas importantes

- El CSV usa separador `,` y encoding UTF-8 con BOM (`utf-8-sig`)
- Las fechas están en formato `DD/MM/YYYY`
- Temporadas con formato de nombre inconsistente: `2012/2013`, `2014`, `2016/2017`, `2026`, etc. — normalizar al año de inicio
- Algunos equipos aparecen con nombres distintos entre temporadas (ej: `Atl. Rafaela` vs posibles variantes) — revisar y unificar antes de cruzar históricos
- La temporada 2026 tiene 30 equipos — algunos pueden ser recién ascendidos sin historial previo en el dataset

---

## Pendiente / decisiones abiertas

- [ ] Definir paleta de colores y tipografía del tema visual
- [ ] Confirmar reglamento exacto del formato Apertura/Clausura 2026 (número de clasificados al playoff, criterio de desempate, etc.)
- [ ] Decidir si usar marcador simulado (Poisson) o solo resultado 1X2
- [ ] Decidir si incluir más formatos (ej: formato de torneos cortos estilo copa, formato histórico Nacional/Metropolitano)
- [ ] Nombre del repo en GitHub (afecta el `base` de Vite)
