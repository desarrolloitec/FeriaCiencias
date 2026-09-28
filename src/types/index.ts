// TypeScript definitions for KineTactix Sports Training & Tactical System

export type SportType = 'futbol11' | 'futbolSala' | 'basquet';
export type PitchView = 'full' | 'half' | 'box';

export type TeamSide = 'home' | 'away' | 'ball' | 'cone' | 'goal';

export interface BoardElement {
  id: string;
  type: 'player' | 'ball' | 'cone' | 'goal';
  side: TeamSide;
  number?: string;
  name?: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  role?: string;
  color?: string;
}

export interface DrawingItem {
  id: string;
  type: 'arrow' | 'dashed' | 'curve' | 'zone' | 'text';
  points: Array<{ x: number; y: number }>;
  color: string;
  label?: string;
  width?: number;
}

export interface Keyframe {
  id: string;
  stepNumber: number;
  label: string;
  durationMs: number;
  elements: Record<string, { x: number; y: number; label?: string }>;
  drawings?: DrawingItem[];
}

export interface TacticalPlay {
  id: string;
  title: string;
  sport: SportType;
  pitchView: PitchView;
  category: 'Ofensiva' | 'Defensiva' | 'Transición' | 'Balón Parado (ABP)' | 'Presión y Recuperación';
  objective: string;
  description: string;
  durationSeconds: number;
  keyframes: Keyframe[];
  drawings: DrawingItem[];
  createdAt: string;
}

export type PlayerPosition = 'POR' | 'DEF' | 'MED' | 'DEL';
export type AthleteStatus = 'ready' | 'caution' | 'injured' | 'differentiation';

export interface PlayerStats {
  speed: number;       // 0-100
  endurance: number;   // 0-100
  tactical: number;    // 0-100
  passing: number;     // 0-100
  decision: number;    // 0-100
  strength: number;    // 0-100
}

export interface Athlete {
  id: string;
  number: number;
  name: string;
  position: PlayerPosition;
  positionLabel: string;
  age: number;
  heightCm: number;
  weightKg: number;
  status: AthleteStatus;
  statusNotes?: string;
  stats: PlayerStats;
  weeklyWorkloadAU: number; // Arbitrary Units (sRPE)
  chronicWorkloadAU: number;
  acwr: number; // Acute to Chronic Workload Ratio
  wellnessScore: number; // Hooper score 1-28 (lower = better)
  attendanceRate: number; // percentage 0-100
  avatarInitials: string;
  avatarColor: string;
}

export interface TrainingBlock {
  id: string;
  title: string;
  phase: 'Calentamiento' | 'Fase Principal' | 'Situación Real' | 'Vuelta a la Calma';
  durationMin: number;
  targetRPE: number; // 1 to 10
  objective: string;
  description: string;
  tacticalPlayId?: string;
  equipment: string[];
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  dayType: 'MD-4' | 'MD-3' | 'MD-2' | 'MD-1' | 'MD' | 'MD+1' | 'MD+2';
  category: 'Físico-Táctico' | 'Fuerza & Tensión' | 'Velocidad & ABP' | 'Activación Pre-partido' | 'Recuperación';
  location: string;
  durationTotalMin: number;
  targetRPE: number;
  plannedLoadAU: number;
  completedLoadAU?: number;
  description: string;
  blocks: TrainingBlock[];
  attendees: Array<{
    athleteId: string;
    status: 'presente' | 'diferenciado' | 'lesionado' | 'ausente';
    individualRPE?: number;
    feedback?: string;
  }>;
}

export interface WellnessEntry {
  id: string;
  athleteId: string;
  athleteName: string;
  date: string;
  sleepQuality: number; // 1 (muy malo) - 7 (excelente)
  fatigueLevel: number; // 1 (muy baja) - 7 (extrema)
  muscleSoreness: number; // 1 (ninguno) - 7 (muy adolorido)
  stressLevel: number; // 1 (muy relajado) - 7 (muy estresado)
  mood: number; // 1 (excelente) - 7 (muy irritable)
  totalHooper: number; // Sum
  comments?: string;
}

export interface CoachDirective {
  id: string;
  title: string;
  date: string;
  author: string;
  role: 'Director Técnico' | 'Preparador Físico' | 'Analista de Rendimiento' | 'Médico Deportólogo';
  targetGroup: 'Plantel Completo' | 'Bloque Defensivo' | 'Línea de Mediocampistas' | 'Delanteros' | 'Arqueros';
  priority: 'alta' | 'media' | 'baja';
  content: string;
  tacticalFocus: string;
  replies: Array<{
    id: string;
    authorName: string;
    role: 'Jugador' | 'DT' | 'PF';
    text: string;
    timestamp: string;
  }>;
}

export interface DrillPreset {
  id: string;
  name: string;
  category: 'Rondos & Posesión' | 'Transiciones' | 'Finalización' | 'Juego de Posición' | 'Fuerza Neuromuscular';
  durationMin: number;
  suggestedRPE: number;
  playersCount: string;
  objective: string;
  keyCoachingPoints: string[];
}
