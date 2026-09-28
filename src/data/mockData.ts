import { Athlete, TrainingSession, TacticalPlay, CoachDirective, DrillPreset, WellnessEntry } from '../types';

export const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 'ath-1',
    number: 1,
    name: 'Mateo Rossi',
    position: 'POR',
    positionLabel: 'Arquero Titular',
    age: 24,
    heightCm: 189,
    weightKg: 84,
    status: 'ready',
    stats: { speed: 72, endurance: 80, tactical: 88, passing: 85, decision: 90, strength: 82 },
    weeklyWorkloadAU: 1820,
    chronicWorkloadAU: 1750,
    acwr: 1.04,
    wellnessScore: 9,
    attendanceRate: 100,
    avatarInitials: 'MR',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'ath-2',
    number: 4,
    name: 'Facundo Benítez',
    position: 'DEF',
    positionLabel: 'Lateral Derecho',
    age: 22,
    heightCm: 178,
    weightKg: 73,
    status: 'ready',
    stats: { speed: 89, endurance: 88, tactical: 82, passing: 79, decision: 80, strength: 78 },
    weeklyWorkloadAU: 2450,
    chronicWorkloadAU: 2280,
    acwr: 1.07,
    wellnessScore: 11,
    attendanceRate: 98,
    avatarInitials: 'FB',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'ath-3',
    number: 2,
    name: 'Nicolás Carrizo',
    position: 'DEF',
    positionLabel: 'Defensa Central',
    age: 27,
    heightCm: 186,
    weightKg: 82,
    status: 'ready',
    stats: { speed: 76, endurance: 84, tactical: 92, passing: 82, decision: 89, strength: 91 },
    weeklyWorkloadAU: 2190,
    chronicWorkloadAU: 2150,
    acwr: 1.02,
    wellnessScore: 10,
    attendanceRate: 100,
    avatarInitials: 'NC',
    avatarColor: 'from-slate-600 to-slate-800'
  },
  {
    id: 'ath-4',
    number: 6,
    name: 'Thiago Almada',
    position: 'DEF',
    positionLabel: 'Defensa Central',
    age: 23,
    heightCm: 185,
    weightKg: 80,
    status: 'caution',
    statusNotes: 'Fatiga aductor izquierdo detectada post-MD-3',
    stats: { speed: 78, endurance: 81, tactical: 86, passing: 80, decision: 84, strength: 87 },
    weeklyWorkloadAU: 2950,
    chronicWorkloadAU: 2120,
    acwr: 1.39,
    wellnessScore: 17,
    attendanceRate: 95,
    avatarInitials: 'TA',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'ath-5',
    number: 3,
    name: 'Lucas Pereyra',
    position: 'DEF',
    positionLabel: 'Lateral Izquierdo',
    age: 21,
    heightCm: 176,
    weightKg: 71,
    status: 'ready',
    stats: { speed: 91, endurance: 87, tactical: 81, passing: 84, decision: 79, strength: 75 },
    weeklyWorkloadAU: 2380,
    chronicWorkloadAU: 2200,
    acwr: 1.08,
    wellnessScore: 12,
    attendanceRate: 100,
    avatarInitials: 'LP',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'ath-6',
    number: 5,
    name: 'Santiago Morales',
    position: 'MED',
    positionLabel: 'Mediocentro Defensivo / Pivote',
    age: 26,
    heightCm: 182,
    weightKg: 78,
    status: 'ready',
    stats: { speed: 79, endurance: 94, tactical: 95, passing: 91, decision: 93, strength: 84 },
    weeklyWorkloadAU: 2680,
    chronicWorkloadAU: 2550,
    acwr: 1.05,
    wellnessScore: 9,
    attendanceRate: 100,
    avatarInitials: 'SM',
    avatarColor: 'from-violet-600 to-purple-800'
  },
  {
    id: 'ath-7',
    number: 8,
    name: 'Julián Quiroga',
    position: 'MED',
    positionLabel: 'Interior Mixto',
    age: 25,
    heightCm: 180,
    weightKg: 75,
    status: 'ready',
    stats: { speed: 84, endurance: 92, tactical: 89, passing: 88, decision: 86, strength: 81 },
    weeklyWorkloadAU: 2620,
    chronicWorkloadAU: 2490,
    acwr: 1.05,
    wellnessScore: 10,
    attendanceRate: 100,
    avatarInitials: 'JQ',
    avatarColor: 'from-indigo-600 to-blue-800'
  },
  {
    id: 'ath-8',
    number: 10,
    name: 'Enzo Fernández V.',
    position: 'MED',
    positionLabel: 'Enganche / Mediapunta',
    age: 23,
    heightCm: 177,
    weightKg: 72,
    status: 'ready',
    stats: { speed: 82, endurance: 85, tactical: 94, passing: 96, decision: 95, strength: 74 },
    weeklyWorkloadAU: 2310,
    chronicWorkloadAU: 2260,
    acwr: 1.02,
    wellnessScore: 8,
    attendanceRate: 100,
    avatarInitials: 'EF',
    avatarColor: 'from-sky-600 to-cyan-700'
  },
  {
    id: 'ath-9',
    number: 7,
    name: 'Gonzalo Ibarra',
    position: 'DEL',
    positionLabel: 'Extremo Derecho',
    age: 22,
    heightCm: 175,
    weightKg: 70,
    status: 'ready',
    stats: { speed: 95, endurance: 84, tactical: 83, passing: 81, decision: 82, strength: 76 },
    weeklyWorkloadAU: 2540,
    chronicWorkloadAU: 2410,
    acwr: 1.05,
    wellnessScore: 11,
    attendanceRate: 98,
    avatarInitials: 'GI',
    avatarColor: 'from-red-600 to-rose-700'
  },
  {
    id: 'ath-10',
    number: 9,
    name: 'Bruno Costas',
    position: 'DEL',
    positionLabel: 'Delantero Centro',
    age: 26,
    heightCm: 187,
    weightKg: 83,
    status: 'caution',
    statusNotes: 'Sobrecarga de isquiotibiales tras partido anterior',
    stats: { speed: 85, endurance: 80, tactical: 86, passing: 78, decision: 88, strength: 89 },
    weeklyWorkloadAU: 2890,
    chronicWorkloadAU: 2050,
    acwr: 1.41,
    wellnessScore: 16,
    attendanceRate: 92,
    avatarInitials: 'BC',
    avatarColor: 'from-amber-600 to-red-700'
  },
  {
    id: 'ath-11',
    number: 11,
    name: 'Lautaro Vega',
    position: 'DEL',
    positionLabel: 'Extremo Izquierdo',
    age: 21,
    heightCm: 179,
    weightKg: 72,
    status: 'ready',
    stats: { speed: 93, endurance: 83, tactical: 82, passing: 83, decision: 84, strength: 77 },
    weeklyWorkloadAU: 2480,
    chronicWorkloadAU: 2380,
    acwr: 1.04,
    wellnessScore: 10,
    attendanceRate: 100,
    avatarInitials: 'LV',
    avatarColor: 'from-fuchsia-600 to-pink-700'
  },
  {
    id: 'ath-12',
    number: 14,
    name: 'Joaquín Silva',
    position: 'MED',
    positionLabel: 'Volante Mixto Suplente',
    age: 20,
    heightCm: 181,
    weightKg: 74,
    status: 'differentiation',
    statusNotes: 'Plan de reacondicionamiento físico progresivo',
    stats: { speed: 80, endurance: 76, tactical: 79, passing: 81, decision: 78, strength: 76 },
    weeklyWorkloadAU: 1410,
    chronicWorkloadAU: 1950,
    acwr: 0.72,
    wellnessScore: 13,
    attendanceRate: 88,
    avatarInitials: 'JS',
    avatarColor: 'from-teal-600 to-emerald-800'
  },
  {
    id: 'ath-13',
    number: 18,
    name: 'Rodrigo Mansilla',
    position: 'DEF',
    positionLabel: 'Central Suplente',
    age: 25,
    heightCm: 188,
    weightKg: 85,
    status: 'ready',
    stats: { speed: 75, endurance: 82, tactical: 84, passing: 78, decision: 81, strength: 90 },
    weeklyWorkloadAU: 2100,
    chronicWorkloadAU: 2020,
    acwr: 1.04,
    wellnessScore: 11,
    attendanceRate: 100,
    avatarInitials: 'RM',
    avatarColor: 'from-zinc-600 to-slate-800'
  },
  {
    id: 'ath-14',
    number: 22,
    name: 'Emiliano Ruiz',
    position: 'DEL',
    positionLabel: 'Segundo Delantero',
    age: 23,
    heightCm: 174,
    weightKg: 69,
    status: 'injured',
    statusNotes: 'Distensión grado I ligamento colateral medial (Día 10 de kinesiología)',
    stats: { speed: 87, endurance: 70, tactical: 82, passing: 80, decision: 83, strength: 72 },
    weeklyWorkloadAU: 620,
    chronicWorkloadAU: 2100,
    acwr: 0.30,
    wellnessScore: 21,
    attendanceRate: 75,
    avatarInitials: 'ER',
    avatarColor: 'from-rose-700 to-red-900'
  },
  {
    id: 'ath-15',
    number: 12,
    name: 'Tomás Cáceres',
    position: 'POR',
    positionLabel: 'Arquero Suplente',
    age: 20,
    heightCm: 187,
    weightKg: 81,
    status: 'ready',
    stats: { speed: 70, endurance: 78, tactical: 79, passing: 80, decision: 81, strength: 80 },
    weeklyWorkloadAU: 1650,
    chronicWorkloadAU: 1600,
    acwr: 1.03,
    wellnessScore: 10,
    attendanceRate: 100,
    avatarInitials: 'TC',
    avatarColor: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'ath-16',
    number: 17,
    name: 'Kevin Domínguez',
    position: 'MED',
    positionLabel: 'Extremo / Carrilero',
    age: 24,
    heightCm: 177,
    weightKg: 73,
    status: 'ready',
    stats: { speed: 88, endurance: 86, tactical: 81, passing: 82, decision: 83, strength: 79 },
    weeklyWorkloadAU: 2390,
    chronicWorkloadAU: 2300,
    acwr: 1.04,
    wellnessScore: 11,
    attendanceRate: 100,
    avatarInitials: 'KD',
    avatarColor: 'from-purple-700 to-indigo-900'
  }
];

