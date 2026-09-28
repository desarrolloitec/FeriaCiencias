import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Users,
  Target,
  Zap,
  Award,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Athlete, PlayerPosition } from '../../types';
import { INITIAL_ATHLETES } from '../../data/mockData';
import { generateRadarPolygon, getRadarAxisPoint, evaluateACWR } from '../../utils/sportsMath';

export const MetricsModule: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(INITIAL_ATHLETES);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(INITIAL_ATHLETES[5].id); // Santiago Morales (Pivote)
  const [filterPosition, setFilterPosition] = useState<string>('all');

  const selectedAthlete = athletes.find(a => a.id === selectedAthleteId) || athletes[0];

  const filteredAthletes = athletes.filter(a => {
    if (filterPosition === 'all') return true;
    return a.position === filterPosition;
  });

  // Calculate team aggregate metrics
  const totalWeeklyLoad = athletes.reduce((acc, a) => acc + a.weeklyWorkloadAU, 0);
  const avgACWR = athletes.reduce((acc, a) => acc + a.acwr, 0) / athletes.length;
  const readyAthletes = athletes.filter(a => a.status === 'ready').length;
  const availabilityRate = ((readyAthletes / athletes.length) * 100).toFixed(1);

  // Radar metrics keys and labels
  const radarAxes = [
    { key: 'speed', label: 'Velocidad' },
    { key: 'endurance', label: 'Resistencia' },
    { key: 'tactical', label: 'Táctica' },
    { key: 'passing', label: 'Pase' },
    { key: 'decision', label: 'Decisión' },
    { key: 'strength', label: 'Fuerza' }
  ];

  const athleteValues = radarAxes.map(axis => selectedAthlete.stats[axis.key as keyof typeof selectedAthlete.stats]);
  const radarPolygonPoints = generateRadarPolygon(athleteValues, 100, 100, 70);

  // Position averages for benchmark comparison
  const posAthletes = athletes.filter(a => a.position === selectedAthlete.position);
  const posAvgValues = radarAxes.map(axis => {
    const sum = posAthletes.reduce((acc, a) => acc + a.stats[axis.key as keyof typeof a.stats], 0);
    return Math.round(sum / posAthletes.length);
  });
  const posAvgPolygonPoints = generateRadarPolygon(posAvgValues, 100, 100, 70);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Carga Semanal Grupal</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl font-bold text-white">{totalWeeklyLoad.toLocaleString()}</span>
            <span className="text-xs text-slate-500">AU</span>
          </div>
          <span className="text-[11px] text-emerald-400">Dentro del rango planificado</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Ratio ACWR Medio Plantel</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl font-bold text-emerald-400">{avgACWR.toFixed(2)}</span>
            <span className="text-xs text-slate-500">Gabbett</span>
          </div>
          <span className="text-[11px] text-emerald-400">Zona Óptima ("Sweet Spot")</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Disponibilidad Plantilla</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl font-bold text-white">{availabilityRate}%</span>
            <span className="text-xs text-slate-500">({readyAthletes}/{athletes.length})</span>
          </div>
          <span className="text-[11px] text-slate-400">1 baja kinesiológica · 2 alertas</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Cumplimiento Asistencia</span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl font-bold text-white">97.8%</span>
            <span className="text-xs text-slate-500">Microciclo</span>
          </div>
          <span className="text-[11px] text-emerald-400">Compromiso óptimo</span>
        </div>
      </div>

      {/* Main Analysis Section: Radar Chart + Athlete Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart & Athlete Profile (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Perfil Técnico-Táctico</div>
              <h3 className="text-base font-bold text-white">{selectedAthlete.name}</h3>
              <span className="text-xs text-slate-400 font-mono">#{selectedAthlete.number} · {selectedAthlete.positionLabel}</span>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedAthlete.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow`}>
              {selectedAthlete.avatarInitials}
            </div>
          </div>

          {/* SVG Radar Chart */}
          <div className="relative w-full aspect-square flex items-center justify-center bg-slate-950/70 rounded-xl p-2 border border-slate-800">
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[280px]">
              {/* Concentric reference polygons (25, 50, 75, 100%) */}
              {[25, 50, 75, 100].map(level => {
                const dummyVals = Array(6).fill(level);
                const poly = generateRadarPolygon(dummyVals, 100, 100, 70);
                return (
                  <polygon
                    key={level}
                    points={poly}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="0.8"
                    strokeDasharray={level === 100 ? undefined : '2,2'}
                  />
                );
              })}

              {/* Axis lines */}
              {radarAxes.map((_, i) => {
                const pt = getRadarAxisPoint(i, 6, 100, 100, 70);
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={pt.x}
                    y2={pt.y}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Position Average Polygon (Slate/Dashed) */}
              <polygon
                points={posAvgPolygonPoints}
                fill="none"
                stroke="rgba(148, 163, 184, 0.5)"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />

              {/* Athlete Value Polygon (Emerald Highlight) */}
              <polygon
                points={radarPolygonPoints}
                fill="rgba(16, 185, 129, 0.25)"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Data points */}
              {athleteValues.map((val, i) => {
                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                const r = (val / 100) * 70;
                const cx = 100 + r * Math.cos(angle);
                const cy = 100 + r * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    fill="#10b981"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Axis text labels */}
              {radarAxes.map((axis, i) => {
                const pt = getRadarAxisPoint(i, 6, 100, 100, 85);
                return (
                  <text
                    key={axis.key}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#cbd5e1"
                    fontSize="7.5"
                    fontWeight="600"
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Radar Legend */}
          <div className="flex items-center justify-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>{selectedAthlete.name.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <span className="w-2.5 h-0.5 bg-slate-400"></span>
              <span>Media ({selectedAthlete.position})</span>
            </div>
          </div>

          {/* Stats Bar List */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {radarAxes.map(axis => {
              const val = selectedAthlete.stats[axis.key as keyof typeof selectedAthlete.stats];
              return (
                <div key={axis.key} className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400 font-sans">{axis.label}:</span>
                  <span className="text-white font-bold">{val} / 100</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Squad Comparison & Physical Testing Benchmarks (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Comparativa de Rendimiento del Plantel</h3>
                <p className="text-xs text-slate-400">Filtra por línea posicional para auditar homogeneidad física</p>
              </div>

              {/* Segmented position filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {['all', 'POR', 'DEF', 'MED', 'DEL'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => setFilterPosition(pos)}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      filterPosition === pos
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {pos === 'all' ? 'Todos' : pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Athlete Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredAthletes.map(ath => {
                const isSelected = ath.id === selectedAthleteId;
                const acwrInfo = evaluateACWR(ath.acwr);

                return (
                  <div
                    key={ath.id}
                    onClick={() => setSelectedAthleteId(ath.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                          {ath.number}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-100">{ath.name}</div>
                          <div className="text-[10px] text-slate-400">{ath.positionLabel}</div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${acwrInfo.badgeBg} ${acwrInfo.colorClass}`}>
                        ACWR {ath.acwr.toFixed(2)}
                      </span>
                    </div>

                    {/* Progress bars of key indicators */}
                    <div className="flex flex-col gap-1.5 text-[11px] font-mono pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-sans">Velocidad / Sprint:</span>
                        <span className="text-slate-200">{ath.stats.speed}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-400 h-full rounded-full" style={{ width: `${ath.stats.speed}%` }}></div>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-sans">Resistencia Aeróbica:</span>
                        <span className="text-slate-200">{ath.stats.endurance}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${ath.stats.endurance}%` }}></div>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-sans">Índice Táctico:</span>
                        <span className="text-slate-200">{ath.stats.tactical}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-400 h-full rounded-full" style={{ width: `${ath.stats.tactical}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
