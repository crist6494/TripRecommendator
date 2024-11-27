
const themeSelect = document.getElementById('theme-select');

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('search-input');

themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    console.log(theme);
    if(theme === 'clear') {
        document.documentElement.style.setProperty('--background-color', '#cdcdcdc1');
        document.documentElement.style.setProperty('--text-color', '#26282b');
    }
    if(theme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#26282b');
        document.documentElement.style.setProperty('--text-color', '#e7ecf0');
    }
});


const suggest_places = [
    {
        imgSrc: './resources/japon.jpg',
        title: 'Japón',
        description: 'Japan is a beautiful and fascinating country, known for its unique blend of ancient traditions and modern innovations. From the serene temples and stunning gardens to the vibrant cityscapes and cutting-edge technology, Japan offers a rich cultural experience',
        rating: '⭐⭐⭐⭐⭐',
    },
    {
        imgSrc: './resources/japon.jpg',
        title: 'Japón',
        description: 'Japan is a beautiful and fascinating country, known for its unique blend of ancient traditions and modern innovations. From the serene temples and stunning gardens to the vibrant cityscapes and cutting-edge technology, Japan offers a rich cultural experience',
        rating: '⭐⭐⭐⭐⭐',
    },
    {
        imgSrc: './resources/japon.jpg',
        title: 'Japón',
        description: 'Japan is a beautiful and fascinating country, known for its unique blend of ancient traditions and modern innovations. From the serene temples and stunning gardens to the vibrant cityscapes and cutting-edge technology, Japan offers a rich cultural experience',
        rating: '⭐⭐⭐⭐⭐',
    },
]


const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const mapModal = document.getElementById('mapModal');
const placesContainer = document.querySelector('#places-containers');
const backgroundOverlay = document.getElementById('backgroundOverlay');

suggest_places.forEach((place) => {

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');
    
    const card = document.createElement('div');
    card.classList.add('card');
    
    const placeBanner = document.createElement('div');
    placeBanner.classList.add('place-banner');
    
    const img = document.createElement('img');
    img.src = place.imgSrc;
    img.alt = "Imagen del lugar";
    img.classList.add('card-img-top');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'd-flex', 'flex-column', 'align-items-center');
    
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
    button.textContent = 'Ver en el mapa';

    button.addEventListener('click', () => {
        mapModal.showModal();
        showMap(35.6762, 139.6503);
        backgroundOverlay.style.display = 'block';
    });

    placeBanner.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(ratingSpan);
    cardBody.appendChild(button);
    card.appendChild(placeBanner);
    card.appendChild(cardBody);
    col.appendChild(card);

    placesContainer.appendChild(col);
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


  // Función para cerrar el modal
  closeModalBtn.addEventListener('click', () => {
    mapModal.close();
    backgroundOverlay.style.display = 'none';
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