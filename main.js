// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// Navigation Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Grid Item Hover Effect (Slight parallax)
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        item.style.transform = `scale(1.02) translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) translate(0, 0)';
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default and smooth scroll if it's an anchor on the same page
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // Otherwise, let the browser handle the page navigation (e.g., contact.html)
    });
});

// Gallery Navigation
const slides = document.querySelectorAll('.gallery-slide');
const nextBtn = document.querySelector('.nav-next');
const prevBtn = document.querySelector('.nav-prev');
let currentIdx = 2; // Start with the 3rd slide as featured

function updateGallery() {
    slides.forEach((slide, index) => {
        slide.classList.remove('featured', 'side');
        if (index === currentIdx) {
            slide.classList.add('featured');
        } else if (index === currentIdx - 1 || index === currentIdx + 1) {
            slide.classList.add('side');
        }
    });
}

// Initial call to set state
updateGallery();

nextBtn?.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % slides.length;
    updateGallery();
});

prevBtn?.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    updateGallery();
});

// Gallery Filters
document.querySelectorAll('.gallery-filters button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.gallery-filters button.active')?.classList.remove('active');
        button.classList.add('active');
        // In a real app, this would filter images; here we just toggle the UI state
    });
});
