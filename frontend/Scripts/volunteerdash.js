document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Map
    const map = L.map('v-map', { zoomControl: true }).setView([20.2961, 85.8245], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Mock incident markers
    const sosMarker = L.circleMarker([20.3061, 85.8145], {
        color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.8, radius: 10
    }).addTo(map);
    sosMarker.bindPopup("<b>SOS Alert</b><br>Near Central Mall").openPopup();

    const escortMarker = L.circleMarker([20.3561, 85.8155], {
        color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.8, radius: 10
    }).addTo(map);
    escortMarker.bindPopup("<b>Safety Escort</b><br>KIIT Road");

    // Fix map size on container load
    setTimeout(() => {
        map.invalidateSize();
    }, 200);

    // 2. Duty Status Toggle
    const toggleBtn = document.getElementById('dutyToggleBtn');
    const statusText = document.getElementById('dutyStatusText');
    const requestsList = document.querySelector('.requests-list');

    // Default offline state
    let isOnline = false;
    requestsList.style.opacity = '0.5';
    requestsList.style.pointerEvents = 'none';

    toggleBtn.addEventListener('change', (e) => {
        isOnline = e.target.checked;
        if (isOnline) {
            statusText.textContent = "On Duty - Ready";
            statusText.classList.add('status-on');
            requestsList.style.opacity = '1';
            requestsList.style.pointerEvents = 'auto';
        } else {
            statusText.textContent = "Currently Offline";
            statusText.classList.remove('status-on');
            requestsList.style.opacity = '0.5';
            requestsList.style.pointerEvents = 'none';
        }
    });

    // 3. Accept Request Logic
    window.acceptRequest = function(reqId) {
        if (!isOnline) return;
        
        const card = document.getElementById(reqId);
        if(card) {
            // Update UI to show accepted
            const actionsDiv = card.querySelector('.req-actions');
            actionsDiv.innerHTML = `<button class="btn-accept" style="width:100%; background:#022038; cursor:default;">Routing in Progress...</button>`;
            
            // Show toast
            const toast = document.getElementById('v-toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                // Remove card after a short delay
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }, 3000);
        }
    }
    
    // Ignore Request Logic
    document.querySelectorAll('.btn-ignore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!isOnline) return;
            const card = e.target.closest('.request-card');
            if(card) {
                card.style.display = 'none';
            }
        });
    });
});
