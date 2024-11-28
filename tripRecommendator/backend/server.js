require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");


app.use(cors({origin: 'http://localhost:5173',}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const api = 'api-key';

const genAI = new GoogleGenerativeAI(api);
  

async function generateText() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Como experto en viajes, recomiéndame lugares específicos para visitar en: valencia
                       Responde en formato JSON como este ejemplo:
                       [
                         {
                           "id": 1,
                           "title": "Nombre del lugar",
                           "description": "Breve descripción del lugar (máximo 150 caracteres)",
                           "rating": 4.5,
                           "lat": 41.3851,
                           "lng": 2.1734
                         }
                       ]
                       Incluye exactamente 3 lugares. Asegúrate de que las coordenadas sean precisas.
                       IMPORTANTE: Responde SOLO con el JSON, sin texto adicional.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Respuesta de Gemini:', text);

}

generateText();

app.post('/api', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Missing place in request body' });
    }

    try {
        const apiKey = 'api-key';
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