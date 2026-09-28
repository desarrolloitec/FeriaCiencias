# KineTactix - Plataforma de Entrenamiento Deportivo & Pizarra Táctica Digital

> Sistema integral para cuerpos técnicos y atletas que combina pizarra táctica interactiva animada en tiempo real, planificación de microciclos, monitorización de carga interna (**Foster sRPE**), prevención de lesiones mediante el ratio agudo:crónico (**Gabbett ACWR**), analítica con gráficos de radar vectorial y estación interactiva con código QR para la **Feria de Ciencias**.

---

## 🚀 Despliegue en GitHub Pages

Este repositorio ya incluye el flujo automatizado de **GitHub Actions** en `.github/workflows/deploy.yml` y la configuración de rutas relativas en `vite.config.ts`.

### Pasos para activarlo en tu repositorio:

1. Ve a tu repositorio en GitHub: `https://github.com/TU_USUARIO/TU_REPOSITORIO`.
2. Haz clic en la pestaña **Settings** (Configuración) en la parte superior.
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En la sección **Build and deployment > Source**, cambia la opción a:
   👉 **GitHub Actions**
5. Haz un `git push` a tu rama `main` (o pulsa *Run workflow* en la pestaña *Actions*).
6. En 1-2 minutos tu web estará disponible públicamente en:
   ```
   https://TU_USUARIO.github.io/TU_REPOSITORIO/
   ```

---

## 💻 Ejecución en Local

### Requisitos:
* **Node.js** >= 18.0.0
* **npm** >= 9.0.0

### Instrucciones:
```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor local
npm run dev
```

Abre en tu navegador:
```
http://localhost:3000
```

Para probarlo en celulares conectados al mismo Wi-Fi:
```bash
npm run dev -- --host
```

---

## 🔬 Módulos del Sistema

1. **Pizarra Táctica Digital**: Animación de jugadas a 60 FPS, múltiples deportes (Fútbol 11, Sala, Básquetbol), trazado de vectores y exportación de fases (*keyframes*).
2. **Planificación de Sesiones**: Estructuración del microciclo (MD-4 a MD-1) con cálculo automático de unidades arbitrarias (AU).
3. **Control de Carga & ACWR**: Algoritmo de Tim Gabbett para detección temprana de picos de sobreesfuerzo (*Workload Spikes*) y evaluación psicométrica Hooper.
4. **Métricas & Gráficos de Radar**: Comparativa individual y grupal respecto al promedio posicional.
5. **Comunicación Interna**: Hilo de consignas y retroalimentación entre cuerpo técnico y atletas.
6. **Informes Oficiales**: Exportación a CSV e impresión directa en PDF.
7. **Estación Feria de Ciencias**: Generación automática de código QR para escanear en stands y pantallas táctiles con modo pantalla completa.