export const INITIAL_TACTICAL_PLAYS: TacticalPlay[] = [
  {
    id: 'play-1',
    title: 'Salida de Presión 4-3-3 con Fijación y Tercer Hombre',
    sport: 'futbol11',
    pitchView: 'half',
    category: 'Ofensiva',
    objective: 'Superar la primera línea de presión rival atrayendo interiores y liberando al lateral o interior alejado mediante un pase al pivote de apoyo.',
    description: 'El arquero (1) abre el juego con el central izquierdo (3). Ante el salto de presión del extremo rival (R7), el pivote (5) se ofrece como receptor de apoyo y descarga de primera intención hacia el interior (8) que ataca el intervalo espacial.',
    durationSeconds: 14,
    createdAt: '2026-09-24',
    drawings: [
      {
        id: 'd1',
        type: 'dashed',
        color: '#38bdf8',
        points: [{ x: 15, y: 50 }, { x: 28, y: 32 }],
        label: 'Pase inicial a central'
      },
      {
        id: 'd2',
        type: 'arrow',
        color: '#f43f5e',
        points: [{ x: 45, y: 22 }, { x: 32, y: 30 }],
        label: 'Presión rival'
      },
      {
        id: 'd3',
        type: 'dashed',
        color: '#10b981',
        points: [{ x: 28, y: 32 }, { x: 42, y: 48 }],
        label: 'Descarga al pivote'
      },
      {
        id: 'd4',
        type: 'arrow',
        color: '#38bdf8',
        points: [{ x: 42, y: 48 }, { x: 62, y: 64 }],
        label: 'Tercer hombre'
      }
    ],
    keyframes: [
      {
        id: 'kf-1',
        stepNumber: 1,
        label: 'Fase 1: Posicionamiento e Iniciación',
        durationMs: 3000,
        elements: {
          'p1': { x: 12, y: 50, label: '1 (POR)' },
          'p2': { x: 30, y: 76, label: '4 (LD)' },
          'p3': { x: 28, y: 30, label: '3 (CI)' },
          'p4': { x: 26, y: 50, label: '2 (CD)' },
          'p5': { x: 44, y: 50, label: '5 (PIV)' },
          'p6': { x: 55, y: 32, label: '8 (INT)' },
          'p7': { x: 56, y: 68, label: '10 (INT)' },
          'p8': { x: 75, y: 25, label: '11 (EI)' },
          'p9': { x: 74, y: 75, label: '7 (ED)' },
          'p10': { x: 78, y: 50, label: '9 (DC)' },
          'r1': { x: 46, y: 24, label: 'R7' },
          'r2': { x: 42, y: 50, label: 'R9' },
          'r3': { x: 48, y: 76, label: 'R11' },
          'r4': { x: 62, y: 40, label: 'R8' },
          'r5': { x: 62, y: 60, label: 'R6' },
          'ball': { x: 14, y: 50, label: 'Balón' }
        }
      },
      {
        id: 'kf-2',
        stepNumber: 2,
        label: 'Fase 2: Atracción del Rival y Salto de Presión',
        durationMs: 3000,
        elements: {
          'p1': { x: 15, y: 50 },
          'p2': { x: 38, y: 82 },
          'p3': { x: 28, y: 28 },
          'p4': { x: 26, y: 48 },
          'p5': { x: 40, y: 46 },
          'p6': { x: 58, y: 28 },
          'p7': { x: 62, y: 66 },
          'p8': { x: 78, y: 22 },
          'p9': { x: 76, y: 78 },
          'p10': { x: 80, y: 48 },
          'r1': { x: 32, y: 30 },
          'r2': { x: 34, y: 48 },
          'r3': { x: 46, y: 74 },
          'r4': { x: 54, y: 38 },
          'r5': { x: 60, y: 58 },
          'ball': { x: 28, y: 29 }
        }
      },
      {
        id: 'kf-3',
        stepNumber: 3,
        label: 'Fase 3: Pase de Apoyo al Pivote y Giro',
        durationMs: 3000,
        elements: {
          'p1': { x: 16, y: 50 },
          'p2': { x: 48, y: 84 },
          'p3': { x: 30, y: 26 },
          'p4': { x: 28, y: 46 },
          'p5': { x: 42, y: 48 },
          'p6': { x: 64, y: 34 },
          'p7': { x: 66, y: 64 },
          'p8': { x: 80, y: 20 },
          'p9': { x: 78, y: 80 },
          'p10': { x: 82, y: 46 },
          'r1': { x: 31, y: 28 },
          'r2': { x: 38, y: 46 },
          'r3': { x: 46, y: 72 },
          'r4': { x: 50, y: 44 },
          'r5': { x: 62, y: 56 },
          'ball': { x: 42, y: 48 }
        }
      },
      {
        id: 'kf-4',
        stepNumber: 4,
        label: 'Fase 4: Rompimiento en Intervalo con Tercer Hombre',
        durationMs: 3000,
        elements: {
          'p1': { x: 18, y: 50 },
          'p2': { x: 60, y: 86 },
          'p3': { x: 34, y: 28 },
          'p4': { x: 32, y: 46 },
          'p5': { x: 44, y: 50 },
          'p6': { x: 70, y: 36 },
          'p7': { x: 72, y: 62 },
          'p8': { x: 84, y: 20 },
          'p9': { x: 82, y: 82 },
          'p10': { x: 86, y: 44 },
          'r1': { x: 34, y: 30 },
          'r2': { x: 42, y: 44 },
          'r3': { x: 48, y: 70 },
          'r4': { x: 58, y: 46 },
          'r5': { x: 64, y: 54 },
          'ball': { x: 70, y: 36 }
        }
      }
    ]
  },
  {
    id: 'play-2',
    title: 'Transición Rápida Ofensiva tras Recuperación en Zona 2',
    sport: 'futbol11',
    pitchView: 'full',
    category: 'Transición',
    objective: 'Aprovechar el desbalance defensivo rival conectando en menos de 8 segundos con extremos en amplitud y remate de delantero centro.',
    description: 'Recuperación por parte del volante mixto (8). Conexión inmediata con el extremo abierto (7) que realiza un desmarque de ruptura a la espalda del lateral, seguido de centro al punto penal para la llegada sincronizada del 9 y 10.',
    durationSeconds: 12,
    createdAt: '2026-09-25',
    drawings: [
      {
        id: 'd2-1',
        type: 'dashed',
        color: '#38bdf8',
        points: [{ x: 48, y: 45 }, { x: 74, y: 20 }],
        label: 'Pase en profundidad al espacio'
      },
      {
        id: 'd2-2',
        type: 'arrow',
        color: '#10b981',
        points: [{ x: 74, y: 20 }, { x: 88, y: 48 }],
        label: 'Centro rasante al corazón del área'
      }
    ],
    keyframes: [
      {
        id: 'kf2-1',
        stepNumber: 1,
        label: 'Fase 1: Recuperación en Bloque Medio',
        durationMs: 3000,
        elements: {
          'p1': { x: 10, y: 50, label: '1' },
          'p2': { x: 30, y: 80, label: '4' },
          'p3': { x: 26, y: 60, label: '2' },
          'p4': { x: 26, y: 40, label: '6' },
          'p5': { x: 30, y: 20, label: '3' },
          'p6': { x: 45, y: 50, label: '5' },
          'p7': { x: 48, y: 42, label: '8' },
          'p8': { x: 52, y: 65, label: '10' },
          'p9': { x: 55, y: 18, label: '7' },
          'p10': { x: 54, y: 82, label: '11' },
          'p11': { x: 58, y: 50, label: '9' },
          'r1': { x: 52, y: 44, label: 'R8' },
          'r2': { x: 60, y: 35, label: 'R4' },
          'r3': { x: 68, y: 45, label: 'R2' },
          'r4': { x: 68, y: 58, label: 'R6' },
          'r5': { x: 60, y: 68, label: 'R3' },
          'ball': { x: 49, y: 42 }
        }
      },
      {
        id: 'kf2-2',
        stepNumber: 2,
        label: 'Fase 2: Pase Filtrado a la Espalda del Rival',
        durationMs: 3000,
        elements: {
          'p1': { x: 12, y: 50 },
          'p2': { x: 42, y: 82 },
          'p3': { x: 34, y: 60 },
          'p4': { x: 34, y: 40 },
          'p5': { x: 38, y: 20 },
          'p6': { x: 52, y: 50 },
          'p7': { x: 54, y: 42 },
          'p8': { x: 62, y: 62 },
          'p9': { x: 75, y: 18 },
          'p10': { x: 66, y: 80 },
          'p11': { x: 72, y: 50 },
          'r1': { x: 54, y: 46 },
          'r2': { x: 65, y: 32 },
          'r3': { x: 72, y: 44 },
          'r4': { x: 72, y: 58 },
          'r5': { x: 66, y: 66 },
          'ball': { x: 75, y: 19 }
        }
      },
      {
        id: 'kf2-3',
        stepNumber: 3,
        label: 'Fase 3: Llegada a Línea de Fondo y Remate',
        durationMs: 3000,
        elements: {
          'p1': { x: 15, y: 50 },
          'p2': { x: 55, y: 80 },
          'p3': { x: 45, y: 58 },
          'p4': { x: 45, y: 42 },
          'p5': { x: 48, y: 22 },
          'p6': { x: 64, y: 50 },
          'p7': { x: 68, y: 42 },
          'p8': { x: 78, y: 56 },
          'p9': { x: 88, y: 24 },
          'p10': { x: 76, y: 76 },
          'p11': { x: 88, y: 49 },
          'r1': { x: 62, y: 48 },
          'r2': { x: 80, y: 30 },
          'r3': { x: 84, y: 45 },
          'r4': { x: 83, y: 55 },
          'r5': { x: 75, y: 65 },
          'ball': { x: 88, y: 48 }
        }
      }
    ]
  },
  {
    id: 'play-3',
    title: 'Balón Parado (ABP): Córner con Bloqueo y Remate al 2° Palo',
    sport: 'futbol11',
    pitchView: 'box',
    category: 'Balón Parado (ABP)',
    objective: 'Despejar el segundo palo mediante pantallas y arrastre de marcas al primer palo para finalización cómoda del central con mejor juego aéreo.',
    description: 'El ejecutor (10) busca con centro combado el segundo poste. El jugador 9 y el 4 arrastran marcas hacia el primer poste, mientras el 2 realiza un bloqueo legal sobre el defensor zonal, permitiendo al central (6) cabecear con ventaja biomecánica.',
    durationSeconds: 10,
    createdAt: '2026-09-26',
    drawings: [
      {
        id: 'd3-1',
        type: 'curve',
        color: '#fbbf24',
        points: [{ x: 96, y: 8 }, { x: 78, y: 40 }, { x: 82, y: 68 }],
        label: 'Trayectoria combada al 2° palo'
      },
      {
        id: 'd3-2',
        type: 'zone',
        color: '#ef4444',
        points: [{ x: 80, y: 25 }, { x: 92, y: 42 }],
        label: 'Zona de arrastre de marcas'
      }
    ],
    keyframes: [
      {
        id: 'kf3-1',
        stepNumber: 1,
        label: 'Fase 1: Disposición y Señal Táctica',
        durationMs: 3000,
        elements: {
          'p10': { x: 95, y: 8, label: '10 (Lanzador)' },
          'p9': { x: 74, y: 38, label: '9' },
          'p4': { x: 72, y: 46, label: '4' },
          'p2': { x: 68, y: 55, label: '2 (Bloqueador)' },
          'p6': { x: 64, y: 65, label: '6 (Rematador)' },
          'p8': { x: 55, y: 45, label: '8 (Rebote)' },
          'r1': { x: 92, y: 48, label: 'POR' },
          'r2': { x: 84, y: 34, label: 'R2' },
          'r3': { x: 82, y: 44, label: 'R3' },
          'r4': { x: 78, y: 56, label: 'R4' },
          'r5': { x: 80, y: 66, label: 'R5' },
          'ball': { x: 95, y: 8 }
        }
      },
      {
        id: 'kf3-2',
        stepNumber: 2,
        label: 'Fase 2: Bloqueo y Arrastre al 1° Palo',
        durationMs: 3000,
        elements: {
          'p10': { x: 95, y: 9 },
          'p9': { x: 85, y: 32 },
          'p4': { x: 82, y: 38 },
          'p2': { x: 77, y: 58 },
          'p6': { x: 76, y: 68 },
          'p8': { x: 58, y: 45 },
          'r1': { x: 92, y: 48 },
          'r2': { x: 86, y: 33 },
          'r3': { x: 84, y: 40 },
          'r4': { x: 78, y: 58 },
          'r5': { x: 80, y: 66 },
          'ball': { x: 86, y: 36 }
        }
      },
      {
        id: 'kf3-3',
        stepNumber: 3,
        label: 'Fase 3: Impacto y Remate Limpio al 2° Palo',
        durationMs: 3000,
        elements: {
          'p10': { x: 93, y: 15 },
          'p9': { x: 88, y: 34 },
          'p4': { x: 86, y: 39 },
          'p2': { x: 80, y: 59 },
          'p6': { x: 84, y: 68 },
          'p8': { x: 62, y: 48 },
          'r1': { x: 90, y: 54 },
          'r2': { x: 88, y: 35 },
          'r3': { x: 85, y: 42 },
          'r4': { x: 79, y: 60 },
          'r5': { x: 83, y: 65 },
          'ball': { x: 85, y: 67 }
        }
      }
    ]
  },
  {
    id: 'play-4',
    title: 'Futsal / Fútbol Sala: Rotación 4-0 con Paralela al Espacio',
    sport: 'futbolSala',
    pitchView: 'full',
    category: 'Ofensiva',
    objective: 'Atraer al sistema defensivo hombre a hombre rival con pases de apoyo en primera línea y romper con carrera paralela a la banda.',
    description: 'En sistema 4 en línea, el cierre atrae la marca central y filtra un pase al ala derecho que descarga de cara, mientras el ala opuesto cruza en velocidad por la línea paralela recibiendo el pase definitivo.',
    durationSeconds: 8,
    createdAt: '2026-09-27',
    drawings: [
      {
        id: 'd4-1',
        type: 'dashed',
        color: '#38bdf8',
        points: [{ x: 30, y: 50 }, { x: 45, y: 25 }],
        label: 'Pase diagonal al ala'
      },
      {
        id: 'd4-2',
        type: 'arrow',
        color: '#10b981',
        points: [{ x: 32, y: 78 }, { x: 78, y: 80 }],
        label: 'Ruptura en paralela'
      }
    ],
    keyframes: [
      {
        id: 'kf4-1',
        stepNumber: 1,
        label: 'Fase 1: Inicio en Línea de 4',
        durationMs: 2500,
        elements: {
          'p1': { x: 12, y: 50, label: '1 (POR)' },
          'p2': { x: 30, y: 50, label: '5 (Cierre)' },
          'p3': { x: 35, y: 25, label: '7 (Ala I)' },
          'p4': { x: 32, y: 78, label: '10 (Ala D)' },
          'p5': { x: 42, y: 50, label: '9 (Pívot)' },
          'r1': { x: 42, y: 48, label: 'R1' },
          'r2': { x: 44, y: 28, label: 'R2' },
          'r3': { x: 42, y: 74, label: 'R3' },
          'r4': { x: 55, y: 50, label: 'R4' },
          'ball': { x: 30, y: 50 }
        }
      },
      {
        id: 'kf4-2',
        stepNumber: 2,
        label: 'Fase 2: Conexión con Ala y Cruce al Vacío',
        durationMs: 2500,
        elements: {
          'p1': { x: 14, y: 50 },
          'p2': { x: 38, y: 45 },
          'p3': { x: 48, y: 24 },
          'p4': { x: 56, y: 80 },
          'p5': { x: 52, y: 40 },
          'r1': { x: 45, y: 42 },
          'r2': { x: 50, y: 28 },
          'r3': { x: 48, y: 72 },
          'r4': { x: 62, y: 48 },
          'ball': { x: 48, y: 24 }
        }
      },
      {
        id: 'kf4-3',
        stepNumber: 3,
        label: 'Fase 3: Paralela al Espacio y Definición',
        durationMs: 2500,
        elements: {
          'p1': { x: 16, y: 50 },
          'p2': { x: 44, y: 48 },
          'p3': { x: 56, y: 26 },
          'p4': { x: 78, y: 80 },
          'p5': { x: 68, y: 48 },
          'r1': { x: 50, y: 46 },
          'r2': { x: 58, y: 32 },
          'r3': { x: 64, y: 74 },
          'r4': { x: 74, y: 52 },
          'ball': { x: 78, y: 80 }
        }
      }
    ]
  }
];

