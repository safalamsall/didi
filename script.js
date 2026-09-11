document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for the sticky header
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });

        // Header shadow on scroll
        const header = document.getElementById('header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });

    // Simple Form Validation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation check
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Please fill out all required fields.';
                formStatus.className = 'error-msg';
                return;
            }

            // Simple email regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.className = 'error-msg';
                return;
            }

            // Real form submission via FormSubmit.co AJAX API
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const subject = document.getElementById('subject').value.trim();

            fetch("https://formsubmit.co/ajax/lamsalswastika9@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: subject || "New Contact Form Submission",
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    document.getElementById('successModal').classList.add('active');
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                    formStatus.className = 'error-msg';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'Oops! There was a problem sending your message.';
                formStatus.className = 'error-msg';
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = '';
                }, 5000);
            });
        });
    }

    // Modal Close Logic
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
