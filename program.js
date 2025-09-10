var map = L.map('map').setView([4.6665620082695645, -74.13198905022493], 13);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([4.6665620082695645, -74.13198905022493]).addTo(map);
var marker = L.marker([4.291401649833343, -70.61174617967207]).addTo(map);


// Función para cargar un archivo GeoJSON en un mapa Leaflet
function cargarGeoJSON(Paradero_SITP.geojson, map, estiloPersonalizado) {
    /*
    Parámetros:
    - rutaArchivo: string - La ruta o URL del archivo GeoJSON
    - map: objeto L.Map - El mapa de Leaflet donde se mostrarán los datos
    - estiloPersonalizado: objeto (opcional) - Estilos personalizados para las features
    
    Cómo usar:
    1. Primero crea un mapa Leaflet: var map = L.map('map').setView([lat, lng], zoom);
    2. Llama a esta función: cargarGeoJSON('Paradero_SITP.geojson', map);
    */
    
    // Usamos fetch para obtener el archivo GeoJSON
    fetch(rutaArchivo)
        .then(function(respuesta) {
            // Convertimos la respuesta a formato JSON
            return respuesta.json();
        })
        .then(function(datosGeoJSON) {
            // Creamos una capa GeoJSON con los datos obtenidos
            var capaGeoJSON = L.geoJSON(datosGeoJSON, {
                // Aplicamos estilos personalizados si se proporcionaron
                style: estiloPersonalizado || {
                    color: '#3388ff',    // Color del borde
                    weight: 2,           // Grosor de la línea
                    opacity: 0.8,        // Transparencia del borde
                    fillOpacity: 0.3,    // Transparencia del relleno
                    fillColor: 'blue'    // Color del relleno
                },
                
                // Función que se ejecuta cuando se hace clic en una feature
                onEachFeature: function(feature, layer) {
                    // Si la feature tiene propiedades, las mostramos en un popup
                    if (feature.properties) {
                        var popupContent = '<div><strong>Propiedades:</strong><br>';
                        
                        // Recorremos todas las propiedades y las mostramos
                        for (var propiedad in feature.properties) {
                            popupContent += propiedad + ': ' + feature.properties[propiedad] + '<br>';
                        }
                        popupContent += '</div>';
                        
                        // Asignamos el popup a la capa
                        layer.bindPopup(popupContent);
                    }
                }
            });
            
            // Añadimos la capa GeoJSON al map (tu objeto se llama map, no mapa)
            capaGeoJSON.addTo(map);
            
            // Ajustamos la vista del map para que muestre todos los datos
            map.fitBounds(capaGeoJSON.getBounds());
            
            console.log('GeoJSON cargado exitosamente!');
        })
        .catch(function(error) {
            // Manejo de errores
            console.error('Error al cargar el GeoJSON:', error);
            alert('No se pudo cargar el archivo GeoJSON. Verifica la ruta.');
        });
}

// EJEMPLO DE USO COMPLETO:
/*
// 1. HTML básico:
<div id="map" style="height: 500px; width: 100%;"></div>

// 2. Incluir librerías Leaflet en el HTML:
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

// 3. JavaScript:
// Crear el map base (ajusta las coordenadas según tu ubicación)
var map = L.map('map').setView([4.6097, -74.0817], 12); // Coordenadas de Bogotá

// Añadir capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 4. Llamar a la función con tu archivo GeoJSON
cargarGeoJSON('Paradero_SITP.geojson', map);

// Opcional: con estilos personalizados para los paraderos
var estilosParaderos = {
    color: 'red',           // Borde rojo
    weight: 3,              // Línea más gruesa
    fillColor: 'yellow',    // Relleno amarillo
    fillOpacity: 0.7,       // Más opaco
    radius: 6               // Tamaño del punto
};
cargarGeoJSON('Paradero_SITP.geojson', map, estilosParaderos);
*/