export const INITIAL_TRAINING_SESSIONS: TrainingSession[] = [
  {
    id: 'sess-1',
    title: 'Microciclo Estructurado: Tensión & Espacios Reducidos',
    date: '2026-09-24',
    dayType: 'MD-4',
    category: 'Fuerza & Tensión',
    location: 'Cancha Principal - Predio Deportivo',
    durationTotalMin: 85,
    targetRPE: 8,
    plannedLoadAU: 680,
    completedLoadAU: 672,
    description: 'Enfoque en contracciones musculares excéntricas, cambios de dirección en espacios reducidos (15x15m a 25x25m) y duelos 1v1 y 3v3 con alta demanda de aceleraciones/desaceleraciones.',
    blocks: [
      {
        id: 'b1',
        title: 'Activación Neuromuscular & Movilidad Articular Dinámica',
        phase: 'Calentamiento',
        durationMin: 15,
        targetRPE: 5,
        objective: 'Incrementar temperatura intramuscular y preparar cadenas miofasciales.',
        description: 'Carreras con frenadas bruscas, bandas elásticas, estiramientos dinámicos y técnica de zancada.',
        equipment: ['Conos chinos', 'Mini-bandas', 'Escaleras de coordinación']
      },
      {
        id: 'b2',
        title: 'Rondos de Presión Tras Pérdida 4v4 + 3 Comodines',
        phase: 'Fase Principal',
        durationMin: 25,
        targetRPE: 8,
        objective: 'Presión inmediata (3 segundos) al perder posesión y orientación corporal de pase.',
        description: 'Bloque de 4 series de 5 min con 1 min de pausa activa. Espacio de 20x20m delimitado.',
        equipment: ['Peto verde, azul y rojo', 'Balones oficiales']
      },
      {
        id: 'b3',
        title: 'Juegos de Posición Reducidos 3v3 + 2 Porteros',
        phase: 'Situación Real',
        durationMin: 30,
        targetRPE: 9,
        objective: 'Generar esfuerzos anaeróbicos alácticos y situaciones de finalización rápida.',
        description: 'Máximo 3 toques por jugador. Búsqueda constante de perfil de remate.',
        equipment: ['Arcos móviles', 'Balones']
      },
      {
        id: 'b4',
        title: 'Vuelta a la Calma & Foam Rolling Asistido',
        phase: 'Vuelta a la Calma',
        durationMin: 15,
        targetRPE: 3,
        objective: 'Aceleración del aclaramiento de lactato y relajación neuromuscular.',
        description: 'Trote suave regenerativo, respiración diafragmática y automasaje con rodillos.',
        equipment: ['Foam rollers', 'Colchonetas']
      }
    ],
    attendees: INITIAL_ATHLETES.map(a => ({
      athleteId: a.id,
      status: a.status === 'injured' ? 'lesionado' : a.status === 'differentiation' ? 'diferenciado' : 'presente',
      individualRPE: a.status === 'ready' ? 8 : 6
    }))
  },
  {
    id: 'sess-2',
    title: 'Resistencia Específica & Dinámica de Juego en Espacio Amplio',
    date: '2026-09-25',
    dayType: 'MD-3',
    category: 'Físico-Táctico',
    location: 'Cancha 1 (105x68m)',
    durationTotalMin: 90,
    targetRPE: 7,
    plannedLoadAU: 630,
    completedLoadAU: 645,
    description: 'Enfoque en alta distancia total (>6500m), carreras a alta intensidad (>19.8 km/h) y estructuración táctica del bloque defensivo y salida de presión ensayada.',
    blocks: [
      {
        id: 'b2-1',
        title: 'Rueda de Pases con Desmarques de Apoyo y Ruptura',
        phase: 'Calentamiento',
        durationMin: 15,
        targetRPE: 6,
        objective: 'Automatizar patrones de pase al tercer hombre y timing de carrera.',
        description: 'Circuito técnico a 2 toques con exigencia de perfil corporal abierto.',
        equipment: ['Estacas', 'Balones']
      },
      {
        id: 'b2-2',
        title: 'Simulación Táctica: Salida de Presión 4-3-3 (Campo Completo)',
        phase: 'Fase Principal',
        durationMin: 40,
        targetRPE: 8,
        objective: 'Consolidar automatismos de salida ensayados en pizarra.',
        description: '10v10 en campo reglamentario con consigna de superar la línea de presión en menos de 12 segundos.',
        equipment: ['Pizarra táctica de campo', 'Petos diferenciados'],
        tacticalPlayId: 'play-1'
      },
      {
        id: 'b2-3',
        title: 'Partido Condicionado 11v11 con Zonas Delimitadas',
        phase: 'Situación Real',
        durationMin: 25,
        targetRPE: 8,
        objective: 'Aplicar presión en bloque medio y transiciones rápidas.',
        description: 'Tres zonas marcadas con cinta. Los centrales no pueden ser presionados por más de un atacante.',
        equipment: ['Líneas de marcación']
      },
      {
        id: 'b2-4',
        title: 'Recuperación Activa & Hidratación',
        phase: 'Vuelta a la Calma',
        durationMin: 10,
        targetRPE: 2,
        objective: 'Monitoreo de sRPE individualizado post-sesión.',
        description: 'Caminata regenerativa y carga de datos en plataforma KineTactix.',
        equipment: ['Monitores táctiles']
      }
    ],
    attendees: INITIAL_ATHLETES.map(a => ({
      athleteId: a.id,
      status: a.status === 'injured' ? 'lesionado' : a.status === 'differentiation' ? 'diferenciado' : 'presente',
      individualRPE: a.status === 'ready' ? 7 : 5
    }))
  },
  {
    id: 'sess-3',
    title: 'Velocidad Máxima, Reacción & Balón Parado Ofensivo',
    date: '2026-09-26',
    dayType: 'MD-2',
    category: 'Velocidad & ABP',
    location: 'Cancha 2 - Área Táctica',
    durationTotalMin: 65,
    targetRPE: 6,
    plannedLoadAU: 390,
    completedLoadAU: 380,
    description: 'Bajo volumen y máxima intensidad neuromuscular (sprints de 10-25m con descansos completos >2 min) y automatización de jugadas de estrategia a balón parado.',
    blocks: [
      {
        id: 'b3-1',
        title: 'Juegos de Reacción Visual y Sprints Cortos',
        phase: 'Calentamiento',
        durationMin: 15,
        targetRPE: 6,
        objective: 'Estimulación del sistema nervioso central (SNC) y coordinación ocular-motora.',
        description: 'Sprints de 8m ante estímulos auditivos y visuales con cambio de dirección a 45°.',
        equipment: ['Conos de colores', 'Luces de reacción']
      },
      {
        id: 'b3-2',
        title: 'Ensayos de Balón Parado: Córners y Faltas Laterales',
        phase: 'Fase Principal',
        durationMin: 35,
        targetRPE: 5,
        objective: 'Mecanizar bloqueos legales y timing de entrada al remate.',
        description: 'Repetición de la Jugada 3 (Córner segundo palo) con barreras y oposición pasiva.',
        equipment: ['Siluetas defensivas inflables', 'Balones nuevos'],
        tacticalPlayId: 'play-3'
      },
      {
        id: 'b3-3',
        title: 'Rueda de Penales y Definiciones de Precisión',
        phase: 'Situación Real',
        durationMin: 10,
        targetRPE: 4,
        objective: 'Confianza y concentración en ejecución bajo presión.',
        description: 'Series de 5 penales por jugador con registro de eficacia.',
        equipment: ['Arcos oficiales']
      },
      {
        id: 'b3-4',
        title: 'Estiramientos Estáticos & Crioterapia',
        phase: 'Vuelta a la Calma',
        durationMin: 5,
        targetRPE: 2,
        objective: 'Descarga muscular.',
        description: 'Estiramientos en colchoneta y baños de contraste.',
        equipment: ['Bañeras de crioterapia']
      }
    ],
    attendees: INITIAL_ATHLETES.map(a => ({
      athleteId: a.id,
      status: a.status === 'injured' ? 'lesionado' : a.status === 'differentiation' ? 'diferenciado' : 'presente',
      individualRPE: 6
    }))
  },
  {
    id: 'sess-4',
    title: 'Activación Pre-Competitiva & Ajustes Tácticos Finales',
    date: '2026-09-27',
    dayType: 'MD-1',
    category: 'Activación Pre-partido',
    location: 'Estadio Principal',
    durationTotalMin: 45,
    targetRPE: 4,
    plannedLoadAU: 180,
    completedLoadAU: 175,
    description: 'Sesión muy breve de descarga ("tapering") orientada a afinar sensaciones con balón, velocidad de pase y repasar consignas del plan de partido.',
    blocks: [
      {
        id: 'b4-1',
        title: 'Rondo Recreativo 5v2 Dinámico',
        phase: 'Calentamiento',
        durationMin: 10,
        targetRPE: 4,
        objective: 'Clima distendido, concentración y toque rápido.',
        description: '2 toques obligatorios, cambios constantes de defensores.',
        equipment: ['Balones']
      },
      {
        id: 'b4-2',
        title: 'Charla Táctica en Pizarra & 11v0 Posicional',
        phase: 'Fase Principal',
        durationMin: 20,
        targetRPE: 4,
        objective: 'Visualización colectiva del planteo ante el rival de turno.',
        description: 'Recorrido de basculaciones y presión en bloque sin rival para ajustar distancias entre líneas (máximo 25 metros de profundidad).',
        equipment: ['Pizarra táctica interactiva KineTactix']
      },
      {
        id: 'b4-3',
        title: 'Definiciones de Primera Intención',
        phase: 'Situación Real',
        durationMin: 10,
        targetRPE: 5,
        objective: 'Buenas sensaciones de cara al arco para los delanteros.',
        description: 'Centros laterales con remates al primer toque.',
        equipment: ['Balones']
      },
      {
        id: 'b4-4',
        title: 'Movilidad Suave & Cierre de Concentración',
        phase: 'Vuelta a la Calma',
        durationMin: 5,
        targetRPE: 2,
        objective: 'Feedback individual del DT con cada deportista.',
        description: 'Cierre motivacional y entrega de pautas de descanso e hidratación.',
        equipment: []
      }
    ],
    attendees: INITIAL_ATHLETES.map(a => ({
      athleteId: a.id,
      status: a.status === 'injured' ? 'lesionado' : 'presente',
      individualRPE: 4
    }))
  }
];

