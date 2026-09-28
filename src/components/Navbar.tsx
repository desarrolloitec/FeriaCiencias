import React from 'react';
import { Sparkles, QrCode, Maximize2 } from 'lucide-react';

export type NavTab =
  | 'tactical'
  | 'planning'
  | 'workload'
  | 'metrics'
  | 'communication'
  | 'reports'
  | 'science_fair'
  | 'docs';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('tactical')}
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>KineTactix</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-400">
          <button
            onClick={() => onSelectTab('tactical')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'tactical' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Pizarra Táctica
          </button>

          <button
            onClick={() => onSelectTab('planning')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'planning' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Planificación
          </button>

          <button
            onClick={() => onSelectTab('workload')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'workload' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Control de Carga
          </button>

          <button
            onClick={() => onSelectTab('metrics')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'metrics' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Métricas
          </button>

          <button
            onClick={() => onSelectTab('communication')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'communication' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Consignas
          </button>

          <button
            onClick={() => onSelectTab('reports')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'reports' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Informes
          </button>

          <button
            onClick={() => onSelectTab('docs')}
            className={`transition-colors whitespace-nowrap ${
              currentTab === 'docs' ? 'text-emerald-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Manual & Docs
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Quick mobile navigation dropdown */}
          <select
            value={currentTab}
            onChange={e => onSelectTab(e.target.value as NavTab)}
            aria-label="Seleccionar módulo"
            className="lg:hidden bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="tactical">Pizarra Táctica</option>
            <option value="planning">Planificación</option>
            <option value="workload">Control de Carga</option>
            <option value="metrics">Métricas</option>
            <option value="communication">Consignas</option>
            <option value="reports">Informes</option>
            <option value="science_fair">Feria de Ciencias</option>
            <option value="docs">Manual & Docs</option>
          </select>

          <button
            onClick={() => onSelectTab('science_fair')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'science_fair'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/80'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Feria de Ciencias</span>
          </button>
        </div>
      </div>
    </header>
  );
};
