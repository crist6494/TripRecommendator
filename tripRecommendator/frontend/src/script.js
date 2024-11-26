
const themeSelect = document.getElementById('theme-select');
const apiKey = 'UGp2hsgXicrbOIo9wCfAy2QgUboYITGS';

themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    console.log(theme);
    if(theme === 'clear') {
        document.documentElement.style.setProperty('--background-color', '#e7ecf0');
        document.documentElement.style.setProperty('--text-color', '#26282b');
    }
    if(theme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#26282b');
        document.documentElement.style.setProperty('--text-color', '#e7ecf0');
    }
});

const map = tt.map({
    key: apiKey,
    container: 'map',
    center: [-74.0060, 40.7128],
    zoom: 16,
    pitch: 60,
});

map.addControl(new tt.FullscreenControl(), );
map.addControl(new tt.NavigationControl());
/* map.on('load', function() {
    removePoiLayers();
    requestAnimationFrame(rotateCamera);
}) */

map.on('click', function(e) {
    // Obtén las coordenadas donde se hizo clic
    const coordinates = e.lngLat;
    console.log('Coordenadas clickeadas: ', coordinates);

    // Crear un marcador en las coordenadas clickeadas
    const marker = new tt.Marker()
        .setLngLat(coordinates)
        .addTo(map);

    // Crear una ventana emergente (popup) con una imagen o cualquier contenido
    const popup = new tt.Popup()
        .setLngLat(coordinates)
        .setHTML('<h3>¡Has hecho clic aquí!</h3><img src="https://via.placeholder.com/150" alt="Imagenss" />')
        .addTo(map);
});
function removePoiLayers() {
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.type === 'symbol' && layer['source-layer'] === 'Point of Interest') {
            map.removeLayer(layer.id);
        }
    }
}
function rotateCamera(timestamp) {
    var rotationDegree = timestamp / 100 % 360;
    map.rotateTo(rotationDegree, { duration: 0 });
    requestAnimationFrame(rotateCamera);
} 