export const INITIAL_DIRECTIVES: CoachDirective[] = [
  {
    id: 'dir-1',
    title: 'Consigna Táctica: Altura de la Línea Defensiva y Basculación',
    date: '2026-09-27',
    author: 'Prof. Carlos Bilardo',
    role: 'Director Técnico',
    targetGroup: 'Bloque Defensivo',
    priority: 'alta',
    tacticalFocus: 'Reducir espacio entre centrales a menos de 10 metros cuando el balón está en banda opuesta.',
    content: 'Atención centrales y laterales: Ante el equipo rival, cuando el balón va al lateral izquierdo de ellos, nuestro lateral derecho (Facundo) salta a presionar, y los dos centrales (Nicolás y Thiago) deben meterse 5 metros atrás de la línea de pase para cubrir la diagonal a la espalda. No quiero que nos filtren balones entre central y lateral.',
    replies: [
      {
        id: 'rep-1',
        authorName: 'Nicolás Carrizo',
        role: 'Jugador',
        text: 'Entendido profe. En el video vimos que ellos buscan mucho el desmarque del extremo a espaldas de Facundo. Ya coordinamos la cobertura con Mateo (arquero).',
        timestamp: '18:42'
      },
      {
        id: 'rep-2',
        authorName: 'Prof. Carlos Bilardo',
        role: 'DT',
        text: 'Excelente Nicolás. Mateo debe estar adelantado a la altura de la medialuna para cortar cualquier balón largo.',
        timestamp: '18:50'
      }
    ]
  },
  {
    id: 'dir-2',
    title: 'Monitoreo Físico: Protocolo de Crioterapia e Hidratación Post-MD-3',
    date: '2026-09-26',
    author: 'Lic. Mariano Werner',
    role: 'Preparador Físico',
    targetGroup: 'Plantel Completo',
    priority: 'media',
    tacticalFocus: 'Recuperación de glucógeno y prevención de microtraumatismos musculares.',
    content: 'Jugadores con RPE superior a 8 en la sesión de hoy (especialmente Thiago Almada y Bruno Costas): cumplir rigurosamente con los 8 minutos de inmersión en agua helada (10°C) y consumir el batido de recuperación proteico antes de los 45 minutos post-entrenamiento. Completar la encuesta de bienestar Hooper en la app antes de dormir.',
    replies: [
      {
        id: 'rep-3',
        authorName: 'Bruno Costas',
        role: 'Jugador',
        text: 'Profe, sentí el isquio derecho un poco cargado al final del 3v3. Ya hice hielo y elongación suave.',
        timestamp: '20:15'
      },
      {
        id: 'rep-4',
        authorName: 'Lic. Mariano Werner',
        role: 'PF',
        text: 'Anotado Bruno. Mañana en MD-2 hacés trabajo diferenciado con Kinesiología los primeros 25 minutos. No vamos a arriesgar.',
        timestamp: '20:22'
      }
    ]
  },
  {
    id: 'dir-3',
    title: 'Estrategia Ofensiva: Velocidad de Circulación en Salida de Presión',
    date: '2026-09-25',
    author: 'Prof. Carlos Bilardo',
    role: 'Director Técnico',
    targetGroup: 'Línea de Mediocampistas',
    priority: 'alta',
    tacticalFocus: 'Jugar a 2 toques máximo en el tercio medio.',
    content: 'Santiago (5) y Julián (8): Cuando el rival salte con doble presión alta, no retengan el balón de espalda. Toque de primera al lateral o descarga al arquero. Miren la animación en la pizarra táctica de la app: si Santiago atrae al volante rival, Enzo (10) queda completamente solo en el callejón central.',
    replies: [
      {
        id: 'rep-5',
        authorName: 'Santiago Morales',
        role: 'Jugador',
        text: 'Perfecto DT. Vi la simulación en la pizarra digital. Se ve clarísimo el espacio que deja su pivote si me muevo hacia la izquierda.',
        timestamp: '21:05'
      }
    ]
  }
];

