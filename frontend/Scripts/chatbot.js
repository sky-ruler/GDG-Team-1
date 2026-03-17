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
            botMsg.textContent = "I'm a demo assistant for SafePath! This feature will be powered by AI soon.";
            chatMessages.appendChild(botMsg);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    });
});
