const equipos = [
  { id: 'independiente-rivadavia', nombre: 'Ind. Rivadavia',       nombreCSV: 'Ind. Rivadavia',        escudo: '/escudos/independiente-rivadavia.png' },
  { id: 'estudiantes-lp',         nombre: 'Estudiantes',           nombreCSV: 'Estudiantes L.P.',       escudo: '/escudos/estudiantes-lp.png' },
  { id: 'boca',                   nombre: 'Boca Jrs.',             nombreCSV: 'Boca Juniors',           escudo: '/escudos/boca.png' },
  { id: 'river',                  nombre: 'River',                 nombreCSV: 'River Plate',            escudo: '/escudos/river.png' },
  { id: 'argentinos',             nombre: 'Argentinos',            nombreCSV: 'Argentinos Jrs',         escudo: '/escudos/argentinos.png' },
  { id: 'velez',                  nombre: 'Vélez',                 nombreCSV: 'Velez Sarsfield',        escudo: '/escudos/velez.png' },
  { id: 'central',                nombre: 'Central',               nombreCSV: 'Rosario Central',        escudo: '/escudos/central.png' },
  { id: 'talleres',               nombre: 'Talleres',              nombreCSV: 'Talleres Cordoba',       escudo: '/escudos/talleres.png' },
  { id: 'belgrano',               nombre: 'Belgrano',              nombreCSV: 'Belgrano',               escudo: '/escudos/belgrano.png' },
  { id: 'gimnasia',               nombre: 'Gimnasia',              nombreCSV: 'Gimnasia L.P.',          escudo: '/escudos/gimnasia.png' },
  { id: 'independiente',          nombre: 'Independiente',         nombreCSV: 'Independiente',          escudo: '/escudos/independiente.png' },
  { id: 'lanus',                  nombre: 'Lanús',                 nombreCSV: 'Lanus',                  escudo: '/escudos/lanus.png' },
  { id: 'huracan',                nombre: 'Huracán',               nombreCSV: 'Huracan',                escudo: '/escudos/huracan.png' },
  { id: 'san-lorenzo',            nombre: 'San Lorenzo',           nombreCSV: 'San Lorenzo',            escudo: '/escudos/san-lorenzo.png' },
  { id: 'union',                  nombre: 'Unión',                 nombreCSV: 'Union de Santa Fe',      escudo: '/escudos/union.png' },
  { id: 'racing',                 nombre: 'Racing',                nombreCSV: 'Racing Club',            escudo: '/escudos/racing.png' },
  { id: 'instituto',              nombre: 'Instituto',             nombreCSV: 'Instituto',              escudo: '/escudos/instituto.png' },
  { id: 'barracas',               nombre: 'Barracas',              nombreCSV: 'Barracas Central',       escudo: '/escudos/barracas.png' },
  { id: 'tigre',                  nombre: 'Tigre',                 nombreCSV: 'Tigre',                  escudo: '/escudos/tigre.png' },
  { id: 'defensa',                nombre: 'Defensa',               nombreCSV: 'Defensa y Justicia',     escudo: '/escudos/defensa.png' },
  { id: 'sarmiento',              nombre: 'Sarmiento',             nombreCSV: 'Sarmiento Junin',        escudo: '/escudos/sarmiento.png' },
  { id: 'gimnasia-m',             nombre: 'Gimnasia (M)',          nombreCSV: 'Gimnasia Mendoza',       escudo: '/escudos/gimnasia-m.png' },
  { id: 'banfield',               nombre: 'Banfield',              nombreCSV: 'Banfield',               escudo: '/escudos/banfield.png' },
  { id: 'platense',               nombre: 'Platense',              nombreCSV: 'Platense',               escudo: '/escudos/platense.png' },
  { id: 'central-cordoba',        nombre: 'Central Córdoba',       nombreCSV: 'Central Cordoba',        escudo: '/escudos/central-cordoba.png' },
  { id: 'newells',                nombre: "Newell's",              nombreCSV: 'Newells Old Boys',       escudo: '/escudos/newells.png' },
  { id: 'atl-tucuman',            nombre: 'Atl. Tucumán',          nombreCSV: 'Atl. Tucuman',           escudo: '/escudos/atl-tucuman.png' },
  { id: 'riestra',                nombre: 'Riestra',               nombreCSV: 'Dep. Riestra',           escudo: '/escudos/riestra.png' },
  { id: 'aldosivi',               nombre: 'Aldosivi',              nombreCSV: 'Aldosivi',               escudo: '/escudos/aldosivi.png' },
  { id: 'estudiantes-rc',         nombre: 'Estudiantes RC',        nombreCSV: 'Estudiantes Rio Cuarto', escudo: '/escudos/estudiantes-rc.png' },
];

export const equiposPorCSV = Object.fromEntries(equipos.map(e => [e.nombreCSV, e]));
export const equiposPorId  = Object.fromEntries(equipos.map(e => [e.id, e]));

export default equipos;
