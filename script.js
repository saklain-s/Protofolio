let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Improved typewriter text animation for .text-animation span
const words = [
    "Backend Development",
    "Microservices Architecture",
    "RESTful API Development",
    "Cloud-Based Deployment",
    "Software Testing",
    "Machine Learning"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const span = document.querySelector('.text-animation span');

function typeWriter() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    span.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeWriter, 500);
      return;
    }
  } else {
    span.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1200);
      return;
    }
  }
  setTimeout(typeWriter, isDeleting ? 50 : 100);
}

typeWriter();
// AJAX Formspree contact form submission
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
    contactForm.appendChild(formMessage);
  }
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    formMessage.style.display = 'none';
    const formData = new FormData(contactForm);
    try {
      const response = await fetch('https://formspree.io/f/xeozazya', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (response.ok) {
        contactForm.reset();
        formMessage.textContent = 'Thanks! The form was submitted successfully.';
        formMessage.style.display = 'block';
      } else {
        formMessage.textContent = 'Oops! There was a problem submitting your form.';
        formMessage.style.display = 'block';
      }
    } catch (error) {
      formMessage.textContent = 'Oops! There was a problem submitting your form.';
      formMessage.style.display = 'block';
    }
  });
}
