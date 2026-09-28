import React, { useState } from 'react';
import {
  Printer,
  Download,
  FileText,
  CheckCircle,
  Table,
  User,
  Activity,
  Layers,
  Calendar,
  Share2
} from 'lucide-react';
import { Athlete, TrainingSession } from '../../types';
import { INITIAL_ATHLETES, INITIAL_TRAINING_SESSIONS } from '../../data/mockData';
import { exportToCSV, evaluateACWR } from '../../utils/sportsMath';

export const ReportsModule: React.FC = () => {
  const [reportType, setReportType] = useState<'microcycle' | 'athlete' | 'attendance'>('microcycle');
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(INITIAL_ATHLETES[0].id);

  const selectedAthlete = INITIAL_ATHLETES.find(a => a.id === selectedAthleteId) || INITIAL_ATHLETES[0];

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // CSV Export handler
  const handleExportCSV = () => {
    if (reportType === 'microcycle' || reportType === 'attendance') {
      const rows = INITIAL_ATHLETES.map(a => ({
        Numero: a.number,
        Nombre: a.name,
        Posicion: a.position,
        Rol: a.positionLabel,
        Carga_Semanal_AU: a.weeklyWorkloadAU,
        Carga_Cronica_AU: a.chronicWorkloadAU,
        Ratio_ACWR: a.acwr.toFixed(2),
        Estado_Disponibilidad: a.status,
        Indice_Bienestar_Hooper: a.wellnessScore,
        Asistencia_Pct: `${a.attendanceRate}%`
      }));
      exportToCSV(`KineTactix_Reporte_${reportType}_${new Date().toISOString().split('T')[0]}`, rows);
    } else {
      const rows = [
        {
          Nombre: selectedAthlete.name,
          Dorsal: selectedAthlete.number,
          Posicion: selectedAthlete.positionLabel,
          Edad: selectedAthlete.age,
          Velocidad: selectedAthlete.stats.speed,
          Resistencia: selectedAthlete.stats.endurance,
          Tactico: selectedAthlete.stats.tactical,
          Pase: selectedAthlete.stats.passing,
          Decision: selectedAthlete.stats.decision,
          Fuerza: selectedAthlete.stats.strength,
          ACWR: selectedAthlete.acwr.toFixed(2),
          CargaSemanalAU: selectedAthlete.weeklyWorkloadAU
        }
      ];
      exportToCSV(`KineTactix_Ficha_${selectedAthlete.name.replace(/\s+/g, '_')}`, rows);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls (Hidden on Print) */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-emerald-400">Exportación de Informes Profesionales</span>
            <span>·</span>
            <span>Resúmenes Ejecutivos para el Cuerpo Técnico</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Centro de Informes & Documentos</h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selector Tabs (Hidden on Print) */}
      <div className="no-print flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 text-xs">
        <button
          onClick={() => setReportType('microcycle')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors ${
            reportType === 'microcycle'
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Informe Técnico del Microciclo
        </button>
        <button
          onClick={() => setReportType('athlete')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors ${
            reportType === 'athlete'
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Ficha Individual del Deportista
        </button>
        <button
          onClick={() => setReportType('attendance')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors ${
            reportType === 'attendance'
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Planilla de Control de Cargas & Asistencia
        </button>

        {reportType === 'athlete' && (
          <select
            value={selectedAthleteId}
            onChange={e => setSelectedAthleteId(e.target.value)}
            className="ml-auto bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none"
          >
            {INITIAL_ATHLETES.map(a => (
              <option key={a.id} value={a.id}>
                #{a.number} - {a.name} ({a.positionLabel})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Print-Ready Report Canvas */}
      <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-8 shadow-xl flex flex-col gap-6 print:bg-white print:text-slate-900 print:border-none print:p-0">
        {/* Report Official Header */}
        <div className="flex justify-between items-start border-b border-slate-800 print:border-slate-300 pb-5">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 print:text-emerald-700 font-bold">
              KINETACTIX SPORT SCIENCE LAB · INFORME OFICIAL
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white print:text-slate-950 mt-1">
              {reportType === 'microcycle' && 'Dossier Técnico del Microciclo Competitivo'}
              {reportType === 'athlete' && `Ficha de Evaluación Individual: ${selectedAthlete.name}`}
              {reportType === 'attendance' && 'Planilla Consolidada de Asistencia y Cuantificación de Carga'}
            </h1>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
              Cuerpo Técnico & Área de Preparación Física · Temporada 2026/27
            </p>
          </div>

          <div className="text-right text-xs font-mono text-slate-400 print:text-slate-600">
            <div>Fecha: {new Date().toLocaleDateString('es-AR')}</div>
            <div>ID Auditoría: #KTX-{Date.now().toString().slice(-6)}</div>
          </div>
        </div>

        {/* VIEW 1: Microcycle Technical Dossier */}
        {reportType === 'microcycle' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <div className="text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold">Sesiones Completadas</div>
                <div className="text-xl font-bold text-white print:text-slate-900 font-mono mt-1">
                  {INITIAL_TRAINING_SESSIONS.length} / 4 Planificadas
                </div>
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <div className="text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold">Carga Acumulada Semanal</div>
                <div className="text-xl font-bold text-emerald-400 print:text-emerald-700 font-mono mt-1">
                  1,877 AU (Media Individual)
                </div>
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <div className="text-[10px] uppercase text-slate-400 print:text-slate-600 font-semibold">Ratio ACWR Grupal</div>
                <div className="text-xl font-bold text-white print:text-slate-900 font-mono mt-1">
                  1.04 (Óptimo Gabbett)
                </div>
              </div>
            </div>

            {/* Structured Sessions Summary */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-900">
                Detalle de Sesiones del Microciclo
              </h3>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 print:bg-slate-200 text-[10px] uppercase font-semibold text-slate-400 print:text-slate-700 border-b border-slate-800 print:border-slate-300">
                  <tr>
                    <th className="py-2 px-3">Día</th>
                    <th className="py-2 px-3">Sesión / Enfoque</th>
                    <th className="py-2 px-2 text-center">Duración</th>
                    <th className="py-2 px-2 text-center">RPE</th>
                    <th className="py-2 px-3 text-right">Carga Foster</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-300 font-mono">
                  {INITIAL_TRAINING_SESSIONS.map(s => (
                    <tr key={s.id}>
                      <td className="py-2.5 px-3 font-bold text-emerald-400 print:text-emerald-700">{s.dayType}</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-200 print:text-slate-900">
                        {s.title}
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-300 print:text-slate-700">{s.durationTotalMin} min</td>
                      <td className="py-2.5 px-2 text-center text-amber-400 print:text-amber-800">{s.targetRPE} / 10</td>
                      <td className="py-2.5 px-3 text-right text-slate-200 print:text-slate-900">{s.plannedLoadAU} AU</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tactical & Medical Notes */}
            <div className="p-4 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 rounded-lg text-xs leading-relaxed">
              <h4 className="font-bold text-slate-200 print:text-slate-900 mb-1">
                Conclusiones Metodológicas del Cuerpo Técnico:
              </h4>
              <p className="text-slate-400 print:text-slate-700">
                El microciclo respetó el principio de alternancia horizontal de la Periodización Táctica. Las cargas de
                tensión excéntrica se concentraron en MD-4 sin reportes lesionales agudos. Thiago Almada y Bruno Costas
                fueron dosificados en MD-2 con trabajo regenerativo preventivo. El plantel presenta un 93.8% de disponibilidad
                para la competencia oficial.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: Individual Athlete Dossier */}
        {reportType === 'athlete' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold">Posición</span>
                <div className="text-base font-bold text-white print:text-slate-900 mt-1">{selectedAthlete.positionLabel}</div>
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold">Ratio ACWR</span>
                <div className="text-base font-bold text-emerald-400 print:text-emerald-700 font-mono mt-1">
                  {selectedAthlete.acwr.toFixed(2)} ({evaluateACWR(selectedAthlete.acwr).label})
                </div>
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold">Carga Semanal</span>
                <div className="text-base font-bold text-white print:text-slate-900 font-mono mt-1">
                  {selectedAthlete.weeklyWorkloadAU} AU
                </div>
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold">Índice Hooper</span>
                <div className="text-base font-bold text-white print:text-slate-900 font-mono mt-1">
                  {selectedAthlete.wellnessScore} / 28 pts
                </div>
              </div>
            </div>

            {/* Performance Stats Breakdown */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-900">
                Evaluación de Capacidades Físico-Técnicas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {Object.entries(selectedAthlete.stats).map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-slate-950 print:bg-slate-100 rounded border border-slate-800 print:border-slate-300 flex justify-between font-mono">
                    <span className="capitalize font-sans text-slate-400 print:text-slate-600">{k}:</span>
                    <span className="font-bold text-white print:text-slate-900">{v} / 100</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Attendance & Workload Table */}
        {reportType === 'attendance' && (
          <div className="flex flex-col gap-4">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 print:bg-slate-200 text-[10px] uppercase font-semibold text-slate-400 print:text-slate-700 border-b border-slate-800 print:border-slate-300">
                <tr>
                  <th className="py-2 px-2 text-center">#</th>
                  <th className="py-2 px-3">Deportista</th>
                  <th className="py-2 px-2 text-center">Pos</th>
                  <th className="py-2 px-3 text-right">Carga Semanal</th>
                  <th className="py-2 px-3 text-center">ACWR</th>
                  <th className="py-2 px-3 text-center">Hooper</th>
                  <th className="py-2 px-3 text-center">Asistencia</th>
                  <th className="py-2 px-3 text-center">Disponibilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300 font-mono">
                {INITIAL_ATHLETES.map(ath => (
                  <tr key={ath.id}>
                    <td className="py-2 px-2 text-center text-slate-400">{ath.number}</td>
                    <td className="py-2 px-3 font-sans font-medium text-slate-200 print:text-slate-900">{ath.name}</td>
                    <td className="py-2 px-2 text-center text-slate-300">{ath.position}</td>
                    <td className="py-2 px-3 text-right text-slate-200 print:text-slate-900">{ath.weeklyWorkloadAU} AU</td>
                    <td className="py-2 px-3 text-center text-emerald-400 print:text-emerald-700 font-bold">{ath.acwr.toFixed(2)}</td>
                    <td className="py-2 px-3 text-center text-slate-300">{ath.wellnessScore}</td>
                    <td className="py-2 px-3 text-center text-slate-200 print:text-slate-900">{ath.attendanceRate}%</td>
                    <td className="py-2 px-3 text-center font-sans">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ath.status === 'ready' ? 'text-emerald-400 print:text-emerald-800' :
                        ath.status === 'caution' ? 'text-amber-400 print:text-amber-800' :
                        ath.status === 'injured' ? 'text-rose-400 print:text-rose-800' : 'text-indigo-400'
                      }`}>
                        {ath.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Official Footer Signature */}
        <div className="mt-8 pt-6 border-t border-slate-800 print:border-slate-300 flex justify-between text-xs text-slate-400 print:text-slate-600">
          <div>
            <div className="font-semibold text-slate-200 print:text-slate-900">Prof. Carlos Bilardo</div>
            <div>Director Técnico Principal</div>
          </div>
          <div>
            <div className="font-semibold text-slate-200 print:text-slate-900">Lic. Mariano Werner</div>
            <div>Preparador Físico / Fisiólogo</div>
          </div>
          <div className="text-right">
            <div>Generado con KineTactix v2.4</div>
            <div>Validado según directrices Gabbett & Borg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
