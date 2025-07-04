// Dark mode toggle (keep this as is)
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Smooth scrolling for anchor links (keep this as is)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ accordion functionality (keep this as is)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });
        if (!isActive) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            question.classList.remove('active');
            answer.style.maxHeight = null;
        }
    });
});

// Chat button functionality (keep this as is)
const chatButton = document.getElementById('chatButton');
chatButton.addEventListener('click', () => {
    alert("Hello! Our team is here to help. For immediate assistance, call +254 700 123456 or email support@clippr.app");
});

// Initialize first FAQ item as open (keep this as is)
document.querySelector('.faq-question').click();

// Main dashboard access functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dashboard elements
    const dashboardSection = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Modal elements
    const modal = document.getElementById('trialModal');
    const signupForm = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    const closeModal = document.querySelector('.close-modal');
    const trialForm = document.getElementById('trialForm');
    const goToDashboard = document.getElementById('goToDashboard');
    
    // Initially hide dashboard and show modal
    dashboardSection.style.display = 'none';
    modal.style.display = 'block';
    
    // Open modal function
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        signupForm.style.display = 'block';
        successMessage.style.display = 'none';
        trialForm.reset();
    }
    
    // Close modal function
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking X
    closeModal.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Form validation and submission
    trialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        let isValid = true;
        if (!document.getElementById('salonName').value.trim()) {
            document.getElementById('salonNameError').style.display = 'block';
            isValid = false;
        }
        if (!document.getElementById('ownerName').value.trim()) {
            document.getElementById('ownerNameError').style.display = 'block';
            isValid = false;
        }
        const email = document.getElementById('email').value;
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        const phone = document.getElementById('phone').value;
        if (!phone || !/^[0-9]{10,15}$/.test(phone)) {
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        }
        const password = document.getElementById('password').value;
        if (!password || password.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            setTimeout(() => {
                signupForm.style.display = 'none';
                successMessage.style.display = 'block';
            }, 1000);
        }
    });
    
    // Go to dashboard button
    goToDashboard.addEventListener('click', function() {
        closeModalFunc();
        showDashboard();
    });
    
    // Login form submission
    document.getElementById('loginFormActual').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email) {
            document.getElementById('loginEmailError').style.display = 'block';
            return;
        } else {
            document.getElementById('loginEmailError').style.display = 'none';
        }
        
        if (!password) {
            document.getElementById('loginPasswordError').style.display = 'block';
            return;
        } else {
            document.getElementById('loginPasswordError').style.display = 'none';
        }
        
        // For demo - any password with 6+ chars works
        if (password.length >= 6) {
            closeModalFunc();
            showDashboard();
        } else {
            alert('Password must be at least 6 characters');
        }
    });
    
    // Show dashboard function
    function showDashboard() {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        dashboardSection.style.display = 'block';
        loadDashboardData();
    }
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        dashboardSection.style.display = 'none';
        modal.style.display = 'block';
    });
    
    // Sample dashboard data loading
    function loadDashboardData() {
        // This would be replaced with actual data loading in a real app
        console.log('Dashboard data loaded');
    }
    
    // Make all "Start Free Trial" buttons open the modal
    document.querySelectorAll('.cta-button:not(#goToDashboard)').forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Make "Watch Demo" button open the modal
    const watchDemoBtn = document.querySelector('.hero-buttons .secondary-button');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', openModal);
    }
});
