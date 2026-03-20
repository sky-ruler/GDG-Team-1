const greenDark = '#022038';

// Leaflet Map Initialization
const map = L.map('map', { zoomControl: true }).setView([20.2961, 85.8245], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);

const marker = L.circleMarker([20.2961, 85.8245], {
    color: greenDark, fillColor: greenDark, fillOpacity: 0.8, radius: 30
}).addTo(map);

marker.bindTooltip("<b style='color:white; font-size: 14px;'>Safe Zone</b>", {
    permanent: true, direction: 'center', className: 'map-label'
}).openTooltip();

// Map Expansion Logic
const mapSection = document.querySelector('.map-section');
const expandBtn = document.getElementById('expandBtn');

expandBtn.addEventListener('click', () => {
    mapSection.classList.toggle('expanded');
    
    if (mapSection.classList.contains('expanded')) {
        expandBtn.innerHTML = '&#10006;';
        expandBtn.title = "Close Map";
    } else {
        expandBtn.innerHTML = '&#9974;';
        expandBtn.title = "Expand Map";
    }

    // Delay invalidating size to allow CSS transition to finish
    setTimeout(() => {
        map.invalidateSize();
    }, 350); 
});

window.addEventListener('load', () => {
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});
