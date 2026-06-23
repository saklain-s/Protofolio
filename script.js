// ========================================
// PROFESSIONAL PORTFOLIO JAVASCRIPT
// ========================================

// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');

// ========================================
// MOBILE MENU TOGGLE
// ========================================

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const progressBar = document.querySelector('.scroll-progress-bar');

function updateScrollProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Update on scroll
window.addEventListener('scroll', updateScrollProgressBar);

// Update on page load
window.addEventListener('load', updateScrollProgressBar);

// Initial update
updateScrollProgressBar();

// ========================================
// ACTIVE SECTION HIGHLIGHTING
// ========================================

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ========================================
// TYPEWRITER ANIMATION
// ========================================

const words = [
    "Backend Developer",
    "Microservices Architect",
    "RESTful API Designer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenWords = 1500;

const span = document.querySelector('.text-animation span');

function typeWriter() {
    if (!span) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        // Typing
        if (charIndex < currentWord.length) {
            span.textContent += currentWord.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Word complete, start deleting after delay
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenWords);
        }
    } else {
        // Deleting
        if (charIndex > 0) {
            span.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWriter, 500);
        }
    }
}

// Start typewriter animation when page loads
window.addEventListener('load', () => {
    typeWriter();
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.project-item, .skill-tag, .certification-item, .experience-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// FORM SUBMISSION WITH FEEDBACK
// ========================================

const contactForm = document.querySelector('section.contact form');
if (contactForm) {
  // Create or get a message element for feedback
  let formMessage = document.getElementById('form-message');
  if (!formMessage) {
    formMessage = document.createElement('div');
    formMessage.id = 'form-message';
    formMessage.style.display = 'none';
    formMessage.style.marginTop = '1rem';
    formMessage.style.color = '#00ffee';
    formMessage.style.fontSize = '1.4rem';
    formMessage.style.padding = '1rem';
    formMessage.style.borderRadius = '0.5rem';
    formMessage.style.backgroundColor = 'rgba(0, 217, 255, 0.1)';
    contactForm.appendChild(formMessage);
  }
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    formMessage.style.display = 'none';
    
    // Validate form
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const subject = this.querySelector('input[name="subject"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill out all fields';
        formMessage.style.display = 'block';
        formMessage.style.borderLeftColor = '#ff6b6b';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.style.display = 'block';
        formMessage.style.borderLeftColor = '#ff6b6b';
        return;
    }

    const formData = new FormData(contactForm);
    try {
      const response = await fetch('https://formspree.io/f/xeozazya', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (response.ok) {
        contactForm.reset();
        formMessage.textContent = '✓ Thanks! Your message has been sent successfully.';
        formMessage.style.display = 'block';
        formMessage.style.borderLeftColor = '#00ffee';
      } else {
        formMessage.textContent = '✗ Oops! There was a problem submitting your form.';
        formMessage.style.display = 'block';
        formMessage.style.borderLeftColor = '#ff6b6b';
      }
    } catch (error) {
      formMessage.textContent = '✗ Oops! There was a problem submitting your form.';
      formMessage.style.display = 'block';
      formMessage.style.borderLeftColor = '#ff6b6b';
    }
  });
}
