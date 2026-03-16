function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('active');
}

function filterContacts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const contacts = document.querySelectorAll('.contact-item');
    
    contacts.forEach(contact => {
        const name = contact.querySelector('.name').innerText.toLowerCase();
        if (name.includes(input)) {
            contact.style.display = "flex";
        } else {
            contact.style.display = "none";
        }
    });
}