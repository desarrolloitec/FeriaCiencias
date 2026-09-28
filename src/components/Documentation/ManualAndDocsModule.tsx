import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  FileCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Activity,
  ArrowRight
} from 'lucide-react';

export const ManualAndDocsModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'manual' | 'sports_science' | 'architecture'>('sports_science');

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Rigor Conceptual & Documentación Oficial</span>
              <span>·</span>
              <span>Memoria Técnica y Guía de Operación</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Manual de Usuario & Documentación Técnica Integral
            </h2>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSection('sports_science')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                activeSection === 'sports_science'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Rigor Conceptual & Metodológico
            </button>
            <button
              onClick={() => setActiveSection('manual')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                activeSection === 'manual'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Manual de Usuario Integral
            </button>
            <button
              onClick={() => setActiveSection('architecture')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                activeSection === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Arquitectura del Sistema
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Rigor Conceptual & Fundamentos Científicos */}
      {activeSection === 'sports_science' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-slate-200 flex flex-col gap-6 shadow-sm leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Fundamentación Teórica y Biomecánica
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Marco Conceptual de las Ciencias del Deporte Aplicadas
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              KineTactix no es un tablero estático: integra modelos matemáticos y fisiológicos validados en la
              literatura científica internacional para la periodización y la prevención del sobreentrenamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Model 1: Gabbett ACWR */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>1. Modelo ACWR (Dr. Tim Gabbett, 2016)</span>
              </div>
              <p className="text-slate-300">
                El ratio de carga aguda:crónica examina la relación entre la carga de entrenamiento reciente (fatiga del
                atleta en los últimos 7 días) y la carga histórica desarrollada (aptitud física o "fitness" acumulado
                en los últimos 28 días).
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-emerald-300">
                Ratio = Carga Aguda (Media 7d) / Carga Crónica (Media 28d)
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li><strong className="text-amber-400">&lt; 0.8:</strong> Subentrenamiento. Pérdida de adaptaciones.</li>
                <li><strong className="text-emerald-400">0.8 - 1.3:</strong> <em>Sweet Spot</em>. Máximo rendimiento con mínimo riesgo.</li>
                <li><strong className="text-orange-400">1.3 - 1.5:</strong> Zona de precaución. Monitorear fatiga.</li>
                <li><strong className="text-rose-400">&gt; 1.5:</strong> Zona de peligro. Riesgo de lesión incrementado hasta 4x.</li>
              </ul>
            </div>

            {/* Model 2: Foster sRPE */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>2. Cuantificación sRPE (Dr. Carl Foster, 2001)</span>
              </div>
              <p className="text-slate-300">
                El método del Session-RPE multiplica la duración total de la sesión (en minutos) por la calificación de
                esfuerzo percibido según la escala modificada de Borg CR-10:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-amber-300">
                Carga de Sesión (AU) = Duración (minutos) × RPE Borg (1-10)
              </div>
              <p className="text-slate-400">
                Proporciona una cuantificación ecológica y no invasiva de la <strong>carga interna</strong>,
                capturando factores fisiológicos (frecuencia cardíaca, acumulación de lactato) y neurocognitivos
                (fatiga mental, estrés de toma de decisiones).
              </p>
            </div>

            {/* Model 3: Tactical Periodization */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>3. Periodización Táctica (Prof. Vítor Frade)</span>
              </div>
              <p className="text-slate-300">
                Metodología donde la dimensión táctica es el núcleo supra-dimensionante. Los días del microciclo
                estandarizado respetan la alternancia horizontal:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li><strong className="text-slate-200">MD-4 (Día de Tensión):</strong> Espacios reducidos, contracciones excéntricas.</li>
                <li><strong className="text-slate-200">MD-3 (Día de Duración):</strong> Espacio amplio 11v11, alta distancia recorrida.</li>
                <li><strong className="text-slate-200">MD-2 (Día de Velocidad):</strong> Máxima aceleración, sin fatiga residual acumulada.</li>
                <li><strong className="text-slate-200">MD-1 (Activación):</strong> Rondos ágiles, repaso de ABP y charla táctica.</li>
              </ul>
            </div>

            {/* Model 4: Hooper Index */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>4. Monitorización Psicométrica (Hooper & Mackinnon, 1995)</span>
              </div>
              <p className="text-slate-300">
                Cuestionario validado que evalúa 4 dimensiones subjetivas en escala 1-7:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Calidad del sueño previo</li>
                <li>Grado de fatiga física general</li>
                <li>Dolor muscular de aparición tardía (DOMS)</li>
                <li>Estrés psicológico y estado anímico</li>
              </ul>
              <p className="text-slate-400 mt-1">
                La suma total permite identificar desbalances del sistema nervioso autónomo antes del calentamiento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Manual de Usuario Integral */}
      {activeSection === 'manual' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-slate-200 flex flex-col gap-6 shadow-sm leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Guía de Operación
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Manual de Usuario Integral del Sistema</h3>
            <p className="text-xs text-slate-400 mt-1">
              Instrucciones operativas paso a paso para el Director Técnico, Preparador Físico y Deportista.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">1. Uso de la Pizarra Táctica Animada</h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>Selecciona el deporte (Fútbol 11, Fútbol Sala o Básquetbol) y el encuadre (Completo, Medio Campo o Área).</li>
                <li>Arrastra los jugadores con el mouse o con el dedo en pantallas táctiles para ubicarlos en sus posiciones.</li>
                <li>Utiliza las herramientas de dibujo: flecha continua para carreras, línea punteada para pases, o zona para prensado zonal.</li>
                <li>Presiona <strong>"Agregar Paso (Keyframe)"</strong> para grabar una nueva etapa de la jugada.</li>
                <li>Presiona <strong>"Simular Jugada"</strong>: el motor matemático interpolará suavemente todas las trayectorias simultáneamente a 60 FPS.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-amber-400 mb-2">2. Estructuración y Planificación de Sesiones</h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>Accede al módulo <strong>"Planificación"</strong> y selecciona el día del microciclo (MD-4 a MD-1).</li>
                <li>Inserta bloques de entrenamiento: Calentamiento, Fase Principal, Situación Real o Vuelta a la Calma.</li>
                <li>Puedes vincular directamente una jugada diseñada en la pizarra táctica para que los atletas la repasen.</li>
                <li>El sistema calcula automáticamente la carga planificada en Unidades Arbitrarias (sRPE).</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-sky-400 mb-2">3. Control de Asistencia y Prevención de Lesiones</h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                <li>En la pestaña <strong>"Control de Carga"</strong>, visualiza el semáforo fisiológico de cada deportista.</li>
                <li>Si un atleta supera el ratio ACWR de 1.30 o 1.50, modifícale su estado a <em>"Alerta Fatiga"</em> o <em>"Diferenciado"</em>.</li>
                <li>Abre el formulario de <strong>Test de Bienestar Hooper</strong> para registrar dolores musculares antes de iniciar la práctica.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-purple-400 mb-2">4. Exportación e Impresión de Reportes</h4>
              <p className="text-slate-300">
                En el módulo <strong>"Informes"</strong>, puedes generar en 1 clic planillas imprimibles optimizadas
                para A4 o descargar las tablas en formato CSV para su posterior análisis en Microsoft Excel o R.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Arquitectura Técnica de Software */}
      {activeSection === 'architecture' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-slate-200 flex flex-col gap-6 shadow-sm leading-relaxed">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Ingeniería de Software
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Arquitectura Tecnológica del Sistema KineTactix</h3>
            <p className="text-xs text-slate-400 mt-1">
              Especificaciones de diseño para alto rendimiento en pantallas táctiles y estaciones interactivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Cpu className="w-4 h-4" />
                <span>Motor de Animación</span>
              </div>
              <p className="text-slate-300">
                Basado en <code>requestAnimationFrame</code> con interpolación polinómica suave (cúbica hermítica).
                No sufre tirones ni latencia al sincronizar hasta 22 jugadores y el balón en simultáneo.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>Diseño Táctil Universal</span>
              </div>
              <p className="text-slate-300">
                Soporte dual para punteros táctiles (Touch Events) y mouse con targets de contacto superiores a 44px,
                previniendo gestos accidentales de zoom en el stand de la Feria de Ciencias.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Code2 className="w-4 h-4" />
                <span>Persistencia & Exportación</span>
              </div>
              <p className="text-slate-300">
                Arquitectura desacoplada en React 19 y TypeScript estricto. Generación nativa de QR sin llamadas
                externas que dependan de conexión a internet durante la muestra de ciencias.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
