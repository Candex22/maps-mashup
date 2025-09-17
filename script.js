 let map;
    let marker;
    let updateInterval;
    let updateCount = 0;
    let isTracking = true;

    const famousLocations = [
      { lat: -34.6037, lng: -58.3816, name: "Buenos Aires, Argentina" },
      { lat: 40.7128, lng: -74.0060, name: "Nueva York, EE.UU." },
      { lat: 51.5074, lng: -0.1278, name: "Londres, Reino Unido" },
      { lat: 35.6762, lng: 139.6503, name: "Tokio, Japón" },
      { lat: -33.8688, lng: 151.2093, name: "Sídney, Australia" },
      { lat: 48.8566, lng: 2.3522, name: "París, Francia" },
      { lat: -22.9068, lng: -43.1729, name: "Río de Janeiro, Brasil" },
      { lat: 55.7558, lng: 37.6176, name: "Moscú, Rusia" },
      { lat: 19.4326, lng: -99.1332, name: "Ciudad de México, México" }
    ];

    function initMap() {
      const posicionInicial = { lat: -34.6037, lng: -58.3816 };
      
      map = new google.maps.Map(document.getElementById('map'), {
        center: posicionInicial,
        zoom: 12,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{"lightness": -80}]
          },
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#746855"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#17263c"}]
          }
        ]
      });

      // Crear marcador inicial
      marker = new google.maps.Marker({
        position: posicionInicial,
        map: map,
        title: 'Ubicación Actual',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="10" fill="#FF6B6B" stroke="#fff" stroke-width="3"/>
              <circle cx="15" cy="15" r="4" fill="#fff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(30, 30)
        }
      });

      // Iniciar actualizaciones automáticas
      startTracking();
      updateLocationInfo(posicionInicial.lat, posicionInicial.lng, "Buenos Aires, Argentina");
    }

    function startTracking() {
      if (updateInterval) clearInterval(updateInterval);
      updateInterval = setInterval(() => {
        if (isTracking) {
          updateLocationWithFamousPlace();
        }
      }, 2000);
      document.getElementById('status').textContent = 'Rastreando - Actualizaciones automáticas activas';
    }

    function stopTracking() {
      isTracking = false;
      document.getElementById('status').textContent = 'Pausado - Rastreo detenido';
    }

    function resumeTracking() {
      isTracking = true;
      document.getElementById('status').textContent = 'Rastreando - Actualizaciones automáticas activas';
    }

    function updateLocationWithFamousPlace() {
      const randomLocation = famousLocations[Math.floor(Math.random() * famousLocations.length)];
      const lat = randomLocation.lat;
      const lng = randomLocation.lng;
      const name = randomLocation.name;

      const newPosition = new google.maps.LatLng(lat, lng);
      
      map.setCenter(newPosition);
      marker.setPosition(newPosition);
      
      updateLocationInfo(lat, lng, name);
      updateCount++;
      document.getElementById('update-counter').textContent = `Actualizaciones: ${updateCount}`;
      
      // Efecto visual en el mapa
      animateMarker();
    }

    function updateLocationInfo(lat, lng, locationName) {
      document.getElementById('location-info').textContent = 
        `Latitud: ${lat.toFixed(4)}, Longitud: ${lng.toFixed(4)}`;
      document.getElementById('location-name').textContent = locationName || 'Ubicación desconocida';
    }

    function animateMarker() {
      // Efecto de bounce en el marcador
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1400);
    }

    function playMashupSound() {
      const audio = document.getElementById('audio');
      
      // Si no hay archivo de audio, generar sonido con Web Audio API
      if (!audio.src || audio.error) {
        playGeneratedSound();
        return;
      }

      audio.currentTime = 0; // Reiniciar desde el principio
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            document.getElementById('status').textContent = 'Reproduciendo mashup 🎵';
            setTimeout(() => {
              document.getElementById('status').textContent = 'Rastreando - Actualizaciones automáticas activas';
            }, 2000);
          })
          .catch((error) => {
            console.log('Error al reproducir audio:', error);
            playGeneratedSound(); // Fallback
          });
      }
    }

    function playGeneratedSound() {
      // Generar sonido usando Web Audio API como fallback
      if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        // Crear una secuencia de tonos
        const frequencies = [261.63, 329.63, 392.00, 523.25]; // Do, Mi, Sol, Do
        
        frequencies.forEach((freq, index) => {
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
          
          oscillator.start(audioCtx.currentTime + (index * 0.2));
          oscillator.stop(audioCtx.currentTime + 0.5 + (index * 0.2));
        });
        
        document.getElementById('status').textContent = 'Sonido generado 🎵 (usando Web Audio API)';
      } else {
        document.getElementById('status').textContent = '⚠️ Audio no disponible en este navegador';
      }
    }

    function getCurrentLocation() {
      if (navigator.geolocation) {
        document.getElementById('status').textContent = 'Obteniendo ubicación real...';
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const newPosition = new google.maps.LatLng(lat, lng);
            
            map.setCenter(newPosition);
            map.setZoom(15);
            marker.setPosition(newPosition);
            
            updateLocationInfo(lat, lng, 'Tu ubicación actual');
            document.getElementById('status').textContent = 'Ubicación real obtenida ✅';
            
            // Pausar rastreo automático temporalmente
            isTracking = false;
            setTimeout(() => {
              isTracking = true;
              document.getElementById('status').textContent = 'Rastreando - Actualizaciones automáticas activas';
            }, 5000);
          },
          (error) => {
            console.error('Error obteniendo ubicación:', error);
            document.getElementById('status').textContent = '⚠️ No se pudo obtener la ubicación real';
          }
        );
      } else {
        document.getElementById('status').textContent = '⚠️ Geolocalización no disponible';
      }
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('btn-sound').addEventListener('click', playMashupSound);
      document.getElementById('btn-location').addEventListener('click', getCurrentLocation);
      document.getElementById('btn-stop').addEventListener('click', stopTracking);
      document.getElementById('btn-start').addEventListener('click', resumeTracking);
    });