export const INITIAL_WELLNESS_LOGS: WellnessEntry[] = [
  {
    id: 'w-1',
    athleteId: 'ath-1',
    athleteName: 'Mateo Rossi',
    date: '2026-09-27',
    sleepQuality: 6,
    fatigueLevel: 2,
    muscleSoreness: 2,
    stressLevel: 2,
    mood: 1,
    totalHooper: 9,
    comments: 'Dormí 8h30m continuas. Muy buenas sensaciones físicas.'
  },
  {
    id: 'w-2',
    athleteId: 'ath-4',
    athleteName: 'Thiago Almada',
    date: '2026-09-27',
    sleepQuality: 4,
    fatigueLevel: 5,
    muscleSoreness: 6,
    stressLevel: 4,
    mood: 3,
    totalHooper: 18,
    comments: 'Molestia en aductor al levantarme. Algo rígido.'
  },
  {
    id: 'w-3',
    athleteId: 'ath-10',
    athleteName: 'Bruno Costas',
    date: '2026-09-27',
    sleepQuality: 4,
    fatigueLevel: 5,
    muscleSoreness: 5,
    stressLevel: 3,
    mood: 3,
    totalHooper: 17,
    comments: 'Isquios cansados tras las series de aceleración de ayer.'
  },
  {
    id: 'w-4',
    athleteId: 'ath-6',
    athleteName: 'Santiago Morales',
    date: '2026-09-27',
    sleepQuality: 7,
    fatigueLevel: 2,
    muscleSoreness: 2,
    stressLevel: 1,
    mood: 1,
    totalHooper: 8,
    comments: 'Óptimo estado para el partido del fin de semana.'
  }
];

