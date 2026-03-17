document.addEventListener('DOMContentLoaded', () => {

    // Sidebar Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.settings-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            // Add active class to clicked tab
            item.classList.add('active');
            
            // Show corresponding section
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Handle Toast Notification
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };

    // Form Submission Details Form
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate and send API request here
            showToast("Personal details updated successfully.");
        });
    }

    // Toggle Switches change simulation
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const settingName = e.target.closest('.setting-item').querySelector('h4').textContent;
            console.log(`${settingName} is now ${isChecked ? 'Enabled' : 'Disabled'}`);
            
            // Just for demonstration, show toast occasionally
            showToast(`${settingName} ${isChecked ? 'Enabled' : 'Disabled'}`);
        });
    });

    // Logout logic
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to logout?")) {
                window.location.href = 'login.html';
            }
        });
    }
});
