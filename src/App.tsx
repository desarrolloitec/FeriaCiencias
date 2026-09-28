import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { TacticalBoard } from './components/TacticalBoard/TacticalBoard';
import { PlanningModule } from './components/Planning/PlanningModule';
import { WorkloadModule } from './components/WorkloadControl/WorkloadModule';
import { MetricsModule } from './components/Metrics/MetricsModule';
import { CommunicationModule } from './components/Communication/CommunicationModule';
import { ReportsModule } from './components/Reports/ReportsModule';
import { ScienceFairModule } from './components/ScienceFair/ScienceFairModule';
import { ManualAndDocsModule } from './components/Documentation/ManualAndDocsModule';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('tactical');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {currentTab === 'tactical' && (
          <TacticalBoard onLinkToSession={() => setCurrentTab('planning')} />
        )}

        {currentTab === 'planning' && (
          <PlanningModule onSelectTacticalPlay={() => setCurrentTab('tactical')} />
        )}

        {currentTab === 'workload' && <WorkloadModule />}

        {currentTab === 'metrics' && <MetricsModule />}

        {currentTab === 'communication' && <CommunicationModule />}

        {currentTab === 'reports' && <ReportsModule />}

        {currentTab === 'science_fair' && (
          <ScienceFairModule onGoToTacticalBoard={() => setCurrentTab('tactical')} />
        )}

        {currentTab === 'docs' && <ManualAndDocsModule />}
      </main>

      {/* Quiet Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">KineTactix Sport Science</span>
            <span>·</span>
            <span>Plataforma de Alto Rendimiento & Pizarra Táctica Digital</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Proyecto para Feria de Ciencias y Tecnología</span>
            <span>·</span>
            <span>Periodización Táctica & Modelo ACWR (Gabbett)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
