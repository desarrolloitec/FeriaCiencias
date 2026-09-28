import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  UserCheck,
  AlertCircle,
  Plus,
  Clock,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  Users
} from 'lucide-react';
import { CoachDirective } from '../../types';
import { INITIAL_DIRECTIVES, INITIAL_ATHLETES } from '../../data/mockData';

export const CommunicationModule: React.FC = () => {
  const [directives, setDirectives] = useState<CoachDirective[]>(INITIAL_DIRECTIVES);
  const [selectedDirectiveId, setSelectedDirectiveId] = useState<string>(INITIAL_DIRECTIVES[0].id);
  const [newReplyText, setNewReplyText] = useState<string>('');
  const [replyAuthorName, setReplyAuthorName] = useState<string>('Enzo Fernández V.');
  const [isCreatingDirective, setIsCreatingDirective] = useState<boolean>(false);

  // New Directive Form State
  const [newDirective, setNewDirective] = useState({
    title: '',
    role: 'Director Técnico' as const,
    author: 'Prof. Carlos Bilardo',
    targetGroup: 'Plantel Completo' as const,
    priority: 'alta' as const,
    tacticalFocus: '',
    content: ''
  });

  const activeDirective = directives.find(d => d.id === selectedDirectiveId) || directives[0];

  // Post reply to active directive
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    const replyObj = {
      id: `rep-${Date.now()}`,
      authorName: replyAuthorName,
      role: 'Jugador' as const,
      text: newReplyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDirectives(prev =>
      prev.map(d => {
        if (d.id !== selectedDirectiveId) return d;
        return {
          ...d,
          replies: [...d.replies, replyObj]
        };
      })
    );

    setNewReplyText('');
  };

  // Create new coach directive
  const handleCreateDirective = () => {
    if (!newDirective.title || !newDirective.content) return;

    const created: CoachDirective = {
      id: `dir-${Date.now()}`,
      title: newDirective.title,
      date: new Date().toISOString().split('T')[0],
      author: newDirective.author,
      role: newDirective.role,
      targetGroup: newDirective.targetGroup,
      priority: newDirective.priority,
      tacticalFocus: newDirective.tacticalFocus || 'Compromiso colectivo y concentración',
      content: newDirective.content,
      replies: []
    };

    setDirectives([created, ...directives]);
    setSelectedDirectiveId(created.id);
    setIsCreatingDirective(false);
    setNewDirective({
      title: '',
      role: 'Director Técnico',
      author: 'Prof. Carlos Bilardo',
      targetGroup: 'Plantel Completo',
      priority: 'alta',
      tacticalFocus: '',
      content: ''
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Comunicación & Consignas Internas</span>
              <span>·</span>
              <span>Canal Directo Cuerpo Técnico ⇄ Plantel</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Gestión de Consignas y Retroalimentación</h2>
          </div>

          <button
            onClick={() => setIsCreatingDirective(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Emitir Nueva Consigna Táctica</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Directives List & Interactive Discussion Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directives Feed (1 Col) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Consignas del Cuerpo Técnico ({directives.length})
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {directives.map(d => {
              const isSelected = d.id === selectedDirectiveId;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDirectiveId(d.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      d.priority === 'alta'
                        ? 'bg-rose-950/70 border-rose-800/80 text-rose-300'
                        : 'bg-amber-950/70 border-amber-800/80 text-amber-300'
                    }`}>
                      Prioridad {d.priority}
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono">{d.date}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 line-clamp-2">{d.title}</h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/70">
                    <span className="truncate max-w-[140px] text-slate-300">{d.targetGroup}</span>
                    <span className="flex items-center gap-1 font-mono text-emerald-400">
                      <MessageSquare className="w-3 h-3" />
                      {d.replies.length} respuestas
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Directive Detail & Interaction Thread (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            {/* Directive Header */}
            <div className="border-b border-slate-800 pb-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{activeDirective.author}</span>
                  <span>·</span>
                  <span className="text-emerald-400">{activeDirective.role}</span>
                  <span>·</span>
                  <span className="font-mono">{activeDirective.date}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Destinatario: {activeDirective.targetGroup}
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">{activeDirective.title}</h3>

              {/* Tactical Focus Callout */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <strong className="text-emerald-400 font-semibold block mb-0.5">Foco Técnico-Táctico Clave:</strong>
                {activeDirective.tacticalFocus}
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mt-2 whitespace-pre-line">
                {activeDirective.content}
              </p>
            </div>

            {/* Replies Thread */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Retroalimentación y Dudas de los Jugadores ({activeDirective.replies.length})
              </h4>

              <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
                {activeDirective.replies.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-lg border border-slate-800">
                    Aún no hay respuestas registradas para esta consigna.
                  </div>
                ) : (
                  activeDirective.replies.map(reply => (
                    <div
                      key={reply.id}
                      className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{reply.authorName}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            reply.role === 'DT' || reply.role === 'PF'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {reply.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{reply.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{reply.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Input Box */}
              <form onSubmit={handleSendReply} className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Responder como:</span>
                  <select
                    value={replyAuthorName}
                    onChange={e => setReplyAuthorName(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="Prof. Carlos Bilardo (DT)">Prof. Carlos Bilardo (DT)</option>
                    <option value="Lic. Mariano Werner (PF)">Lic. Mariano Werner (PF)</option>
                    {INITIAL_ATHLETES.slice(0, 8).map(ath => (
                      <option key={ath.id} value={ath.name}>
                        {ath.name} (#{ath.number} - {ath.position})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje, confirmación de consigna o consulta táctica..."
                    value={newReplyText}
                    onChange={e => setNewReplyText(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 text-xs text-slate-100 rounded-lg px-3 py-2.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Create Directive Modal */}
      {isCreatingDirective && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">Emitir Nueva Consigna del Cuerpo Técnico</h3>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium mb-1 block">Título de la Consigna:</label>
                <input
                  type="text"
                  placeholder="Ej: Consigna ABP Defensiva en Saques de Banda"
                  value={newDirective.title}
                  onChange={e => setNewDirective({ ...newDirective, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Destinatarios:</label>
                  <select
                    value={newDirective.targetGroup}
                    onChange={e => setNewDirective({ ...newDirective, targetGroup: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  >
                    <option value="Plantel Completo">Plantel Completo</option>
                    <option value="Bloque Defensivo">Bloque Defensivo</option>
                    <option value="Línea de Mediocampistas">Línea de Mediocampistas</option>
                    <option value="Delanteros">Delanteros</option>
                    <option value="Arqueros">Arqueros</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Nivel de Prioridad:</label>
                  <select
                    value={newDirective.priority}
                    onChange={e => setNewDirective({ ...newDirective, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                  >
                    <option value="alta">Alta (Crítica para el partido)</option>
                    <option value="media">Media (Ajuste progresivo)</option>
                    <option value="baja">Baja (Pauta complementaria)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium mb-1 block">Foco Clave Resumido:</label>
                <input
                  type="text"
                  placeholder="Ej: Presión en menos de 3 segundos post-pérdida"
                  value={newDirective.tacticalFocus}
                  onChange={e => setNewDirective({ ...newDirective, tacticalFocus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium mb-1 block">Contenido Detallado:</label>
                <textarea
                  rows={4}
                  placeholder="Explica detalladamente las consignas, posicionamientos o cuidados físicos solicitados..."
                  value={newDirective.content}
                  onChange={e => setNewDirective({ ...newDirective, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsCreatingDirective(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateDirective}
                className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
              >
                Publicar Consigna
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
