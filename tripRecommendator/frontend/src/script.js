const themeSelect = document.getElementById('theme-select');

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('search-input');
const closeModalBtn = document.getElementById('close-modal-btn');

const mapModal = document.querySelector('dialog');
const placesContainer = document.querySelector('#places-containers');
const backgroundOverlay = document.getElementById('backgroundOverlay');

const suggest_places = [
    {
        imgSrc: './resources/japon.jpg',
        title: 'Japan',
        description: 'Japan is a beautiful and fascinating country, known for its unique blend of ancient traditions and modern innovations.',
        rating: '⭐⭐⭐⭐',
        coords:{lat:35.6762, lon:139.6503}
    },
    {
        imgSrc: './resources/malaga.jpg',
        title: 'Málaga',
        description: 'Málaga is a vibrant city on Spain, Costa del Sol, known for its stunning blend of history, and Mediterranean charm.',
        rating: '⭐⭐⭐⭐⭐',
        coords:{lat:36.7213, lon:-4.4217}
    },
    {
        imgSrc: './resources/nueva-york.jpeg',
        title: 'New York',
        description: 'New York City is a dazzling metropolis, famous for its iconic skyline, diverse culture, and endless energy',
        rating: '⭐⭐⭐⭐',
        coords:{lat:40.7128, lon:-74.0060}
    },
]

suggest_places.forEach((place) => {

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-4');
    
    const card = document.createElement('div');
    card.classList.add('card');
    
    const imgBanner = document.createElement('div');
    imgBanner.style.height = '180px';
    
    const img = document.createElement('img');
    img.src = place.imgSrc;
    img.alt = "Place-img";
    img.classList.add('card-img-top');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'd-flex', 'flex-column', 'align-items-center', );
    
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = place.title;
    
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = place.description;
    
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = place.rating;
    
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-warning', 'mt-3');
    button.textContent = 'Show map';

    button.addEventListener('click', () => {
        mapModal.showModal();
        showMap(place.coords.lat, place.coords.lon);
        backgroundOverlay.style.display = 'block';
    });

    imgBanner.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(ratingSpan);
    cardBody.appendChild(button);
    card.appendChild(imgBanner);
    card.appendChild(cardBody);
    col.appendChild(card);

    placesContainer.appendChild(col);
});

function showMap(lat = 0, lon = 0) {
    lat = !isNaN(lat) ? lat : 0;
    lon = !isNaN(lon) ? lon : 0;
    const map = tt.map({
        key: import.meta.env.VITE_TT_API_KEY,
        container: 'map',
        center: [lon, lat],
        zoom: 10,
    });
    map.addControl(new tt.FullscreenControl(), 'top-left');
    map.addControl(new tt.NavigationControl(), 'top-left');
    var marker = new tt.Marker({ draggable: true }).setLngLat([lon, lat]).addTo(map);

}

closeModalBtn.addEventListener('click', () => {
    mapModal.close();
    backgroundOverlay.style.display = 'none';
});

themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    if(theme === 'clear') {
        document.documentElement.style.setProperty('--background-color', '#cdcdcdc1');
        document.documentElement.style.setProperty('--text-color', '#26282b');
    }
    if(theme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#26282b');
        document.documentElement.style.setProperty('--text-color', '#e7ecf0');
    }
});



/* searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if(!query){
        alert('Por favor, ingrese un lugar');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/ia', {
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
}); */
