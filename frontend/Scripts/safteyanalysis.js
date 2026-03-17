const greenDark = '#022038';
const greenMed = '#14B8A6';
const greenLight = '#99f6e4';
const greyLight = '#E5E7EB';

// Trend Chart
const ctxTrend = document.getElementById('trendChart').getContext('2d');
new Chart(ctxTrend, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: 'Reported Incidents',
            data: [120, 150, 110, 90, 180, 130, 85, 95, 100, 34, 345, 127],
            borderColor: greenDark,
            backgroundColor: 'rgba(68, 92, 72, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

// Offenses Chart
const ctxOffenses = document.getElementById('offensesChart').getContext('2d');
new Chart(ctxOffenses, {
    type: 'bar',
    data: {
        labels: ['Theft', 'Rape', 'Assault', 'Misbehave'],
        datasets: [
            { label: 'Day', data: [120, 45, 30, 15], backgroundColor: greenDark },
            { label: 'Evening', data: [150, 60, 45, 30], backgroundColor: greenMed },
            { label: 'Night', data: [80, 90, 65, 85], backgroundColor: greenLight }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } }, scales: { x: { grid: { display: false } } } }
});

// Safety Chart
const ctxSafety = document.getElementById('safetyChart').getContext('2d');
new Chart(ctxSafety, {
    type: 'doughnut',
    data: { labels: ['Score', 'Remaining'], datasets: [{ data: [82, 18], backgroundColor: [greenMed, greyLight], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '80%', circumference: 180, rotation: 270, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
});

// Status Chart
const ctxStatus = document.getElementById('statusChart').getContext('2d');
new Chart(ctxStatus, {
    type: 'doughnut',
    data: { labels: ['Closed', 'Open'], datasets: [{ data: [92, 8], backgroundColor: [greenDark, greyLight], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '85%', rotation: 180, plugins: { legend: { display: false } } }
});

// Leaflet Map Initialization
const map = L.map('map', { zoomControl: true }).setView([20.2961, 85.8245], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);

const marker = L.circleMarker([20.2961, 85.8245], {
    color: greenDark, fillColor: greenDark, fillOpacity: 0.8, radius: 30
}).addTo(map);

marker.bindTooltip("<b style='color:white; font-size: 14px;'>82% Safe</b>", {
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