export const INITIAL_DRILLS: DrillPreset[] = [
  {
    id: 'drill-1',
    name: 'Rondo Posicional 4v4 + 3 Comodines (Cruyff)',
    category: 'Rondos & Posesión',
    durationMin: 20,
    suggestedRPE: 8,
    playersCount: '11 Jugadores',
    objective: 'Fijar defensores interiores y encontrar al hombre libre en el pasillo central.',
    keyCoachingPoints: [
      'Orientación del cuerpo antes de recibir',
      'Pase al pie más alejado de la presión',
      'Transición inmediata tras pérdida (<3 segundos)'
    ]
  },
  {
    id: 'drill-2',
    name: 'Transiciones Rápidas 3v2 con Repliegue Defensivo Activo',
    category: 'Transiciones',
    durationMin: 25,
    suggestedRPE: 8,
    playersCount: '12 Jugadores',
    objective: 'Finalizar la jugada en menos de 8 segundos aprovechando superioridad numérica.',
    keyCoachingPoints: [
      'Conducción agresiva hacia el defensor para fijar',
      'Apertura de carriles laterales',
      'Toma de decisión rápida entre pase o remate'
    ]
  },
  {
    id: 'drill-3',
    name: 'Circuito Neuromuscular de Potencia y Salto CMJ',
    category: 'Fuerza Neuromuscular',
    durationMin: 20,
    suggestedRPE: 7,
    playersCount: 'Plantel Completo',
    objective: 'Desarrollo de potencia excéntrico-concéntrica en tren inferior.',
    keyCoachingPoints: [
      'Amortiguación controlada en aterrizaje',
      'Alineación de rodillas con la punta de pies',
      'Máxima intención explosiva en cada repetición'
    ]
  },
  {
    id: 'drill-4',
    name: 'Juego de Posición 7v7 + 2 Porterías Reglamentarias',
    category: 'Juego de Posición',
    durationMin: 30,
    suggestedRPE: 9,
    playersCount: '14 Jugadores + 2 POR',
    objective: 'Generar ventajas numéricas y posicionales en campo de 60x50m.',
    keyCoachingPoints: [
      'Amplitud constante con laterales en bandas',
      'Movilidad escalonada de volantes interiores',
      'Equilibrio defensivo ante posibles contragolpes'
    ]
  }
];
