// Sports Science mathematical formulas & helpers

/**
 * Foster Session RPE (sRPE)
 * Internal Load in Arbitrary Units (AU) = RPE (1-10) * Duration (minutes)
 */
export function calculateFosterSRPE(rpe: number, durationMinutes: number): number {
  return Math.round(rpe * durationMinutes);
}

/**
 * Acute:Chronic Workload Ratio (ACWR)
 * ACWR = Acute Workload (7-day total) / Chronic Workload (average weekly load over past 28 days)
 *
 * Interpretation based on Gabbett (2016):
 * - < 0.8: Under-training / High relative injury risk upon return
 * - 0.8 - 1.3: "Sweet Spot" (Optimal conditioning, lowest injury risk)
 * - 1.3 - 1.5: Caution Zone (Moderate overload danger)
 * - > 1.5: Danger Zone (Spike in workload, elevated injury probability ~2-4x)
 */
export interface AcwrEvaluation {
  ratio: number;
  status: 'under' | 'optimal' | 'caution' | 'danger';
  label: string;
  colorClass: string;
  badgeBg: string;
  description: string;
  recommendation: string;
}

export function evaluateACWR(acwr: number): AcwrEvaluation {
  const rounded = Number(acwr.toFixed(2));
  if (rounded < 0.8) {
    return {
      ratio: rounded,
      status: 'under',
      label: 'Sub-entrenamiento (< 0.8)',
      colorClass: 'text-amber-400',
      badgeBg: 'bg-amber-950/60 border-amber-800/60',
      description: 'Carga aguda significativamente inferior a la crónica. Posible pérdida de capacidad física o retorno post-receso.',
      recommendation: 'Incrementar la carga de forma progresiva (≤ 10-15% semanal) para evitar picos abruptos.'
    };
  }
  if (rounded <= 1.3) {
    return {
      ratio: rounded,
      status: 'optimal',
      label: 'Sweet Spot (0.8 - 1.3)',
      colorClass: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 border-emerald-800/60',
      description: 'Zona óptima de adaptación física y acondicionamiento con la menor tasa estadística de lesiones.',
      recommendation: 'Mantener la progresión planificada. El deportista está fisiológicamente protegido y en estado competitivo.'
    };
  }
  if (rounded <= 1.5) {
    return {
      ratio: rounded,
      status: 'caution',
      label: 'Zona de Alerta (1.3 - 1.5)',
      colorClass: 'text-orange-400',
      badgeBg: 'bg-orange-950/60 border-orange-800/60',
      description: 'Carga aguda en aumento moderado. Riesgo de acumulación de fatiga neuromuscular residual.',
      recommendation: 'Monitorear marcadores de recuperación (Hooper/DOMS). Moderar volumen en sesiones de alta intensidad.'
    };
  }
  return {
    ratio: rounded,
    status: 'danger',
    label: 'Zona de Peligro (> 1.5)',
    colorClass: 'text-rose-400',
    badgeBg: 'bg-rose-950/60 border-rose-800/60',
    description: 'Pico agudo excesivo ("Workload Spike"). Probabilidad de lesión incrementada significativamente.',
    recommendation: 'Intervención inmediata: Reducir minutos de juego o planificar descarga activa con kinesiología.'
  };
}

/**
 * Hooper & Mackinnon Index interpretation (sum of 4-5 dimensions)
 * Lower scores = better readiness; higher = residual fatigue
 */
export function interpretHooperScore(score: number): { label: string; status: 'good' | 'moderate' | 'poor' } {
  if (score <= 12) return { label: 'Excelente recuperación', status: 'good' };
  if (score <= 18) return { label: 'Fatiga moderada normal', status: 'moderate' };
  return { label: 'Alerta de sobrecarga / fatiga alta', status: 'poor' };
}

/**
 * Radar Chart SVG Points Generator
 * Center at (cx, cy) with radius r, angles distributed uniformly.
 */
export function generateRadarPolygon(
  values: number[], // 0 to 100
  cx: number = 100,
  cy: number = 100,
  r: number = 75
): string {
  const count = values.length;
  if (count === 0) return '';
  return values
    .map((val, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const normalizedR = (val / 100) * r;
      const x = cx + normalizedR * Math.cos(angle);
      const y = cy + normalizedR * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function getRadarAxisPoint(
  index: number,
  total: number,
  cx: number = 100,
  cy: number = 100,
  r: number = 75
): { x: number; y: number } {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

/**
 * Linear & Smooth interpolation for tactical animation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * CSV Exporter for Coaching Staff
 */
export function exportToCSV(filename: string, rows: Record<string, string | number>[]): void {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
