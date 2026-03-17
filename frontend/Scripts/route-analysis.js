const greenDark = '#022038';
const safeColor = '#10B981';
const warningColor = '#F59E0B';
const dangerColor = '#EF4444';

// Initialize map centered roughly around Bhubaneswar
const map = L.map('route-map', { zoomControl: true }).setView([20.2961, 85.8245], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    attribution: '&copy; OpenStreetMap' 
}).addTo(map);

// Dummy coordinates for routes
const route1Coords = [
    [20.2961, 85.8245],
    [20.3011, 85.8200],
    [20.3150, 85.8150],
    [20.3350, 85.8100]
];

const route2Coords = [
    [20.2961, 85.8245],
    [20.3050, 85.8300],
    [20.3200, 85.8250],
    [20.3350, 85.8100]
];

const route3Coords = [
    [20.2961, 85.8245],
    [20.3000, 85.8100],
    [20.3100, 85.8050],
    [20.3350, 85.8100]
];

// Draw Polylines (simulated routes)
const route1 = L.polyline(route1Coords, { color: safeColor, weight: 6, opacity: 0.8 }).addTo(map);
const route2 = L.polyline(route2Coords, { color: warningColor, weight: 5, opacity: 0.8, dashArray: "10, 10" }).addTo(map);
const route3 = L.polyline(route3Coords, { color: dangerColor, weight: 5, opacity: 0.8, dashArray: "5, 10" }).addTo(map);

// Add Start and End Markers
L.circleMarker(route1Coords[0], { color: greenDark, fillColor: 'white', fillOpacity: 1, radius: 8 }).addTo(map).bindPopup('Start');
L.circleMarker(route1Coords[route1Coords.length-1], { color: greenDark, fillColor: 'white', fillOpacity: 1, radius: 8 }).addTo(map).bindPopup('Destination');

// Simulated Incident Markers Overlay
const incidentLayer = L.layerGroup([
    L.circleMarker([20.3100, 85.8050], { color: dangerColor, radius: 15, stroke: false, fillOpacity: 0.5 }),
    L.circleMarker([20.3000, 85.8100], { color: dangerColor, radius: 20, stroke: false, fillOpacity: 0.5 }),
    L.circleMarker([20.3200, 85.8250], { color: warningColor, radius: 25, stroke: false, fillOpacity: 0.4 })
]).addTo(map);

// simulated Heatmap Overlays
const heatmapLayer = L.layerGroup([
    L.circle([20.3050, 85.8075], { color: 'red', fillColor: '#f03', fillOpacity: 0.2, radius: 1500, stroke: false }),
    L.circle([20.3200, 85.8250], { color: 'orange', fillColor: 'orange', fillOpacity: 0.2, radius: 1000, stroke: false })
]).addTo(map);


// Map Controls Logic
const heatmapToggle = document.getElementById('heatmapToggle');
const incidentsToggle = document.getElementById('incidentsToggle');

heatmapToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        map.addLayer(heatmapLayer);
    } else {
        map.removeLayer(heatmapLayer);
    }
});

incidentsToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        map.addLayer(incidentLayer);
    } else {
        map.removeLayer(incidentLayer);
    }
});

// Route Card Selection Interaction
const routeCards = document.querySelectorAll('.route-card');
routeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Reset styles for all
        route1.setStyle({ opacity: 0.3 });
        route2.setStyle({ opacity: 0.3 });
        route3.setStyle({ opacity: 0.3 });

        // Highlight selected
        if(index === 0) route1.setStyle({ opacity: 1, weight: 8 });
        if(index === 1) route2.setStyle({ opacity: 1, weight: 8 });
        if(index === 2) route3.setStyle({ opacity: 1, weight: 8 });

        // Fit bounds conceptually (we'll just alert for demo)
        console.log(`Route ${index + 1} selected.`);
    });
});
