// Game data
const games = {
    'prophetia': {
        title: 'PROPHETIA',
        description: 'Step into a forgotten world where gods are written, not born.<br>In PROPHETIA, you are a lone traveler in a vast, surreal reality shaped by stories long abandoned. Explore broken realms, uncover lost memories, and piece together the truth behind a divine creation lost to time. The world does not wait for heroes—only those who ask the right questions.',
        url: 'https://www.roblox.com/games/12816756411',
        image: 'projects/PROPHETIA/PROPHETIA_Icon.png',
    },
    'reality-traveler': {
        title: 'Reality Traveler',
        description: "A short, mysterious prologue to PROPHETIA.<br>Reality Traveler drops you in a silent space between worlds, armed only with thought and vision. It's not about what you do, but what you notice. Look closely—your story has already begun.",
        url: 'https://www.roblox.com/games/15838646435',
        image: 'projects/RealityTraveler/RealityTraveler_Icon.png'
    },
   'blox': {
        title: 'Blox!',
        description: 'Build with blocks.<br>Paint, connect, and power them.<br>Create anything from simple structures to complex machines in a fully interactive sandbox.',
        url: 'https://www.roblox.com/games/104672115779717',
        image: 'projects/blox/Blox_Icon.png'
    }
};

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1200);
});

// Header visibility on scroll
let lastScrollY = window.scrollY;
const header = document.getElementById('header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show/hide logo based on scroll position
    if (currentScrollY > window.innerHeight * 0.4) {
        logo.classList.add('visible');
    } else {
        logo.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    lastScrollY = currentScrollY;
});

// Navigation
function updateActiveNavLink() {
    const sections = ['home', 'games', 'patreon', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Games section functionality
const gameNavBtns = document.querySelectorAll('.game-nav-btn');
const gameTitle = document.getElementById('game-title');
const gameDescription = document.getElementById('game-description');
const gameLink = document.getElementById('game-link');
const gameBg = document.getElementById('game-bg');

gameNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gameId = btn.getAttribute('data-game');
        const game = games[gameId];
        
        if (game) {
            // Update active button
            gameNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update game content with smooth animation
            const gameDetails = document.querySelector('.game-details');
            gameDetails.style.opacity = '0';
            gameDetails.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                gameTitle.textContent = game.title;
                gameDescription.innerHTML = game.description;
                gameLink.href = game.url;
                gameBg.style.backgroundImage = `url(${game.image})`;
                
                gameDetails.style.opacity = '1';
                gameDetails.style.transform = 'translateY(0)';
            }, 300);
        }
    });
});

// Easter egg functionality
let clickCount = 0;
const easterEggTrigger = document.getElementById('triangle-easter-egg');
const clickCounter = document.getElementById('click-counter');
const easterEggModal = document.getElementById('easter-egg-modal');

easterEggTrigger.addEventListener('click', () => {
    clickCount++;
    
    // Show click counter
    clickCounter.textContent = clickCount;
    clickCounter.classList.add('visible');
    
    // Add pulse animation to triangle
    const triangle = easterEggTrigger.querySelector('.triangle-easter');
    triangle.style.borderBottomColor = '#ffffff';
    triangle.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
    
    // Reset triangle color after animation
    setTimeout(() => {
        triangle.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
        triangle.style.filter = 'none';
    }, 400);
    
    // Trigger easter egg at 5 clicks
    if (clickCount >= 5) {
        showEasterEgg();
        clickCount = 0;
        clickCounter.classList.remove('visible');
    }
});

function showEasterEgg() {
    easterEggModal.classList.add('active');
    
    // Create matrix triangles
    const matrixContainer = document.querySelector('.matrix-triangles');
    matrixContainer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const triangle = document.createElement('div');
        triangle.style.position = 'absolute';
        triangle.style.left = Math.random() * 100 + '%';
        triangle.style.top = '-50px';
        triangle.style.width = '0';
        triangle.style.height = '0';
        triangle.style.borderLeft = '12px solid transparent';
        triangle.style.borderRight = '12px solid transparent';
        triangle.style.borderBottom = '20px solid rgba(255, 255, 255, 0.3)';
        triangle.style.opacity = '0.6';
        triangle.style.animation = `matrixRain ${4 + Math.random() * 3}s linear infinite`;
        triangle.style.animationDelay = Math.random() * 4 + 's';
        
        matrixContainer.appendChild(triangle);
    }
    
    // Hide easter egg after 6 seconds
    setTimeout(() => {
        easterEggModal.classList.remove('active');
    }, 6000);
}

// Add matrix rain animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixRain {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close easter egg modal when clicking outside
easterEggModal.addEventListener('click', (e) => {
    if (e.target === easterEggModal) {
        easterEggModal.classList.remove('active');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.tier, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Add stagger effect to tiers and social cards
document.querySelectorAll('.tier').forEach((tier, index) => {
    tier.style.transitionDelay = `${index * 0.15}s`;
});

document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
});

// Parallax effect for floating triangles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const triangles = document.querySelectorAll('.triangle-float');
    
    triangles.forEach((triangle, index) => {
        const speed = 0.3 + (index * 0.08);
        triangle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Enhanced hover effects for interactive elements
gameNavBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('active')) {
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)';
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial game content
    const initialGame = games['prophetia'];
    gameTitle.textContent = initialGame.title;
    gameDescription.innerHTML = initialGame.description;
    gameLink.href = initialGame.url;
    gameBg.style.backgroundImage = `url(${initialGame.image})`;
    
    // Add initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 200);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Add subtle mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const triangles = document.querySelectorAll('.triangle-float');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    triangles.forEach((triangle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        triangle.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Smooth reveal animations for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});