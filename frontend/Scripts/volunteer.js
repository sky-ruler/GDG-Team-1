document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('volunteerForm');
    const toast = document.getElementById('toast');
    
    // Handle file input changes to show selected file name
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const msgSpan = e.target.previousElementSibling;
                msgSpan.textContent = fileName;
                msgSpan.style.color = '#14B8A6';
                msgSpan.style.fontWeight = '500';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success toast
        toast.classList.add('show');
        
        // Reset form
        form.reset();
        
        // Reset file input messages
        document.querySelectorAll('.file-msg').forEach(msg => {
            msg.textContent = 'Drag & drop or click to upload';
            msg.style.color = '#64748B';
            msg.style.fontWeight = 'normal';
        });

        // Hide toast after 3 seconds and redirect back to profile page
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 400); // Wait for transition out
        }, 3000);
    });
});
