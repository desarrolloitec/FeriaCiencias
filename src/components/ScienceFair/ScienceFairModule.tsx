import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Smartphone,
  Sparkles,
  Maximize,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Copy,
  ExternalLink,
  Zap,
  Target
} from 'lucide-react';
import { evaluateACWR, calculateFosterSRPE } from '../../utils/sportsMath';

interface ScienceFairModuleProps {
  onGoToTacticalBoard?: () => void;
}

export const ScienceFairModule: React.FC<ScienceFairModuleProps> = ({ onGoToTacticalBoard }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [demoStation, setDemoStation] = useState<'tactical' | 'acwr_sim' | 'rpe_calc'>('acwr_sim');

  // Interactive Live Simulator for Science Fair visitors:
  // Sliders to simulate Acute vs Chronic Load and observe Gabbett's curve in real-time
  const [acuteLoad, setAcuteLoad] = useState<number>(2400);
  const [chronicLoad, setChronicLoad] = useState<number>(2100);

  // RPE Foster interactive simulator
  const [simDuration, setSimDuration] = useState<number>(75);
  const [simRPE, setSimRPE] = useState<number>(8);

  // Live URL fallback
  const appDemoUrl =
    typeof window !== 'undefined' && window.location.href.startsWith('http')
      ? window.location.href
      : 'https://ais-pre-uhvfacqlhljz7m6iipcf4d-725125459922.us-east1.run.app';

  useEffect(() => {
    QRCode.toDataURL(appDemoUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('Error generating QR Code', err));
  }, [appDemoUrl]);

  const simRatio = chronicLoad > 0 ? acuteLoad / chronicLoad : 0;
  const simEval = evaluateACWR(simRatio);
  const simFosterAU = calculateFosterSRPE(simRPE, simDuration);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appDemoUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stand Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-emerald-400">Estación Interactiva Feria de Ciencias</span>
            <span>·</span>
            <span>Demostración en Pantallas Táctiles & Código QR</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Pabellón de Ciencias del Deporte: Stand Interactivo
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Espacio diseñado para que los evaluadores y asistentes de la feria experimenten la rigurosidad conceptual,
            manipulen la pizarra táctil y sincronicen la demo en sus dispositivos móviles.
          </p>
        </div>

        <button
          onClick={handleToggleFullscreen}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          <Maximize className="w-4 h-4 text-emerald-400" />
          <span>Modo Pantalla Completa (Kiosco)</span>
        </button>
      </div>

      {/* Main Grid: QR Code Banner + Interactive Science Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code Card (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Escanear Demostración en Vivo
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Apunta la cámara de tu smartphone para interactuar con la plataforma durante la exposición.
            </p>
          </div>

          {/* QR Canvas / Image */}
          <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Código QR KineTactix" className="w-48 h-48 rounded" />
            ) : (
              <div className="w-48 h-48 bg-slate-200 animate-pulse rounded flex items-center justify-center text-slate-500 text-xs">
                Generando QR...
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full text-xs">
            <button
              onClick={handleCopyLink}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedUrl ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? '¡Enlace copiado!' : 'Copiar URL de la Demo'}</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500 truncate">
              {appDemoUrl}
            </span>
          </div>

          <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 text-left">
            <strong className="text-emerald-400 block mb-1">Para el Evaluador de la Feria:</strong>
            La aplicación es una SPA reactiva completa con soporte offline. Todos los módulos matemáticos corren en
            tiempo real en el cliente.
          </div>
        </div>

        {/* Live Interactive Station Simulator (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Laboratorio Experimental en Vivo
                </span>
                <h3 className="text-base font-bold text-white">
                  Prueba Interactiva para Visitantes del Stand
                </h3>
              </div>

              {/* Station Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setDemoStation('acwr_sim')}
                  className={`px-3 py-1.5 rounded font-medium transition-colors ${
                    demoStation === 'acwr_sim'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Simulador ACWR
                </button>
                <button
                  onClick={() => setDemoStation('rpe_calc')}
                  className={`px-3 py-1.5 rounded font-medium transition-colors ${
                    demoStation === 'rpe_calc'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Calculadora Foster
                </button>
              </div>
            </div>

            {/* EXPERIENCE 1: ACWR Gabbett Simulator */}
            {demoStation === 'acwr_sim' && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Consigna interactiva:</strong> Mueve los controles deslizantes para variar la{' '}
                  <span className="text-sky-400 font-semibold">Carga Aguda (últimos 7 días)</span> y la{' '}
                  <span className="text-indigo-400 font-semibold">Carga Crónica (últimos 28 días)</span>. Observa en
                  tiempo real cómo el algoritmo clasifica el estado fisiológico del atleta y predice el riesgo de lesión.
                </p>

                {/* Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Carga Aguda (7 Días):</span>
                      <span className="font-mono font-bold text-sky-400">{acuteLoad} AU</span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="4000"
                      step="50"
                      value={acuteLoad}
                      onChange={e => setAcuteLoad(Number(e.target.value))}
                      className="accent-sky-400"
                    />
                    <span className="text-[10px] text-slate-500">Refleja la fatiga reciente acumulada</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Carga Crónica (28 Días Media):</span>
                      <span className="font-mono font-bold text-indigo-400">{chronicLoad} AU</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="3500"
                      step="50"
                      value={chronicLoad}
                      onChange={e => setChronicLoad(Number(e.target.value))}
                      className="accent-indigo-400"
                    />
                    <span className="text-[10px] text-slate-500">Refleja la aptitud física ("Fitness") desarrollada</span>
                  </div>
                </div>

                {/* Live ACWR Result Card */}
                <div className={`p-4 rounded-xl border flex flex-col gap-2 ${simEval.badgeBg}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-400">Ratio ACWR Calculado:</div>
                      <div className={`text-3xl font-mono font-bold ${simEval.colorClass}`}>
                        {simRatio.toFixed(2)}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${simEval.badgeBg} ${simEval.colorClass}`}>
                      {simEval.label}
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 mt-1">{simEval.description}</p>
                  <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <strong className="text-white">Prescripción de la plataforma:</strong> {simEval.recommendation}
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs text-slate-400">Probar Escenarios Típicos:</span>
                  <button
                    onClick={() => {
                      setAcuteLoad(2100);
                      setChronicLoad(2050);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded text-xs font-medium"
                  >
                    Estado Óptimo (1.02)
                  </button>
                  <button
                    onClick={() => {
                      setAcuteLoad(3400);
                      setChronicLoad(2000);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded text-xs font-medium"
                  >
                    Pico de Sobrecarga (1.70)
                  </button>
                  <button
                    onClick={() => {
                      setAcuteLoad(1200);
                      setChronicLoad(2200);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-xs font-medium"
                  >
                    Desentrenamiento (0.55)
                  </button>
                </div>
              </div>
            )}

            {/* EXPERIENCE 2: Foster sRPE Calculator */}
            {demoStation === 'rpe_calc' && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Simulador de Esfuerzo Percibido de Carl Foster:</strong> Calcula las Unidades Arbitrarias
                  (AU) de carga interna para cualquier tipo de actividad deportiva realizada.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Duración de la Sesión:</span>
                      <span className="font-mono font-bold text-amber-400">{simDuration} minutos</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="150"
                      step="5"
                      value={simDuration}
                      onChange={e => setSimDuration(Number(e.target.value))}
                      className="accent-amber-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Escala Borg CR-10 Percibida:</span>
                      <span className="font-mono font-bold text-emerald-400">{simRPE} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={simRPE}
                      onChange={e => setSimRPE(Number(e.target.value))}
                      className="accent-emerald-400"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400">Carga Interna Resultante:</span>
                    <div className="text-3xl font-mono font-bold text-emerald-400 mt-1">
                      {simFosterAU} <span className="text-base text-slate-500 font-sans">AU (Unidades Arbitrarias)</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 text-right max-w-[200px]">
                    Fórmula: {simDuration}m × {simRPE} RPE = {simFosterAU} AU
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
