import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;


app.use(cors({origin: 'http://localhost:5173',}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/api', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Missing place in request body' });
    }

    try {
        const apiKey = 'UGp2hsgXicrbOIo9wCfAy2QgUboYITGS';
        const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(query)}.json?key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.results && response.data.results.length > 0) {
            const { lat, lon } = response.data.results[0].position;
            res.json({ latitude: lat, longitude: lon });
        } else {
            res.status(404).json({ error: 'Place not found' });
        } 
    } catch (error) {
        console.error('Error al geocodificar el lugar:', error);
        return res.status(500).json({ error: 'Hubo un problema al procesar la solicitud.' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});








/* const map = tt.map({
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
})

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
} */