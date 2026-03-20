document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('chatToggleBtn');
    const closeBtn = document.getElementById('chatCloseBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle Chat Window
    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.add('open');
        chatInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Handle dummy message sending
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const text = chatInput.value.trim();
        if(!text) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.classList.add('message', 'user');
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);

        // Clear input
        chatInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate Bot Reply
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.classList.add('message', 'bot');
            botMsg.innerHTML = getBotResponse(text);
            chatMessages.appendChild(botMsg);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    });

    // Simple rule-based logic to simulate AI trained on SafePath
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('sos') || lowerInput.includes('emergency') || lowerInput.includes('danger') || lowerInput.includes('help')) {
            return "<strong>Emergency Reminder:</strong> If you are in immediate danger, press the Red Emergency SOS button or call 112. We can silently alert your stored emergency contacts and share your live location.";
        }
        if (lowerInput.includes('route') || lowerInput.includes('path') || lowerInput.includes('direction') || lowerInput.includes('navigate') || lowerInput.includes('safe')) {
            return "To find the safest route, head to the <strong>Dashboard</strong> or <strong>Routes</strong> tab. Enter your start and end locations, and our system will analyze street lighting, recent crime data, and activity levels to generate the safest path for you.";
        }
        if (lowerInput.includes('report') || lowerInput.includes('incident') || lowerInput.includes('unsafe') || lowerInput.includes('crime')) {
            return "You can report an incident or flag an unsafe area via the <strong>Report</strong> tab. Submissions can be completely anonymous to protect your identity while helping the community.";
        }
        if (lowerInput.includes('volunteer') || lowerInput.includes('escort') || lowerInput.includes('companion')) {
            return "Need walking support? You can request a verified volunteer for a safety escort in the SOS Center. If you want to help others, you can apply to become a volunteer in your Profile settings.";
        }
        if (lowerInput.includes('analytic') || lowerInput.includes('risk') || lowerInput.includes('zone') || lowerInput.includes('map') || lowerInput.includes('heat')) {
            return "Check out the <strong>Safety Analytics</strong> page to see real-time risk heatmaps. Green boundaries are low risk, Yellow zones are moderate, and Red zones represent high-risk areas to avoid.";
        }
        if (lowerInput.includes('hi ') || lowerInput === 'hi' || lowerInput.includes('hello') || lowerInput.includes('hey')) {
            return "Hello! I'm your SafePath AI Guide. I can explain how to use our safe routing features, trigger SOS alerts, report incidents, or connect with volunteers. What do you need help with?";
        }
        
        return "I'm a SafePath demo assistant and I'm still learning! You can quickly explore the <strong>Dashboard</strong> for safe routing, the <strong>SOS Center</strong> for emergencies, or the <strong>Report</strong> tab to log an incident.";
    }
});
