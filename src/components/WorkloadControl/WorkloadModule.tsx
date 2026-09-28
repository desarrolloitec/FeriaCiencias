import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  HeartPulse,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Plus,
  Moon,
  Zap,
  Info
} from 'lucide-react';
import { Athlete, WellnessEntry, TrainingSession } from '../../types';
import { INITIAL_ATHLETES, INITIAL_WELLNESS_LOGS, INITIAL_TRAINING_SESSIONS } from '../../data/mockData';
import { evaluateACWR, interpretHooperScore, calculateFosterSRPE } from '../../utils/sportsMath';

export const WorkloadModule: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(INITIAL_ATHLETES);
  const [wellnessLogs, setWellnessLogs] = useState<WellnessEntry[]>(INITIAL_WELLNESS_LOGS);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(INITIAL_ATHLETES[3].id); // Thiago Almada (caution)
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [showFormulaInfo, setShowFormulaInfo] = useState<boolean>(false);

  // Wellness survey form state
  const [surveyData, setSurveyData] = useState({
    athleteId: INITIAL_ATHLETES[0].id,
    sleepQuality: 5,
    fatigueLevel: 3,
    muscleSoreness: 3,
    stressLevel: 2,
    mood: 2,
    comments: ''
  });

  const selectedAthlete = athletes.find(a => a.id === selectedAthleteId) || athletes[0];
  const acwrEval = evaluateACWR(selectedAthlete.acwr);

  // Toggle athlete status
  const handleUpdateStatus = (
    athleteId: string,
    newStatus: 'ready' | 'caution' | 'injured' | 'differentiation'
  ) => {
    setAthletes(prev =>
      prev.map(a => (a.id === athleteId ? { ...a, status: newStatus } : a))
    );
  };

  // Submit new Hooper survey
  const handleSaveSurvey = () => {
    const totalHooper =
      surveyData.sleepQuality +
      surveyData.fatigueLevel +
      surveyData.muscleSoreness +
      surveyData.stressLevel +
      surveyData.mood;

    const athleteObj = athletes.find(a => a.id === surveyData.athleteId);

    const newEntry: WellnessEntry = {
      id: `w-${Date.now()}`,
      athleteId: surveyData.athleteId,
      athleteName: athleteObj?.name || 'Deportista',
      date: new Date().toISOString().split('T')[0],
      sleepQuality: surveyData.sleepQuality,
      fatigueLevel: surveyData.fatigueLevel,
      muscleSoreness: surveyData.muscleSoreness,
      stressLevel: surveyData.stressLevel,
      mood: surveyData.mood,
      totalHooper,
      comments: surveyData.comments
    };

    setWellnessLogs([newEntry, ...wellnessLogs]);

    // Update athlete wellness score
    setAthletes(prev =>
      prev.map(a => (a.id === surveyData.athleteId ? { ...a, wellnessScore: totalHooper } : a))
    );

    setIsSurveyModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner with Scientific Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Control de Carga & Prevención de Lesiones</span>
              <span>·</span>
              <span>Modelo Matemático ACWR de Tim Gabbett & RPE de Foster</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Monitoreo Fisiológico y Ratio Agudo:Crónico</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormulaInfo(!showFormulaInfo)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Fundamento ACWR</span>
            </button>
            <button
              onClick={() => setIsSurveyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Cargar Test de Bienestar (Hooper)</span>
            </button>
          </div>
        </div>

        {/* Conceptual Rigor Popout */}
        {showFormulaInfo && (
          <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong className="text-emerald-400 font-semibold block mb-1">
                Fórmula del Ratio Carga Aguda:Crónica (ACWR)
              </strong>
              <p>
                Propuesto por el Dr. Tim Gabbett (2016, British Journal of Sports Medicine):
                <code className="block mt-1 font-mono text-emerald-300 bg-slate-900 p-2 rounded border border-slate-800">
                  ACWR = Carga Aguda (7 días) / Media Semanal de Carga Crónica (28 días)
                </code>
                Cuando el ratio se ubica en el rango de <strong>0.8 a 1.3 ("Sweet Spot")</strong>, el deportista
                desarrolla tolerancia a la fatiga con la menor probabilidad estadística de lesión. Un ratio &gt; 1.5
                multiplica el riesgo de lesión de 2 a 4 veces ("Workload Spike").
              </p>
            </div>
            <div>
              <strong className="text-amber-400 font-semibold block mb-1">
                Cuantificación de Carga Interna (Foster sRPE)
              </strong>
              <p>
                Validado por Carl Foster (2001):
                <code className="block mt-1 font-mono text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
                  Carga de Sesión (AU) = Duración (minutos) × RPE de Borg (escala 1 a 10)
                </code>
                Permite integrar la exigencia biomecánica y fisiológica global percibida por el atleta, detectando
                respuestas individuales a una misma carga externa.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Squad Readiness Table + Individual Athlete Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Squad Attendance & Workload Table (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Plantilla: Asistencia y Carga Semanal</h3>
                <p className="text-xs text-slate-400">Haz clic en cualquier deportista para auditar su perfil biomecánico</p>
              </div>
              <span className="text-xs font-mono text-slate-400">Total: {athletes.length} Jugadores</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Deportista</th>
                    <th className="py-2.5 px-2">Pos</th>
                    <th className="py-2.5 px-3 text-right">Carga Semanal</th>
                    <th className="py-2.5 px-3 text-center">ACWR (Gabbett)</th>
                    <th className="py-2.5 px-3 text-center">Bienestar (Hooper)</th>
                    <th className="py-2.5 px-3 text-center">Disponibilidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {athletes.map(ath => {
                    const isSelected = ath.id === selectedAthleteId;
                    const evalObj = evaluateACWR(ath.acwr);
                    const hooper = interpretHooperScore(ath.wellnessScore);

                    return (
                      <tr
                        key={ath.id}
                        onClick={() => setSelectedAthleteId(ath.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-800/90' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-3 font-sans">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 text-[11px] font-bold flex items-center justify-center font-mono">
                              {ath.number}
                            </span>
                            <div>
                              <div className="font-semibold text-slate-100">{ath.name}</div>
                              <div className="text-[10px] text-slate-400">{ath.positionLabel}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2 text-slate-300 font-semibold">{ath.position}</td>

                        <td className="py-3 px-3 text-right text-slate-200">
                          <span>{ath.weeklyWorkloadAU}</span>
                          <span className="text-[10px] text-slate-500 ml-1">AU</span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${evalObj.badgeBg} ${evalObj.colorClass}`}>
                            {ath.acwr.toFixed(2)}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className={`text-[11px] font-bold ${
                            hooper.status === 'good' ? 'text-emerald-400' :
                            hooper.status === 'moderate' ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                            {ath.wellnessScore} pts
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center font-sans">
                          <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded ${
                            ath.status === 'ready' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800' :
                            ath.status === 'caution' ? 'bg-amber-950/70 text-amber-300 border border-amber-800' :
                            ath.status === 'injured' ? 'bg-rose-950/70 text-rose-300 border border-rose-800' :
                            'bg-indigo-950/70 text-indigo-300 border border-indigo-800'
                          }`}>
                            {ath.status === 'ready' ? 'Disponible' :
                             ath.status === 'caution' ? 'Alerta Fatiga' :
                             ath.status === 'injured' ? 'Lesionado' : 'Diferenciado'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Individual Athlete Workload Dossier (1 Col) */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedAthlete.avatarColor} text-white font-bold flex items-center justify-center text-base shadow`}>
                {selectedAthlete.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{selectedAthlete.name}</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">#{selectedAthlete.number}</span>
                </div>
                <div className="text-xs text-slate-400">{selectedAthlete.positionLabel} · {selectedAthlete.age} años</div>
              </div>
            </div>

            {/* ACWR Visual Meter */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Índice ACWR Agudo:Crónico:</span>
                <span className={`font-mono text-lg font-bold ${acwrEval.colorClass}`}>
                  {selectedAthlete.acwr.toFixed(2)}
                </span>
              </div>

              {/* Multi-colored Progress Bar */}
              <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                {/* 0.0 to 0.8: Under-training */}
                <div className="w-[35%] h-full bg-amber-500/70 border-r border-slate-900" title="Sub-entrenamiento (<0.8)"></div>
                {/* 0.8 to 1.3: Sweet Spot */}
                <div className="w-[35%] h-full bg-emerald-500 border-r border-slate-900" title="Sweet Spot (0.8 - 1.3)"></div>
                {/* 1.3 to 1.5: Caution */}
                <div className="w-[15%] h-full bg-orange-500 border-r border-slate-900" title="Alerta (1.3 - 1.5)"></div>
                {/* > 1.5: Danger */}
                <div className="w-[15%] h-full bg-rose-600" title="Peligro (>1.5)"></div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.0</span>
                <span>0.8</span>
                <span className="text-emerald-400 font-bold">1.3</span>
                <span>1.5</span>
                <span>2.0+</span>
              </div>

              <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${acwrEval.badgeBg}`}>
                <div className={`font-bold ${acwrEval.colorClass} mb-1 flex items-center gap-1`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {acwrEval.label}
                </div>
                <p className="text-slate-300">{acwrEval.description}</p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 text-slate-200">
                  <strong className="text-white">Acción recomendada:</strong> {acwrEval.recommendation}
                </div>
              </div>
            </div>

            {/* Quick Readiness Actions */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Asignar Estado de Disponibilidad
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleUpdateStatus(selectedAthlete.id, 'ready')}
                  className={`p-2 rounded-lg border font-medium transition-colors ${
                    selectedAthlete.status === 'ready'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ✓ Disponible (Apto)
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAthlete.id, 'caution')}
                  className={`p-2 rounded-lg border font-medium transition-colors ${
                    selectedAthlete.status === 'caution'
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ⚠ Alerta Fatiga
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAthlete.id, 'differentiation')}
                  className={`p-2 rounded-lg border font-medium transition-colors ${
                    selectedAthlete.status === 'differentiation'
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ⚡ Diferenciado
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAthlete.id, 'injured')}
                  className={`p-2 rounded-lg border font-medium transition-colors ${
                    selectedAthlete.status === 'injured'
                      ? 'bg-rose-950 text-rose-300 border-rose-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ✕ Lesionado / Baja
                </button>
              </div>
            </div>

            {/* Status notes if any */}
            {selectedAthlete.statusNotes && (
              <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-lg text-xs text-amber-300">
                <strong>Nota Kinesiológica:</strong> {selectedAthlete.statusNotes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wellness Modal Form */}
      {isSurveyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-emerald-400" />
              Test de Bienestar & Fatiga (Escala Hooper)
            </h3>
            <p className="text-xs text-slate-400">
              Evaluación psicofisiológica previa a la sesión. Escala de 1 (óptimo) a 7 (severo/extremo).
            </p>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Seleccionar Deportista:</label>
                <select
                  value={surveyData.athleteId}
                  onChange={e => setSurveyData({ ...surveyData, athleteId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                >
                  {athletes.map(a => (
                    <option key={a.id} value={a.id}>
                      #{a.number} - {a.name} ({a.positionLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* 5 Hooper sliders */}
              <div className="flex flex-col gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">1. Calidad de Sueño (1 descanso óptimo - 7 insomnio):</span>
                  <span className="font-mono font-bold text-emerald-400">{surveyData.sleepQuality}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={surveyData.sleepQuality}
                  onChange={e => setSurveyData({ ...surveyData, sleepQuality: Number(e.target.value) })}
                  className="accent-emerald-400"
                />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">2. Nivel de Fatiga General (1 fresca - 7 agotado):</span>
                  <span className="font-mono font-bold text-amber-400">{surveyData.fatigueLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={surveyData.fatigueLevel}
                  onChange={e => setSurveyData({ ...surveyData, fatigueLevel: Number(e.target.value) })}
                  className="accent-amber-400"
                />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">3. Dolor Muscular / DOMS (1 sin dolor - 7 muy adolorido):</span>
                  <span className="font-mono font-bold text-rose-400">{surveyData.muscleSoreness}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={surveyData.muscleSoreness}
                  onChange={e => setSurveyData({ ...surveyData, muscleSoreness: Number(e.target.value) })}
                  className="accent-rose-400"
                />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">4. Nivel de Estrés / Tensión (1 relajado - 7 muy estresado):</span>
                  <span className="font-mono font-bold text-sky-400">{surveyData.stressLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={surveyData.stressLevel}
                  onChange={e => setSurveyData({ ...surveyData, stressLevel: Number(e.target.value) })}
                  className="accent-sky-400"
                />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">5. Estado de Ánimo (1 muy positivo - 7 irritado/decaído):</span>
                  <span className="font-mono font-bold text-indigo-400">{surveyData.mood}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={surveyData.mood}
                  onChange={e => setSurveyData({ ...surveyData, mood: Number(e.target.value) })}
                  className="accent-indigo-400"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium mb-1 block">Comentarios del Atleta (opcional):</label>
                <input
                  type="text"
                  placeholder="Ej: Piernas pesadas por las series de sprint..."
                  value={surveyData.comments}
                  onChange={e => setSurveyData({ ...surveyData, comments: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsSurveyModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSurvey}
                className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
              >
                Registrar Test Hooper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
