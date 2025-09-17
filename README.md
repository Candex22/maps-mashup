# 🌍 Rastreo en Tiempo Real + Mashup 🎵

Una aplicación web interactiva que simula rastreo de ubicación en tiempo real mostrando ubicaciones famosas del mundo cada 2 segundos, con integración de audio mashup y funcionalidades de geolocalización real.

## ✨ Características

- **Rastreo Automático**: Actualización de ubicación cada 2 segundos con lugares famosos mundiales
- **Mapa Interactivo**: Visualización con Google Maps en modo oscuro elegante
- **Audio Mashup**: Reproducción de sonidos con fallback a Web Audio API
- **Geolocalización Real**: Opción para mostrar tu ubicación actual
- **Controles Intuitivos**: Pausar, reanudar y controlar el rastreo
- **Diseño Responsivo**: Interface moderna con efectos glassmorphism
- **Animaciones**: Marcador animado y efectos visuales suaves

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos

1. **Clave de Google Maps API**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto o selecciona uno existente
   - Habilita la API de Google Maps JavaScript
   - Genera una clave API
   - Reemplaza `AIzaSyCH1JRV5RqeitnUDWMcckW38Us1qg19550` en `index.html` con tu clave

2. **Servidor Web Local**
   - El proyecto necesita ejecutarse desde un servidor web (no funciona abriendo directamente el HTML)

### Opciones para Ejecutar

#### Opción 1: Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Opción 2: Node.js
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar en la carpeta del proyecto
http-server -p 8000
```

#### Opción 3: PHP
```bash
php -S localhost:8000
```

#### Opción 4: Live Server (VS Code) --> (Recomendado)
- Instala la extensión "Live Server" en VS Code
- Click derecho en `index.html` → "Open with Live Server"

### Acceso
Abre tu navegador y ve a `http://localhost:8000`

## 🎵 Configuración de Audio

### Estructura de Archivos de Audio

Crea una carpeta `assets/` en la raíz del proyecto y coloca tu archivo de audio:

```
proyecto/
├── index.html
├── script.js
├── style.css
└── assets/
    └── sonido_mashup.mp3  # Tu archivo de audio aquí
```

### Formatos Soportados

El proyecto está configurado para buscar audio en estos formatos (en orden de preferencia):
1. `assets/sonido_mashup.mp3` (MP3)
2. `assets/sonido_mashup.wav` (WAV)
3. `assets/sonido_mashup.m4a` (M4A/AAC)

### Cómo Agregar tu Propia Música

#### Método 1: Reemplazar Archivo
1. Renombra tu archivo de audio a `sonido_mashup.mp3`
2. Colócalo en la carpeta `assets/`
3. ¡Listo! La aplicación lo detectará automáticamente

#### Método 2: Cambiar Nombre del Archivo
Si quieres mantener el nombre original de tu archivo:

1. Edita `index.html`, líneas 44-48:
```html
<audio id="audio" preload="auto">
  <source src="assets/tu_archivo.mp3" type="audio/mpeg">
  <source src="assets/tu_archivo.wav" type="audio/wav">
  <source src="assets/tu_archivo.m4a" type="audio/mp4">
</audio>
```

2. Reemplaza `tu_archivo` con el nombre de tu archivo (sin extensión)

### Fallback de Audio

Si no hay archivo de audio disponible, la aplicación genera automáticamente una secuencia musical usando Web Audio API con las notas Do-Mi-Sol-Do.

## 🗺️ Ubicaciones Incluidas

El sistema rota entre estas ubicaciones famosas:
- Buenos Aires, Argentina 🇦🇷
- Nueva York, EE.UU. 🇺🇸
- Londres, Reino Unido 🇬🇧
- Tokio, Japón 🇯🇵
- Sídney, Australia 🇦🇺
- París, Francia 🇫🇷
- Río de Janeiro, Brasil 🇧🇷
- Moscú, Rusia 🇷🇺
- Ciudad de México, México 🇲🇽

### Agregar Nuevas Ubicaciones

Edita el array `famousLocations` en `script.js`:

```javascript
const famousLocations = [
  { lat: -34.6037, lng: -58.3816, name: "Buenos Aires, Argentina" },
  { lat: TU_LATITUD, lng: TU_LONGITUD, name: "Tu Ciudad, Tu País" },
  // ... más ubicaciones
];
```

## 🎛️ Controles de la Aplicación

- **🎵 Reproducir Mashup**: Reproduce el audio configurado
- **📍 Mi Ubicación Real**: Obtiene y muestra tu ubicación actual
- **⏸️ Pausar Rastreo**: Detiene las actualizaciones automáticas
- **▶️ Reanudar Rastreo**: Reactiva el rastreo automático

## 🛠️ Estructura del Proyecto

```
proyecto/
├── index.html          # Estructura HTML principal
├── script.js          # Lógica JavaScript y Google Maps
├── style.css          # Estilos CSS con glassmorphism
└── assets/           # Carpeta para archivos multimedia
    └── sonido_mashup.mp3  # Archivo de audio (opcional)
```

## 🔧 Personalización

### Cambiar Intervalo de Actualización
En `script.js`, línea 53, modifica el valor (en milisegundos):
```javascript
updateInterval = setInterval(() => {
  // 2000ms = 2 segundos
}, 2000);
```

### Modificar Estilos del Mapa
En `script.js`, el objeto `styles` del mapa puede personalizarse con diferentes temas de Google Maps.

### Ajustar Zoom Inicial
En `script.js`, línea 21:
```javascript
zoom: 12, // Cambia este valor (1-20)
```

## 🌐 Navegadores Soportados

- ✅ Chrome/Chromium (Recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (funcionalidad limitada)

## 🔒 Notas de Seguridad

- La clave de Google Maps API debe estar configurada con restricciones apropiadas
- La geolocalización requiere HTTPS en producción
- Los archivos de audio deben cumplir con las políticas de reproducción automática del navegador

## 📱 Uso en Móviles

La aplicación es completamente responsiva y funciona en dispositivos móviles. La geolocalización es especialmente útil en smartphones.

## 🐛 Solución de Problemas

### El mapa no carga
- Verifica que tu clave de Google Maps API sea válida
- Asegúrate de que la API de JavaScript Maps esté habilitada
- Revisa la consola del navegador para errores

### El audio no reproduce
- Verifica que el archivo esté en la carpeta `assets/`
- Algunos navegadores requieren interacción del usuario antes de reproducir audio
- El fallback de Web Audio API se activará automáticamente si hay problemas

### Error de geolocalización
- La geolocalización requiere HTTPS en la mayoría de navegadores modernos
- Asegúrate de permitir el acceso a la ubicación cuando el navegador lo solicite
