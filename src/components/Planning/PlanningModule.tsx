import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Activity,
  Plus,
  Dumbbell,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { TrainingSession, TrainingBlock, DrillPreset, TacticalPlay } from '../../types';
import { INITIAL_TRAINING_SESSIONS, INITIAL_DRILLS, INITIAL_TACTICAL_PLAYS } from '../../data/mockData';
import { calculateFosterSRPE } from '../../utils/sportsMath';

interface PlanningModuleProps {
  onSelectTacticalPlay?: (playId: string) => void;
}

export const PlanningModule: React.FC<PlanningModuleProps> = ({ onSelectTacticalPlay }) => {
  const [sessions, setSessions] = useState<TrainingSession[]>(INITIAL_TRAINING_SESSIONS);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(INITIAL_TRAINING_SESSIONS[0].id);
  const [drillLibrary, setDrillLibrary] = useState<DrillPreset[]>(INITIAL_DRILLS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddingBlock, setIsAddingBlock] = useState<boolean>(false);
  const [isCreatingSession, setIsCreatingSession] = useState<boolean>(false);

  // New block form state
  const [newBlock, setNewBlock] = useState<Partial<TrainingBlock>>({
    title: '',
    phase: 'Fase Principal',
    durationMin: 20,
    targetRPE: 7,
    objective: '',
    description: '',
    equipment: ['Balones']
  });

  // New session modal form state
  const [newSession, setNewSession] = useState<Partial<TrainingSession>>({
    title: '',
    dayType: 'MD-3',
    category: 'Físico-Táctico',
    location: 'Cancha Principal',
    durationTotalMin: 75,
    targetRPE: 7,
    description: ''
  });

  const activeSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  // Handle adding block to current session
  const handleAddBlockToSession = () => {
    if (!newBlock.title) return;
    const block: TrainingBlock = {
      id: `blk-${Date.now()}`,
      title: newBlock.title || 'Bloque Técnico',
      phase: newBlock.phase || 'Fase Principal',
      durationMin: Number(newBlock.durationMin) || 20,
      targetRPE: Number(newBlock.targetRPE) || 7,
      objective: newBlock.objective || '',
      description: newBlock.description || '',
      equipment: newBlock.equipment || ['Balones']
    };

    setSessions(prev =>
      prev.map(s => {
        if (s.id !== selectedSessionId) return s;
        const updatedBlocks = [...s.blocks, block];
        const totalDuration = updatedBlocks.reduce((acc, b) => acc + b.durationMin, 0);
        return {
          ...s,
          durationTotalMin: totalDuration,
          plannedLoadAU: calculateFosterSRPE(s.targetRPE, totalDuration),
          blocks: updatedBlocks
        };
      })
    );

    setIsAddingBlock(false);
    setNewBlock({
      title: '',
      phase: 'Fase Principal',
      durationMin: 20,
      targetRPE: 7,
      objective: '',
      description: '',
      equipment: ['Balones']
    });
  };

  // Add drill from library as a session block
  const handleAddDrillAsBlock = (drill: DrillPreset) => {
    const block: TrainingBlock = {
      id: `blk-drill-${Date.now()}`,
      title: drill.name,
      phase: 'Fase Principal',
      durationMin: drill.durationMin,
      targetRPE: drill.suggestedRPE,
      objective: drill.objective,
      description: `Puntos de entrenamiento clave: ${drill.keyCoachingPoints.join(' · ')}`,
      equipment: ['Balones', 'Conos']
    };

    setSessions(prev =>
      prev.map(s => {
        if (s.id !== selectedSessionId) return s;
        const updatedBlocks = [...s.blocks, block];
        const totalDuration = updatedBlocks.reduce((acc, b) => acc + b.durationMin, 0);
        return {
          ...s,
          durationTotalMin: totalDuration,
          plannedLoadAU: calculateFosterSRPE(s.targetRPE, totalDuration),
          blocks: updatedBlocks
        };
      })
    );
  };

  // Create new session
  const handleCreateSession = () => {
    if (!newSession.title) return;
    const created: TrainingSession = {
      id: `sess-${Date.now()}`,
      title: newSession.title,
      date: new Date().toISOString().split('T')[0],
      dayType: newSession.dayType || 'MD-3',
      category: newSession.category || 'Físico-Táctico',
      location: newSession.location || 'Predio Deportivo',
      durationTotalMin: Number(newSession.durationTotalMin) || 75,
      targetRPE: Number(newSession.targetRPE) || 7,
      plannedLoadAU: calculateFosterSRPE(Number(newSession.targetRPE) || 7, Number(newSession.durationTotalMin) || 75),
      description: newSession.description || 'Sesión de entrenamiento planificada.',
      blocks: [
        {
          id: `b-${Date.now()}-1`,
          title: 'Activación y Calentamiento',
          phase: 'Calentamiento',
          durationMin: 15,
          targetRPE: 5,
          objective: 'Puesta a punto neuromuscular.',
          description: 'Movilidad articular y técnica de pase.',
          equipment: ['Conos', 'Balones']
        },
        {
          id: `b-${Date.now()}-2`,
          title: 'Fase Principal Técnico-Táctica',
          phase: 'Fase Principal',
          durationMin: 45,
          targetRPE: Number(newSession.targetRPE) || 7,
          objective: 'Desarrollo de los objetivos tácticos de la semana.',
          description: 'Situaciones de juego y tareas reducidas.',
          equipment: ['Petos', 'Balones']
        },
        {
          id: `b-${Date.now()}-3`,
          title: 'Vuelta a la Calma',
          phase: 'Vuelta a la Calma',
          durationMin: 15,
          targetRPE: 3,
          objective: 'Regeneración y estiramientos.',
          description: 'Trote suave y foam roller.',
          equipment: ['Colchonetas']
        }
      ],
      attendees: []
    };

    setSessions([created, ...sessions]);
    setSelectedSessionId(created.id);
    setIsCreatingSession(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Weekly Microcycle Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Microciclo Competitivo</span>
              <span>·</span>
              <span>Distribución de Cargas Físicas & Tácticas</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Planificación de Rutinas y Sesiones</h2>
          </div>

          <button
            onClick={() => setIsCreatingSession(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Planificar Nueva Sesión
          </button>
        </div>

        {/* Microcycle Day Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {sessions.map(s => {
            const isSelected = s.id === selectedSessionId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSessionId(s.id)}
                className={`flex flex-col p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                    s.dayType === 'MD-4' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    s.dayType === 'MD-3' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    s.dayType === 'MD-2' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {s.dayType}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono">{s.date.split('-').slice(1).join('/')}</span>
                </div>
                <span className="text-xs font-semibold text-slate-200 line-clamp-1">{s.title}</span>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{s.durationTotalMin} min</span>
                  <span className="text-emerald-400 font-semibold">{s.plannedLoadAU} AU</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Active Session Detail & Drill Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Session Detailed Structure (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="font-mono text-emerald-400 font-semibold">{activeSession.dayType}</span>
                  <span>·</span>
                  <span>{activeSession.category}</span>
                  <span>·</span>
                  <span>{activeSession.location}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{activeSession.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeSession.description}</p>
              </div>

              {/* Load summary badge */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Carga Planificada</div>
                  <div className="text-base font-bold font-mono text-emerald-400">{activeSession.plannedLoadAU} AU</div>
                </div>
                <div className="h-7 w-[1px] bg-slate-800"></div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">RPE Objetivo</div>
                  <div className="text-base font-bold font-mono text-amber-400">{activeSession.targetRPE} / 10</div>
                </div>
              </div>
            </div>

            {/* Blocks List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Bloques Estructurados ({activeSession.blocks.length})
                </span>
                <button
                  onClick={() => setIsAddingBlock(!isAddingBlock)}
                  className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Bloque Personalizado
                </button>
              </div>

              {/* Add Block Drawer/Form */}
              {isAddingBlock && (
                <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-lg flex flex-col gap-3">
                  <span className="text-xs font-bold text-emerald-400">Nuevo Bloque de Entrenamiento</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Título del ejercicio o bloque..."
                      value={newBlock.title}
                      onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
                      className="sm:col-span-2 bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <select
                      value={newBlock.phase}
                      onChange={e => setNewBlock({ ...newBlock, phase: e.target.value as any })}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-lg p-2 focus:outline-none"
                    >
                      <option value="Calentamiento">Calentamiento</option>
                      <option value="Fase Principal">Fase Principal</option>
                      <option value="Situación Real">Situación Real</option>
                      <option value="Vuelta a la Calma">Vuelta a la Calma</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400">Duración (min):</label>
                      <input
                        type="number"
                        min="5"
                        max="90"
                        value={newBlock.durationMin}
                        onChange={e => setNewBlock({ ...newBlock, durationMin: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Intensidad RPE (1-10):</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={newBlock.targetRPE}
                        onChange={e => setNewBlock({ ...newBlock, targetRPE: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-slate-400">Objetivo:</label>
                      <input
                        type="text"
                        placeholder="Ej: Orientación de pase al tercer hombre"
                        value={newBlock.objective}
                        onChange={e => setNewBlock({ ...newBlock, objective: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-100 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setIsAddingBlock(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddBlockToSession}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
                    >
                      Guardar Bloque
                    </button>
                  </div>
                </div>
              )}

              {/* Render Blocks */}
              {activeSession.blocks.map((block, idx) => {
                const linkedPlay = block.tacticalPlayId
                  ? INITIAL_TACTICAL_PLAYS.find(p => p.id === block.tacticalPlayId)
                  : null;

                return (
                  <div
                    key={block.id}
                    className="p-4 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col gap-2.5 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-100">{block.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                          {block.phase}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {block.durationMin} min
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Activity className="w-3.5 h-3.5 text-amber-500" />
                          RPE {block.targetRPE}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{block.description}</p>

                    {block.objective && (
                      <div className="text-xs text-slate-400">
                        <strong className="text-slate-300">Objetivo Técnico-Táctico:</strong> {block.objective}
                      </div>
                    )}

                    {/* Linked Tactical Play banner */}
                    {linkedPlay && (
                      <div className="mt-1 p-2.5 bg-emerald-950/40 border border-emerald-800/50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div className="text-xs">
                            <span className="text-emerald-300 font-medium">Jugada Táctica Vinculada: </span>
                            <span className="text-slate-200">{linkedPlay.title}</span>
                          </div>
                        </div>
                        {onSelectTacticalPlay && (
                          <button
                            onClick={() => onSelectTacticalPlay(linkedPlay.id)}
                            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 whitespace-nowrap ml-2"
                          >
                            Abrir en Pizarra
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {block.equipment && block.equipment.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                        <span>Materiales:</span>
                        <span>{block.equipment.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drill Library (1 Col) */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Banco de Ejercicios (Drills)</h3>
                <p className="text-xs text-slate-400">Selecciona para insertar en la sesión activa</p>
              </div>
              <Dumbbell className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Drill cards list */}
            <div className="flex flex-col gap-3">
              {drillLibrary.map(drill => (
                <div
                  key={drill.id}
                  className="p-3.5 bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl flex flex-col gap-2 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      {drill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 shrink-0">
                      {drill.durationMin}m · RPE {drill.suggestedRPE}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{drill.objective}</p>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                    <span className="text-slate-400">{drill.playersCount}</span>
                    <button
                      onClick={() => handleAddDrillAsBlock(drill)}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      <span>+ Añadir a Sesión</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create New Session Modal */}
      {isCreatingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">Planificar Nueva Sesión de Entrenamiento</h3>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Título de la Sesión:</label>
                <input
                  type="text"
                  placeholder="Ej: Trabajo de Velocidad Reactiva & Transiciones"
                  value={newSession.title}
                  onChange={e => setNewSession({ ...newSession, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Día de Microciclo:</label>
                  <select
                    value={newSession.dayType}
                    onChange={e => setNewSession({ ...newSession, dayType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  >
                    <option value="MD-4">MD-4 (Fuerza / Tensión)</option>
                    <option value="MD-3">MD-3 (Resistencia Táctica)</option>
                    <option value="MD-2">MD-2 (Velocidad & ABP)</option>
                    <option value="MD-1">MD-1 (Activación)</option>
                    <option value="MD">MD (Día de Partido)</option>
                    <option value="MD+1">MD+1 (Recuperación)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Categoría de Entrenamiento:</label>
                  <select
                    value={newSession.category}
                    onChange={e => setNewSession({ ...newSession, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  >
                    <option value="Físico-Táctico">Físico-Táctico</option>
                    <option value="Fuerza & Tensión">Fuerza & Tensión</option>
                    <option value="Velocidad & ABP">Velocidad & ABP</option>
                    <option value="Activación Pre-partido">Activación Pre-partido</option>
                    <option value="Recuperación">Recuperación</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Duración Total (min):</label>
                  <input
                    type="number"
                    value={newSession.durationTotalMin}
                    onChange={e => setNewSession({ ...newSession, durationTotalMin: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">RPE Promedio Estimado (1-10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSession.targetRPE}
                    onChange={e => setNewSession({ ...newSession, targetRPE: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium mb-1 block">Descripción & Objetivos Clave:</label>
                <textarea
                  rows={3}
                  placeholder="Detalla los principios metodológicos y objetivos para el cuerpo técnico..."
                  value={newSession.description}
                  onChange={e => setNewSession({ ...newSession, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsCreatingSession(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
              >
                Crear Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
