import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  PenTool,
  Move,
  Maximize2,
  Download,
  BookOpen,
  Volume2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  CircleDot
} from 'lucide-react';
import { TacticalPlay, SportType, PitchView, DrawingItem, BoardElement } from '../../types';
import { INITIAL_TACTICAL_PLAYS } from '../../data/mockData';
import { lerp, easeInOutCubic } from '../../utils/sportsMath';

interface TacticalBoardProps {
  onLinkToSession?: (playId: string) => void;
}

export const TacticalBoard: React.FC<TacticalBoardProps> = ({ onLinkToSession }) => {
  const [plays, setPlays] = useState<TacticalPlay[]>(INITIAL_TACTICAL_PLAYS);
  const [selectedPlayId, setSelectedPlayId] = useState<string>(INITIAL_TACTICAL_PLAYS[0].id);

  const currentPlay = plays.find(p => p.id === selectedPlayId) || plays[0];

  // Keyframe state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  // Active elements in current step
  const [elements, setElements] = useState<Record<string, { x: number; y: number; label?: string }>>({});
  
  // Interactive drawing tool
  const [activeTool, setActiveTool] = useState<'move' | 'arrow' | 'dashed' | 'curve' | 'zone' | 'cone'>('move');
  const [drawings, setDrawings] = useState<DrawingItem[]>(currentPlay.drawings || []);
  const [drawingColor, setDrawingColor] = useState<string>('#38bdf8');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<Array<{ x: number; y: number }>>([]);

  // Pitch settings
  const [sport, setSport] = useState<SportType>(currentPlay.sport);
  const [pitchView, setPitchView] = useState<PitchView>(currentPlay.pitchView);

  // Dragging player/ball/cone
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Synchronize elements when currentPlay or currentStepIndex changes
  useEffect(() => {
    if (currentPlay.keyframes && currentPlay.keyframes[currentStepIndex]) {
      setElements(currentPlay.keyframes[currentStepIndex].elements);
    }
    setDrawings(currentPlay.drawings || []);
    setSport(currentPlay.sport);
    setPitchView(currentPlay.pitchView);
  }, [selectedPlayId, currentStepIndex]);

  // Animation Playback Engine
  const playAnimation = useCallback(() => {
    if (currentPlay.keyframes.length <= 1) return;

    let step = currentStepIndex;
    let startTime: number | null = null;
    setIsPlaying(true);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progressMs = (timestamp - startTime) * playbackSpeed;
      const currentKf = currentPlay.keyframes[step];
      const nextStepIndex = (step + 1) % currentPlay.keyframes.length;
      const nextKf = currentPlay.keyframes[nextStepIndex];
      const stepDuration = currentKf?.durationMs || 3000;

      const t = Math.min(progressMs / stepDuration, 1);
      const easedT = easeInOutCubic(t);

      // Interpolate positions between step and nextStepIndex
      const startElems = currentKf.elements;
      const endElems = nextKf.elements;

      const interpolated: Record<string, { x: number; y: number; label?: string }> = {};
      const allKeys = Array.from(new Set([...Object.keys(startElems), ...Object.keys(endElems)]));

      allKeys.forEach(key => {
        const startPos = startElems[key] || endElems[key];
        const endPos = endElems[key] || startElems[key];
        interpolated[key] = {
          x: lerp(startPos.x, endPos.x, easedT),
          y: lerp(startPos.y, endPos.y, easedT),
          label: startPos.label || endPos.label
        };
      });

      setElements(interpolated);

      if (t >= 1) {
        // Step finished
        if (nextStepIndex === 0 && !isLooping) {
          setIsPlaying(false);
          setCurrentStepIndex(0);
          return;
        }
        step = nextStepIndex;
        setCurrentStepIndex(step);
        startTime = timestamp;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [currentPlay, currentStepIndex, playbackSpeed, isLooping]);

  const pauseAnimation = useCallback(() => {
    setIsPlaying(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      playAnimation();
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Coordinate conversion helper
  const getCoordinatesFromEvent = (e: React.MouseEvent | React.TouchEvent) => {
    if (!boardRef.current) return { x: 50, y: 50 };
    const rect = boardRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100));
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  };

  // Drag element
  const handleBoardMouseDown = (e: React.MouseEvent) => {
    if (activeTool !== 'move') {
      setIsDrawing(true);
      const coords = getCoordinatesFromEvent(e);
      setCurrentPoints([coords]);
    }
  };

  const handleBoardMouseMove = (e: React.MouseEvent) => {
    if (draggedElementId && activeTool === 'move') {
      const coords = getCoordinatesFromEvent(e);
      setElements(prev => ({
        ...prev,
        [draggedElementId]: {
          ...prev[draggedElementId],
          x: coords.x,
          y: coords.y
        }
      }));
    } else if (isDrawing && activeTool !== 'move') {
      const coords = getCoordinatesFromEvent(e);
      setCurrentPoints(prev => [...prev, coords]);
    }
  };

  const handleBoardMouseUp = () => {
    if (draggedElementId) {
      setDraggedElementId(null);
      // Persist element position to the active keyframe
      updateKeyframeElements(elements);
    }
    if (isDrawing && activeTool !== 'move' && currentPoints.length > 1) {
      setIsDrawing(false);
      const newDrawing: DrawingItem = {
        id: `draw-${Date.now()}`,
        type: activeTool as any,
        points: currentPoints,
        color: drawingColor
      };
      setDrawings(prev => [...prev, newDrawing]);
      setCurrentPoints([]);
    }
  };

  // Touch equivalents
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTool !== 'move') {
      setIsDrawing(true);
      const coords = getCoordinatesFromEvent(e);
      setCurrentPoints([coords]);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedElementId && activeTool === 'move') {
      e.preventDefault();
      const coords = getCoordinatesFromEvent(e);
      setElements(prev => ({
        ...prev,
        [draggedElementId]: {
          ...prev[draggedElementId],
          x: coords.x,
          y: coords.y
        }
      }));
    } else if (isDrawing && activeTool !== 'move') {
      e.preventDefault();
      const coords = getCoordinatesFromEvent(e);
      setCurrentPoints(prev => [...prev, coords]);
    }
  };

  const handleTouchEnd = () => {
    handleBoardMouseUp();
  };

  const updateKeyframeElements = (newElems: Record<string, { x: number; y: number; label?: string }>) => {
    setPlays(prevPlays =>
      prevPlays.map(p => {
        if (p.id !== selectedPlayId) return p;
        const updatedKfs = [...p.keyframes];
        if (updatedKfs[currentStepIndex]) {
          updatedKfs[currentStepIndex] = {
            ...updatedKfs[currentStepIndex],
            elements: newElems
          };
        }
        return { ...p, keyframes: updatedKfs };
      })
    );
  };

  // Add new keyframe step
  const handleAddKeyframe = () => {
    const newStepNumber = currentPlay.keyframes.length + 1;
    const newKeyframe = {
      id: `kf-${Date.now()}`,
      stepNumber: newStepNumber,
      label: `Fase ${newStepNumber}: Movimiento Táctico`,
      durationMs: 3000,
      elements: JSON.parse(JSON.stringify(elements))
    };

    setPlays(prevPlays =>
      prevPlays.map(p => {
        if (p.id !== selectedPlayId) return p;
        return {
          ...p,
          keyframes: [...p.keyframes, newKeyframe]
        };
      })
    );
    setCurrentStepIndex(currentPlay.keyframes.length);
  };

  // Duplicate current keyframe
  const handleDuplicateKeyframe = () => {
    const currentKf = currentPlay.keyframes[currentStepIndex];
    if (!currentKf) return;
    const newStepNumber = currentStepIndex + 2;
    const duplicated = {
      id: `kf-dup-${Date.now()}`,
      stepNumber: newStepNumber,
      label: `${currentKf.label} (Variante)`,
      durationMs: currentKf.durationMs,
      elements: JSON.parse(JSON.stringify(currentKf.elements))
    };

    const newKfs = [...currentPlay.keyframes];
    newKfs.splice(currentStepIndex + 1, 0, duplicated);

    setPlays(prevPlays =>
      prevPlays.map(p => {
        if (p.id !== selectedPlayId) return p;
        return {
          ...p,
          keyframes: newKfs.map((k, idx) => ({ ...k, stepNumber: idx + 1 }))
        };
      })
    );
    setCurrentStepIndex(currentStepIndex + 1);
  };

  // Delete keyframe
  const handleDeleteKeyframe = () => {
    if (currentPlay.keyframes.length <= 1) return;
    const newKfs = currentPlay.keyframes.filter((_, idx) => idx !== currentStepIndex);
    setPlays(prevPlays =>
      prevPlays.map(p => {
        if (p.id !== selectedPlayId) return p;
        return {
          ...p,
          keyframes: newKfs.map((k, idx) => ({ ...k, stepNumber: idx + 1 }))
        };
      })
    );
    setCurrentStepIndex(Math.max(0, currentStepIndex - 1));
  };

  // Add training cone to pitch
  const handleAddCone = () => {
    const coneId = `cone-${Date.now()}`;
    const newElements = {
      ...elements,
      [coneId]: { x: 50, y: 50, label: '▲ Cono' }
    };
    setElements(newElements);
    updateKeyframeElements(newElements);
  };

  // Clear drawings
  const handleClearDrawings = () => {
    setDrawings([]);
    setPlays(prevPlays =>
      prevPlays.map(p => (p.id === selectedPlayId ? { ...p, drawings: [] } : p))
    );
  };

  // Create new blank play
  const handleCreateNewPlay = () => {
    const newPlay: TacticalPlay = {
      id: `play-${Date.now()}`,
      title: 'Nueva Jugada Táctica Diseñada',
      sport: 'futbol11',
      pitchView: 'full',
      category: 'Ofensiva',
      objective: 'Estructuración posicional personalizada.',
      description: 'Jugada creada interactivamente en la pizarra digital.',
      durationSeconds: 10,
      createdAt: new Date().toISOString().split('T')[0],
      drawings: [],
      keyframes: [
        {
          id: `kf-init-${Date.now()}`,
          stepNumber: 1,
          label: 'Fase 1: Posición Inicial',
          durationMs: 3000,
          elements: {
            p1: { x: 10, y: 50, label: '1' },
            p2: { x: 28, y: 78, label: '4' },
            p3: { x: 26, y: 58, label: '2' },
            p4: { x: 26, y: 42, label: '6' },
            p5: { x: 28, y: 22, label: '3' },
            p6: { x: 45, y: 50, label: '5' },
            p7: { x: 55, y: 35, label: '8' },
            p8: { x: 55, y: 65, label: '10' },
            p9: { x: 72, y: 20, label: '7' },
            p10: { x: 75, y: 50, label: '9' },
            p11: { x: 72, y: 80, label: '11' },
            ball: { x: 12, y: 50, label: 'Balón' }
          }
        }
      ]
    };
    setPlays([newPlay, ...plays]);
    setSelectedPlayId(newPlay.id);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Top Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">Pizarra Táctica Digital</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">Modo Animación Vectorial en Tiempo Real</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {currentPlay.title}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl line-clamp-1">
            {currentPlay.objective}
          </p>
        </div>

        {/* Play Selector & New Play */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={selectedPlayId}
            onChange={e => {
              pauseAnimation();
              setSelectedPlayId(e.target.value);
              setCurrentStepIndex(0);
            }}
            aria-label="Seleccionar jugada táctica"
            className="bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          >
            {plays.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.sport === 'futbol11' ? 'Fútbol 11' : p.sport === 'futbolSala' ? 'Fútbol Sala' : 'Básquet'})
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateNewPlay}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva Jugada
          </button>
        </div>
      </div>

      {/* Main Pitch + Sidebar Tools Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Pitch Area (3 columns on large screens) */}
        <div className="xl:col-span-3 flex flex-col gap-3">
          {/* Pitch Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium mr-1">Deporte:</span>
              <button
                onClick={() => setSport('futbol11')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${sport === 'futbol11' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Fútbol 11
              </button>
              <button
                onClick={() => setSport('futbolSala')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${sport === 'futbolSala' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Fútbol Sala / 7
              </button>
              <button
                onClick={() => setSport('basquet')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${sport === 'basquet' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Básquetbol
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium mr-1">Vista:</span>
              <button
                onClick={() => setPitchView('full')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${pitchView === 'full' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Completo
              </button>
              <button
                onClick={() => setPitchView('half')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${pitchView === 'half' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Medio Campo
              </button>
              <button
                onClick={() => setPitchView('box')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${pitchView === 'box' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Área (ABP)
              </button>
            </div>
          </div>

          {/* Interactive Tactical Canvas */}
          <div
            ref={boardRef}
            onMouseDown={handleBoardMouseDown}
            onMouseMove={handleBoardMouseMove}
            onMouseUp={handleBoardMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`relative w-full aspect-[16/10] select-none rounded-xl overflow-hidden shadow-2xl border-2 transition-all ${
              activeTool === 'move' ? 'cursor-default' : 'cursor-crosshair'
            } ${sport === 'basquet' ? 'border-amber-900/60 bg-[#9a5b32]' : 'border-emerald-900/60 bg-[#165b33]'}`}
            style={{
              backgroundImage: sport === 'basquet'
                ? 'repeating-linear-gradient(90deg, #94532a 0px, #94532a 40px, #9f5b33 40px, #9f5b33 80px)'
                : 'repeating-linear-gradient(90deg, #165b33 0px, #165b33 60px, #134e2c 60px, #134e2c 120px)'
            }}
          >
            {/* SVG Pitch Markings */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {sport !== 'basquet' ? (
                // Soccer / Futsal Pitch Markings
                <g stroke="rgba(255, 255, 255, 0.65)" strokeWidth="0.8" fill="none">
                  {/* Outer boundary */}
                  <rect x="3" y="4" width="94" height="92" rx="1" />

                  {pitchView === 'full' && (
                    <>
                      {/* Half-way line */}
                      <line x1="50" y1="4" x2="50" y2="96" />
                      {/* Center circle */}
                      <circle cx="50" cy="50" r="11" />
                      <circle cx="50" cy="50" r="0.8" fill="white" />

                      {/* Left Penalty Area */}
                      <rect x="3" y="24" width="16" height="52" />
                      {/* Left Goal Area */}
                      <rect x="3" y="36" width="6" height="28" />
                      <circle cx="12" cy="50" r="0.8" fill="white" />
                      <path d="M 19 40 A 10 10 0 0 1 19 60" />

                      {/* Right Penalty Area */}
                      <rect x="81" y="24" width="16" height="52" />
                      {/* Right Goal Area */}
                      <rect x="91" y="36" width="6" height="28" />
                      <circle cx="88" cy="50" r="0.8" fill="white" />
                      <path d="M 81 40 A 10 10 0 0 0 81 60" />

                      {/* Corner arcs */}
                      <path d="M 3 6 A 2 2 0 0 1 5 4" />
                      <path d="M 3 94 A 2 2 0 0 0 5 96" />
                      <path d="M 97 6 A 2 2 0 0 0 95 4" />
                      <path d="M 97 94 A 2 2 0 0 1 95 96" />

                      {/* Goals */}
                      <rect x="0.8" y="42" width="2.2" height="16" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="0.6" />
                      <rect x="97" y="42" width="2.2" height="16" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="0.6" />
                    </>
                  )}

                  {pitchView === 'half' && (
                    <>
                      {/* Half-pitch enlarged */}
                      <line x1="3" y1="4" x2="3" y2="96" strokeWidth="1.2" />
                      <path d="M 3 32 A 18 18 0 0 1 3 68" strokeDasharray="2,2" />
                      {/* Penalty Area */}
                      <rect x="52" y="18" width="45" height="64" />
                      {/* Goal Area */}
                      <rect x="80" y="32" width="17" height="36" />
                      <circle cx="72" cy="50" r="1" fill="white" />
                      <path d="M 52 35 A 14 14 0 0 1 52 65" />
                      <rect x="97" y="38" width="2.5" height="24" fill="rgba(255,255,255,0.2)" stroke="white" />
                    </>
                  )}

                  {pitchView === 'box' && (
                    <>
                      {/* Box zoom for set pieces */}
                      <rect x="35" y="10" width="62" height="80" />
                      <rect x="70" y="24" width="27" height="52" />
                      <circle cx="60" cy="50" r="1.2" fill="white" />
                      <path d="M 35 30 A 18 18 0 0 1 35 70" />
                      <rect x="97" y="34" width="2.5" height="32" fill="rgba(255,255,255,0.2)" stroke="white" />
                    </>
                  )}
                </g>
              ) : (
                // Basketball Court Markings
                <g stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.8" fill="none">
                  <rect x="4" y="5" width="92" height="90" rx="1" />
                  <line x1="50" y1="5" x2="50" y2="95" />
                  <circle cx="50" cy="50" r="12" />
                  {/* Left 3pt arc */}
                  <path d="M 4 20 L 20 20 A 30 30 0 0 1 20 80 L 4 80" />
                  <rect x="4" y="32" width="22" height="36" />
                  <circle cx="26" cy="50" r="8" />
                  {/* Right 3pt arc */}
                  <path d="M 96 20 L 80 20 A 30 30 0 0 0 80 80 L 96 80" />
                  <rect x="74" y="32" width="22" height="36" />
                  <circle cx="74" cy="50" r="8" />
                </g>
              )}

              {/* Render Permanent Drawings */}
              {drawings.map(d => {
                if (!d.points || d.points.length < 2) return null;
                const pathData = d.points.reduce((acc, pt, idx) => {
                  return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
                }, '');

                if (d.type === 'zone') {
                  const p1 = d.points[0];
                  const p2 = d.points[d.points.length - 1];
                  const minX = Math.min(p1.x, p2.x);
                  const minY = Math.min(p1.y, p2.y);
                  const w = Math.abs(p1.x - p2.x);
                  const h = Math.abs(p1.y - p2.y);
                  return (
                    <rect
                      key={d.id}
                      x={minX}
                      y={minY}
                      width={w}
                      height={h}
                      fill={d.color || '#ef4444'}
                      fillOpacity="0.22"
                      stroke={d.color || '#ef4444'}
                      strokeWidth="0.6"
                      strokeDasharray="2,2"
                    />
                  );
                }

                return (
                  <g key={d.id}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={d.color || '#38bdf8'}
                      strokeWidth={d.type === 'arrow' ? '1.2' : '0.9'}
                      strokeDasharray={d.type === 'dashed' ? '2,2' : undefined}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {d.label && (
                      <text
                        x={d.points[0].x}
                        y={d.points[0].y - 2}
                        fill={d.color || '#ffffff'}
                        fontSize="2.2"
                        fontWeight="600"
                      >
                        {d.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Currently active drawing in progress */}
              {isDrawing && currentPoints.length > 1 && (
                <path
                  d={currentPoints.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')}
                  fill="none"
                  stroke={drawingColor}
                  strokeWidth="1.2"
                  strokeDasharray={activeTool === 'dashed' ? '2,2' : undefined}
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* Draggable Players, Ball, Cones */}
            {Object.entries(elements).map(([id, pos]) => {
              const isBall = id === 'ball';
              const isCone = id.startsWith('cone');
              const isRival = id.startsWith('r');
              const isDraggingThis = draggedElementId === id;

              return (
                <div
                  key={id}
                  onMouseDown={e => {
                    if (activeTool === 'move') {
                      e.stopPropagation();
                      setDraggedElementId(id);
                    }
                  }}
                  onTouchStart={e => {
                    if (activeTool === 'move') {
                      e.stopPropagation();
                      setDraggedElementId(id);
                    }
                  }}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    touchAction: 'none'
                  }}
                  className={`absolute z-20 flex flex-col items-center justify-center transition-transform select-none ${
                    isDraggingThis ? 'scale-125 ring-2 ring-amber-400 z-30 cursor-grabbing' : 'cursor-grab hover:scale-110'
                  }`}
                >
                  {isBall ? (
                    // Ball
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-slate-900 shadow-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-950 border border-slate-200"></div>
                    </div>
                  ) : isCone ? (
                    // Training Cone
                    <div className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 drop-shadow-md flex items-center justify-center font-bold text-xs">
                      ▲
                    </div>
                  ) : isRival ? (
                    // Rival Player (Red / Crimson)
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-rose-600 to-red-800 border-2 border-white shadow-lg text-white font-bold text-[10px] sm:text-xs flex items-center justify-center">
                      {pos.label || id.replace('r', '')}
                    </div>
                  ) : (
                    // Home Player (Cyan / Blue)
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 border-2 border-white shadow-lg text-white font-bold text-[10px] sm:text-xs flex items-center justify-center">
                      {pos.label?.split(' ')[0] || id.replace('p', '')}
                    </div>
                  )}

                  {/* Subtext label */}
                  {pos.label && !isBall && !isCone && (
                    <span className="mt-0.5 text-[9px] font-semibold text-white bg-slate-950/80 px-1 py-0.2 rounded border border-white/20 whitespace-nowrap shadow pointer-events-none">
                      {pos.label}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Step Overlay Watermark */}
            <div className="absolute bottom-2 right-3 pointer-events-none text-right">
              <span className="text-[11px] font-mono text-white/80 bg-slate-950/60 px-2 py-0.5 rounded border border-white/10">
                Paso {currentStepIndex + 1} de {currentPlay.keyframes.length} · {currentPlay.keyframes[currentStepIndex]?.label}
              </span>
            </div>
          </div>

          {/* Keyframe Timeline & Playback Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-3 shadow-md">
            {/* Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pausar Simulación' : 'Simular Jugada'}</span>
                </button>

                <button
                  onClick={() => {
                    pauseAnimation();
                    setCurrentStepIndex(0);
                  }}
                  title="Reiniciar al paso 1"
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Step navigation buttons */}
                <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-0.5">
                  <button
                    onClick={() => {
                      pauseAnimation();
                      setCurrentStepIndex(prev => Math.max(0, prev - 1));
                    }}
                    disabled={currentStepIndex === 0}
                    className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded"
                    title="Paso anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono px-2 text-slate-300">
                    {currentStepIndex + 1} / {currentPlay.keyframes.length}
                  </span>
                  <button
                    onClick={() => {
                      pauseAnimation();
                      setCurrentStepIndex(prev => Math.min(currentPlay.keyframes.length - 1, prev + 1));
                    }}
                    disabled={currentStepIndex === currentPlay.keyframes.length - 1}
                    className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded"
                    title="Paso siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Speed & Loop Controls */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
                  <span className="text-slate-400 px-1 font-medium">Velocidad:</span>
                  {[0.5, 1, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-0.5 rounded font-mono font-medium ${
                        playbackSpeed === speed ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    isLooping
                      ? 'bg-slate-800 border-emerald-500/50 text-emerald-400'
                      : 'border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Loop {isLooping ? 'Activo' : 'Inactivo'}
                </button>
              </div>
            </div>

            {/* Keyframe step chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-800">
              <span className="text-xs font-medium text-slate-400 shrink-0">Línea de Pasos:</span>
              {currentPlay.keyframes.map((kf, idx) => (
                <button
                  key={kf.id}
                  onClick={() => {
                    pauseAnimation();
                    setCurrentStepIndex(idx);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    idx === currentStepIndex
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-mono">
                    {idx + 1}
                  </span>
                  <span>{kf.label}</span>
                </button>
              ))}

              <button
                onClick={handleAddKeyframe}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-600 text-emerald-400 transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar Paso
              </button>
              <button
                onClick={handleDuplicateKeyframe}
                title="Duplicar paso actual"
                className="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              {currentPlay.keyframes.length > 1 && (
                <button
                  onClick={handleDeleteKeyframe}
                  title="Eliminar paso actual"
                  className="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-rose-950/60 border border-rose-900/40 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Drawing Tools, Objects & Description */}
        <div className="flex flex-col gap-4">
          {/* Drawing & Mode Tools */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Herramientas de Pizarra</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTool('move')}
                className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border transition-colors ${
                  activeTool === 'move'
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Move className="w-4 h-4" />
                <span>Mover Jugador</span>
              </button>

              <button
                onClick={() => setActiveTool('arrow')}
                className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border transition-colors ${
                  activeTool === 'arrow'
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>Carrera / Flecha</span>
              </button>

              <button
                onClick={() => setActiveTool('dashed')}
                className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border transition-colors ${
                  activeTool === 'dashed'
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <CircleDot className="w-4 h-4" />
                <span>Pase (Línea de puntos)</span>
              </button>

              <button
                onClick={() => setActiveTool('zone')}
                className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border transition-colors ${
                  activeTool === 'zone'
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Zona Pressing</span>
              </button>
            </div>

            {/* Color Palette */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">Color de trazo:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { color: '#38bdf8', label: 'Celeste' },
                  { color: '#10b981', label: 'Verde' },
                  { color: '#fbbf24', label: 'Amarillo' },
                  { color: '#f43f5e', label: 'Rojo' },
                  { color: '#ffffff', label: 'Blanco' }
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setDrawingColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      drawingColor === c.color ? 'scale-125 border-white shadow' : 'border-slate-900 opacity-80'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Elements injection */}
            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleAddCone}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-amber-300 flex items-center justify-center gap-1"
              >
                ▲ Agregar Cono
              </button>
              <button
                onClick={handleClearDrawings}
                className="py-1.5 px-3 bg-slate-800 hover:bg-rose-950/60 border border-slate-700 text-slate-400 hover:text-rose-300 rounded-lg text-xs font-medium"
              >
                Limpiar Trazos
              </button>
            </div>
          </div>

          {/* Tactical Explanation & Coaching Points */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Consigna y Rigor Táctico
            </h3>
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
              {currentPlay.description}
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Categoría:</span>
                <span className="font-semibold text-slate-200">{currentPlay.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Duración estimada:</span>
                <span className="font-mono text-slate-200">{currentPlay.durationSeconds}s</span>
              </div>
              <div className="flex justify-between">
                <span>Pasos de animación:</span>
                <span className="font-mono text-emerald-400">{currentPlay.keyframes.length} fases</span>
              </div>
            </div>

            {onLinkToSession && (
              <button
                onClick={() => onLinkToSession(currentPlay.id)}
                className="mt-2 w-full py-2 bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-emerald-900/60 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Vincular a Planificación de Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
