
const themeSelect = document.getElementById('theme-select');

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('search-input');

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

// Inicializar el mapa
const map = tt.map({
    key: 'UGp2hsgXicrbOIo9wCfAy2QgUboYITGS',
    container: 'map',
    center: [0, 0], // Coordenadas iniciales
    zoom: 2,
});


searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if(!query){
        alert('Por favor, ingrese un lugar');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();

        if (response.ok) {
            const lat = Number(data.latitude);
            const lon = Number(data.longitude);
            showMap(lat, lon);
        } else {
            console.log('No se encontraron ubicaciones.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function showMap(lat = 0, lon = 0) {
    lat = !isNaN(lat) ? lat : 0;
    lon = !isNaN(lon) ? lon : 0;
    const map = tt.map({
        key: 'UGp2hsgXicrbOIo9wCfAy2QgUboYITGS',
        container: 'map',
        center: [lon, lat],
        zoom: 12,
    });

    //const marker = tt.marker([lat, lon]).addTo(map);
    //marker.bindPopup('Lugar: ' + document.getElementById('destinationInput').value).openPopup();
}