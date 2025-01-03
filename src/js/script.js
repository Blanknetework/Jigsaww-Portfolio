// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent scrolling when menu is open
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    }
});


// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // If mobile menu is open, close it after clicking
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Change active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});


// Smooth scroll for all buttons with href starting with #
document.querySelectorAll('a[href^="#"]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 50, // 50px offset from top
            behavior: 'smooth'
        });
    });
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.classList.add('hide');
        // Enable scrolling after loader disappears
        document.body.style.overflow = 'auto';
    }, 2000); // 2 seconds delay
});

// Disable scrolling while loader is visible
document.body.style.overflow = 'hidden';

window.addEventListener('load', function() {
    const loader = document.querySelector('.loading');
    console.log('Loader:', loader); // Log loader

    setTimeout(() => {
        loader.classList.add('hide');
        // Enable scrolling after loader disappears
        document.body.style.overflow = 'auto';
        addSlideUpAnimations(); // Call the function to add animations
    }, 2000); // 2 seconds delay
});

// Disable scrolling while loader is visible
document.body.style.overflow = 'hidden';

window.addEventListener('load', function() {
    const loader = document.querySelector('.loading');
    console.log('Loader:', loader); // Log loader

    setTimeout(() => {
        loader.classList.add('hide');
        // Enable scrolling after loader disappears
        document.body.style.overflow = 'auto';
        addSlideUpAnimations(); // Call the function to add animations
    }, 2000); // 2 seconds delay
});

// Disable scrolling while loader is visible
document.body.style.overflow = 'hidden';

function addSlideUpAnimations() {
    // Select all sections to animate
    const sections = [
        // Hero section elements
        ...document.querySelectorAll('.hero-content h1, .hero-content p, .cta-buttons, .hero-image img'),
        // About section elements
        document.querySelector('.section-title'),
        ...document.querySelectorAll('.about-card'),
        // Project section elements
        document.querySelector('#project .section-title'),
        ...document.querySelectorAll('.project-card'),
        // Footer elements
        ...document.querySelectorAll('.footer-content, .social-links, .footer-bottom')
    ];

    console.log('Sections to animate:', sections); // Log sections

    // Add initial styles
    sections.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
        }
    });

    // Add slide-up class when elements are in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Adding slide-up to:', entry.target); // Log element
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}

// Show or hide the "Back to Top" button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Offline chat form submission
const messages = document.getElementById('messages');
const chatContainer = document.getElementById('chat-container');

function toggleChat() {
    if (chatContainer.classList.contains('show')) {
        chatContainer.classList.remove('show');
        setTimeout(() => {
            chatContainer.style.display = 'none';
        }, 300); // Match the duration of the CSS transition
    } else {
        chatContainer.style.display = 'flex';
        setTimeout(() => {
            chatContainer.classList.add('show');
        }, 10); // Small delay to trigger the transition
    }
}

function sendSuggestedQuestion(question) {
    addMessage('user', question);
    setTimeout(() => {
        const reply = getReply(question);
        addMessage('bot', reply);
    }, 500);
}

function addMessage(sender, text) {
    const item = document.createElement('li');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.innerHTML = text; 
    item.appendChild(message);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}

function getReply(question) {
    const replies = {
        'What is your name?': 'My name is Adam Nuevo.',
        'What services do you offer?': 'We offer web development, mobile app development, and SEO services.',
        'How can I contact you?': 'You can contact us via email at <a href="mailto:adamnuevo28@gmail.com" style="color: #4d4dff; text-decoration: underline;">adamnuevo28@gmail.com</a>.'
    };
    return replies[question] || 'I am not sure how to answer that.';
}