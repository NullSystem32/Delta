const DEFAULT_GAME = 'reality-traveler';

const games = {
    'prophetia': {
        title: '<span class="prophetia">PROPHETIA</span>',
        description: '[UPCOMING] Step into a forgotten world where gods are written, not born.<br>In <span class="prophetia">PROPHETIA</span>, you are a lone traveler in a vast, surreal reality shaped by stories long abandoned. Explore broken realms, uncover lost memories, and piece together the truth behind a divine creation lost to time. The world does not wait for heroes—only those who ask the right questions.',
        image: 'srcs/PROPHETIA_Icon.png',
        thumbnail: 'srcs/PROPHETIA_Thumbnail.png',
        url: 'https://www.roblox.com/games/12816756411',
        quote: "What's the first ever thing made? and if its made, its not the first."
    },

    'messier-society': {
        title: 'Messier Society',
        description: "[WIP] Awaken in the depths. Explore the unknown. Survive what's left.",
        url: 'https://www.roblox.com/games/15826904367',
        image: 'srcs/MS_Icon.png',
        thumbnail: 'srcs/MS_Thumbnail.png',
        quote: "When wakening is the end."
    },

    'reality-traveler': {
        title: 'Reality Traveler',
        description: "A short, mysterious teaser to <span class='prophetia'>PROPHETIA</span>.<br>Reality Traveler drops you in a silent space between worlds, armed only with thought and vision. It's not about what you do, but what you notice. Look closely—your story has already begun.",
        url: 'https://www.roblox.com/games/15838646435',
        image: 'srcs/RealityTraveler_Icon.png',
        thumbnail: 'srcs/RealityTraveler_Thumbnail.png',
        quote: "Can You Hear Me?"
    },

    'um-dia-brasileiro': {
        title: 'Um dia Brasileiro',
        description: "[ALPHA] Fight as a Brazillian citizen in a JoJo's Bizarre Adventure unnoficial alternative universe.<br>Discover your Stand, train it, and fight against other Stand users in a quest to become the strongest.",
        url: 'https://www.roblox.com/games/81324415757242',
        image: 'srcs/UDB_Icon.png',
        thumbnail: 'srcs/UDB_Thumbnail.png',
        quote: "A Brazilian JoJo's Adventure."
    },

    'blox': {
        title: 'Blox!',
        description: '[BETA] Build with blocks.<br>Paint, connect, and power them.<br>Create anything from simple structures to complex machines in a fully interactive sandbox.',
        url: 'https://www.roblox.com/games/104672115779717',
        image: 'srcs/Blox_Icon.png',
        thumbnail: 'srcs/Blox_Thumbnail.png',
        quote: "Every creation starts with a single block."
    },

    /*
    
    


    */
};

window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Initialize Delta Pet after loading
                initDeltaPet();
            }, 800);
        }
    }, 500);
});

// Delta Pet AI Logic
class DeltaPet {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'delta-pet';
        this.element.innerHTML = `
            <img src="srcs/Triangle.png" alt="Delta Pet">
            <div class="doom-container"></div>
        `;
        this.doomContainer = this.element.querySelector('.doom-container');
        document.body.appendChild(this.element);

        this.pos = {
            x: Math.random() * (window.innerWidth - 120),
            y: window.scrollY + Math.random() * (window.innerHeight - 120)
        };
        this.vel = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 };
        this.acc = { x: 0, y: 0 };
        this.maxSpeed = 5;
        this.maxForce = 0.25;
        this.isDoomActive = false;

        this.state = 'WANDER';
        this.target = null;
        this.targetElement = null;
        this.deltaBits = [];
        this.particles = [];

        this.findNewTask();

        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.isDoomActive) this.toggleDoom(true);
        });

        document.addEventListener('click', () => {
            if (this.isDoomActive) this.toggleDoom(false);
        });

        this.animate();
    }

    findNewTask() {
        if (this.isDoomActive) return;

        const dice = Math.random();

        if (this.deltaBits.length > 3 && dice < 0.3) {
            this.state = 'PLAY';
            const bit = this.deltaBits[Math.floor(Math.random() * this.deltaBits.length)];
            this.target = { x: bit.x, y: bit.y };
        } else if (dice < 0.4) {
            this.state = 'WANDER';
            this.target = {
                x: Math.random() * window.innerWidth,
                y: window.scrollY + Math.random() * (window.innerHeight - 120)
            };
            this.targetElement = null;
        } else if (dice < 0.75) {
            this.state = 'SEEK';
            // NOVOS ALVOS: Hero Icon, Títulos do PriceList, Projetos Atuais, Redes Sociais, Showcase, etc.
            const targets = document.querySelectorAll('.game-showcase, .game-icon-link, .promo-card, .service-item, .tier, .tier-icon, .tier ul li, .social-card, .hero-game-thumb, .projects-title, .why-title');
            if (targets.length > 0) {
                this.targetElement = targets[Math.floor(Math.random() * targets.length)];
                const rect = this.targetElement.getBoundingClientRect();
                this.target = {
                    x: rect.left + rect.width / 2 + window.scrollX,
                    y: rect.top + rect.height / 2 + window.scrollY
                };
            }
        } else {
            this.state = 'BUILD';
            this.target = {
                x: 100 + Math.random() * (window.innerWidth - 200),
                y: window.scrollY + 100 + Math.random() * (window.innerHeight - 200)
            };
            this.targetElement = null;
        }

        setTimeout(() => this.findNewTask(), 3000 + Math.random() * 5000);
    }

    toggleDoom(active) {
        this.isDoomActive = active;
        if (this.isDoomActive) {
            this.element.classList.add('doom-active');
            this.element.style.transform = 'rotate(0deg)';
            this.vel = { x: 0, y: 0 };
            this.acc = { x: 0, y: 0 };

            // Criar iframe apenas quando entrar no modo Doom
            if (!this.doomContainer.querySelector('iframe')) {
                const iframe = document.createElement('iframe');
                iframe.className = 'doom-iframe';
                iframe.src = 'https://ustymukhman.github.io/webDOOM/public/';
                iframe.scrolling = 'no';
                this.doomContainer.appendChild(iframe);
            }
        } else {
            this.element.classList.remove('doom-active');

            // Aguarda o fade-out do CSS (0.8s) para destruir o iframe e o áudio
            setTimeout(() => {
                if (!this.isDoomActive) {
                    this.doomContainer.innerHTML = '';
                }
            }, 850);

            this.vel = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 };
        }
    }

    createDeltaBit() {
        const shapes = ['triangle', 'square', 'circle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        const bitEl = document.createElement('div');
        bitEl.className = `delta-bit bit-${shape}`;
        bitEl.style.left = `${this.pos.x + 50}px`;
        bitEl.style.top = `${this.pos.y + 50}px`;
        document.body.appendChild(bitEl);

        const bit = {
            el: bitEl,
            x: this.pos.x + 50,
            y: this.pos.y + 50,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6
        };

        this.deltaBits.push(bit);

        setTimeout(() => {
            bitEl.classList.add('dissolve');
            setTimeout(() => {
                bitEl.remove();
                this.deltaBits = this.deltaBits.filter(b => b !== bit);
            }, 1000);
        }, 8000);
    }

    spawnTrail() {
        if (Math.random() > 0.3) {
            const partEl = document.createElement('div');
            partEl.className = 'pet-particle';
            partEl.style.left = `${this.pos.x + 60}px`;
            partEl.style.top = `${this.pos.y + 60}px`;
            document.body.appendChild(partEl);
            const part = { el: partEl, x: this.pos.x + 60, y: this.pos.y + 60, life: 1.0, decay: 0.04 + Math.random() * 0.04 };
            this.particles.push(part);
        }
    }

    affectEnvironment() {
        const proximity = 200;
        // Seleciona elementos interativos, exceto o que está na header
        const els = document.querySelectorAll('button, a, .promo-card, .social-card, .tier, .tier-icon, .tier ul li, .hero-game-thumb, .service-item');
        els.forEach(el => {
            if (el.closest('#header')) return;

            const rect = el.getBoundingClientRect();
            const elL = rect.left + window.scrollX;
            const elR = rect.right + window.scrollX;
            const elT = rect.top + window.scrollY;
            const elB = rect.bottom + window.scrollY;
            const clX = Math.max(elL, Math.min(this.pos.x + 60, elR));
            const clY = Math.max(elT, Math.min(this.pos.y + 60, elB));
            const dx = clX - (this.pos.x + 60);
            const dy = clY - (this.pos.y + 60);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < proximity) {
                const power = (1 - dist / proximity) * 20;

                const cX = elL + rect.width / 2;
                const cY = elT + rect.height / 2;
                const vdx = cX - (this.pos.x + 60);
                const vdy = cY - (this.pos.y + 60);

                const isSmall = el.tagName === 'LI' || el.classList.contains('service-item');
                const sP = isSmall ? 0.05 : 0.6;

                el.style.transform = `translate(${vdx * power * sP * 0.01}px, ${vdy * power * sP * 0.01}px) rotate(${vdx * 0.005}deg)`;
                el.style.boxShadow = `0 0 ${power * 2}px rgba(255,255,255,0.1)`;
            } else if (el.style.transform && (el.style.transform.includes('translate') || el.style.boxShadow)) {
                el.style.transform = '';
                el.style.boxShadow = '';
            }
        });

        if (window.deltaBG) {
            window.deltaBG.petMouse = { x: this.pos.x + 60, y: this.pos.y + 60 };
        }
    }

    applyInteractionEffect() {
        if (!this.targetElement) return;
        this.element.classList.add('thinking');

        const isSmall = this.targetElement.tagName === 'LI' || this.targetElement.classList.contains('service-item');
        const isPlayBtn = this.targetElement.classList.contains('game-icon-link');
        let count = 0;
        const intr = setInterval(() => {
            const rx = (Math.random() - 0.5) * (isSmall ? 4 : 12);
            const ry = (Math.random() - 0.5) * (isSmall ? 4 : 12);
            const scale = isSmall ? 1.01 : (isPlayBtn ? 1.02 : 1.05);
            this.targetElement.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
            count++;
            if (count > 25) {
                clearInterval(intr);
                this.targetElement.style.transform = '';
                if (this.element) this.element.classList.remove('thinking');
            }
        }, 40);
    }

    handleImpact() {
        this.element.classList.add('pet-impact');
        setTimeout(() => this.element.classList.remove('pet-impact'), 400);
    }

    applyForce(force) {
        this.acc.x += force.x;
        this.acc.y += force.y;
    }

    update() {
        if (this.isDoomActive) {
            this.element.style.left = `${this.pos.x}px`;
            this.element.style.top = `${this.pos.y}px`;
            return;
        }

        // Particle System
        this.spawnTrail();
        this.particles.forEach((p, i) => {
            p.life -= p.decay;
            p.el.style.opacity = p.life;
            p.el.style.transform = `scale(${p.life})`;
            // Não precisa atualizar x/y aqui se forem fixos no spawn
            if (p.life <= 0) {
                p.el.remove();
                this.particles.splice(i, 1);
            }
        });

        // Env awareness
        this.affectEnvironment();

        // Update Delta Bits Physics
        this.deltaBits.forEach(bit => {
            bit.x += bit.vx;
            bit.y += bit.vy;
            bit.vx *= 0.96; // Friction
            bit.vy *= 0.96;
            bit.el.style.left = `${bit.x}px`;
            bit.el.style.top = `${bit.y}px`;

            // Interaction: Pet pushes bits away
            let dx = bit.x - (this.pos.x + 60);
            let dy = bit.y - (this.pos.y + 60);
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d < 80) {
                bit.vx += dx * 0.2;
                bit.vy += dy * 0.2;
            }
        });

        if (this.target) {
            let desiredX = this.target.x - this.pos.x;
            let desiredY = this.target.y - this.pos.y;
            let centerDist = Math.sqrt(desiredX * desiredX + desiredY * desiredY);

            // Verificação inteligente de proximidade: se chegar na borda, já interage.
            let hitTarget = centerDist < 40;
            if (!hitTarget && this.targetElement && this.state === 'SEEK') {
                const rect = this.targetElement.getBoundingClientRect();
                const edgeProximity = centerDist - (Math.max(rect.width, rect.height) / 2);
                if (edgeProximity < 30) hitTarget = true;
            }

            if (hitTarget) {
                if (this.state === 'SEEK') {
                    this.state = 'INTERACT';
                    this.applyInteractionEffect();
                    this.target = null;
                } else if (this.state === 'BUILD') {
                    this.createDeltaBit();
                    this.state = 'WANDER';
                    this.target = null;
                } else if (this.state === 'PLAY') {
                    this.state = 'WANDER';
                    this.target = null;
                }
            } else {
                let speed = centerDist < 200 && this.state === 'SEEK' ? this.maxSpeed * 0.8 : (this.state === 'SEEK' ? this.maxSpeed * 1.8 : this.maxSpeed);
                desiredX = (desiredX / centerDist) * speed;
                desiredY = (desiredY / centerDist) * speed;

                let steerX = desiredX - this.vel.x;
                let steerY = desiredY - this.vel.y;

                let steerLen = Math.sqrt(steerX * steerX + steerY * steerY);
                if (steerLen > this.maxForce) {
                    steerX = (steerX / steerLen) * this.maxForce;
                    steerY = (steerY / steerLen) * this.maxForce;
                }
                this.applyForce({ x: steerX, y: steerY });
            }
        }

        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;

        let speedLimit = this.state === 'SEEK' ? this.maxSpeed * 1.8 : this.maxSpeed;
        let speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (speed > speedLimit) {
            this.vel.x = (this.vel.x / speed) * speedLimit;
            this.vel.y = (this.vel.y / speed) * speedLimit;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.acc = { x: 0, y: 0 };

        // REAL BOUNDARIES - NO WRAPPING
        const padding = 120;
        const winW = window.innerWidth;
        const docH = document.documentElement.scrollHeight;

        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x *= -0.8; // Bounce
            this.handleImpact();
        } else if (this.pos.x > winW - padding) {
            this.pos.x = winW - padding;
            this.vel.x *= -0.8;
            this.handleImpact();
        }

        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y *= -0.8;
            this.handleImpact();
        } else if (this.pos.y > docH - padding - 200) {
            this.pos.y = docH - padding - 200;
            this.vel.y *= -0.8;
            this.handleImpact();
        }

        this.element.style.left = `${this.pos.x}px`;
        this.element.style.top = `${this.pos.y}px`;

        const angle = Math.atan2(this.vel.y, this.vel.x) + Math.PI / 2;
        this.element.style.transform = `rotate(${angle}rad)`;
    }

    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

function initDeltaPet() {
    new DeltaPet();
}


let lastScrollY = window.scrollY;
const header = document.getElementById('header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > window.innerHeight * 0.4) {
        logo.classList.add('visible');
    } else {
        logo.classList.remove('visible');
    }

    updateActiveNavLink();

    lastScrollY = currentScrollY;
});

function updateActiveNavLink() {
    const sections = ['home', 'games', 'pricelist', 'patreon', 'contact'];
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

function updateHeroContent(gameId) {
    const game = games[gameId];
    if (!game) return;

    const heroTitle = document.querySelector('.hero-title .glow');
    const heroDescription = document.querySelector('.hero-description');
    const heroPlayButton = document.querySelector('.play-button');
    const heroGameImage = document.querySelector('.hero-section .game-image');
    const heroBackground = document.querySelector('.hero-bg');

    if (heroTitle) {
        heroTitle.innerHTML = game.title;
        const heroTitleRoot = document.querySelector('.hero-title');
        if (heroTitleRoot) {
            heroTitleRoot.className = 'hero-title';
            heroTitleRoot.classList.add(`font-${gameId}`);
        }
    }
    if (heroPlayButton) heroPlayButton.href = game.url;
    if (heroGameImage) heroGameImage.style.backgroundImage = `url(${game.image})`;
    if (heroBackground) heroBackground.style.backgroundImage = `url(${game.thumbnail})`;

    if (heroDescription) {
        heroDescription.className = 'hero-description';
        heroDescription.classList.add(`font-${gameId}`);
        const currentLanguage = document.getElementById('language-select')?.value || 'en';
        if (currentLanguage !== 'en' && window.translations && window.translations[currentLanguage]) {
            const quoteKey = gameId.replace('-', '_') + '_quote';
            const translatedQuote = window.translations[currentLanguage][quoteKey];
            heroDescription.textContent = `"${translatedQuote || game.quote}"`;
        } else {
            heroDescription.textContent = `"${game.quote}"`;
        }
    }
}

function initializeHero() {
    updateHeroContent(DEFAULT_GAME);

    const defaultGame = games[DEFAULT_GAME];
    // Sincroniza o Showcase de Jogos completamente na largada
    const gameBg = document.getElementById('game-bg');
    const gameIconFloating = document.getElementById('game-icon-floating');
    const gameTitle = document.getElementById('game-title');
    const gameDescription = document.getElementById('game-description');
    const gameLink = document.getElementById('game-link');

    if (gameBg) gameBg.style.backgroundImage = `url(${defaultGame.thumbnail})`;
    if (gameIconFloating) gameIconFloating.style.backgroundImage = `url(${defaultGame.image})`;
    if (gameLink) gameLink.href = defaultGame.url;

    if (gameTitle) {
        gameTitle.innerHTML = defaultGame.title;
        gameTitle.className = '';
        gameTitle.classList.add(`font-${DEFAULT_GAME}`);
    }

    if (gameDescription) {
        gameDescription.className = '';
        gameDescription.classList.add(`font-${DEFAULT_GAME}`);
        const currentLanguage = document.getElementById('language-select')?.value || 'en';
        if (currentLanguage !== 'en' && window.translations && window.translations[currentLanguage]) {
            const descKey = DEFAULT_GAME.replace('-', '_') + '_desc';
            const translatedDesc = window.translations[currentLanguage][descKey];
            gameDescription.innerHTML = translatedDesc || defaultGame.description;
        } else {
            gameDescription.innerHTML = defaultGame.description;
        }
    }
}

function generateGameButtons() {
    const gamesNav = document.querySelector('.games-nav');
    if (!gamesNav) return;

    gamesNav.innerHTML = '';

    Object.keys(games).forEach((gameId, index) => {
        const game = games[gameId];
        const button = document.createElement('button');
        button.className = 'game-nav-btn';
        button.setAttribute('data-game', gameId);
        button.innerHTML = game.title;

        if (gameId === DEFAULT_GAME) {
            button.classList.add('active');
        }

        gamesNav.appendChild(button);
    });

    setupGameNavigation();

    // Reaplica o vidro nos novos botões gerados
    if (typeof applyAllGlassEffects === 'function') {
        applyAllGlassEffects();
    }
}

function setupGameNavigation() {
    const gameNavBtns = document.querySelectorAll('.game-nav-btn');
    const gameTitle = document.getElementById('game-title');
    const gameDescription = document.getElementById('game-description');
    const gameLink = document.getElementById('game-link');
    const gameBg = document.getElementById('game-bg');
    const gameIconFloating = document.getElementById('game-icon-floating');

    gameNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const gameId = btn.getAttribute('data-game');
            const game = games[gameId];

            if (game) {
                gameNavBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const gameDetails = document.querySelector('.game-details');
                gameDetails.style.opacity = '0';
                gameDetails.style.transform = 'translateY(15px)';
                gameIconFloating.style.opacity = '0';
                gameIconFloating.style.transform = 'scale(0.9) translateY(20px)';

                setTimeout(() => {
                    gameTitle.innerHTML = game.title;
                    gameTitle.className = '';
                    gameTitle.classList.add(`font-${gameId}`);

                    if (gameDescription) {
                        gameDescription.className = '';
                        gameDescription.classList.add(`font-${gameId}`);
                    }

                    const currentLanguage = document.getElementById('language-select')?.value || 'en';
                    if (currentLanguage !== 'en' && window.translations && window.translations[currentLanguage]) {
                        const descKey = gameId.replace('-', '_') + '_desc';
                        const translatedDesc = window.translations[currentLanguage][descKey];
                        gameDescription.innerHTML = translatedDesc || game.description;
                    } else {
                        gameDescription.innerHTML = game.description;
                    }

                    gameLink.href = game.url;

                    if (game.thumbnail) {
                        gameBg.style.backgroundImage = `url(${game.thumbnail})`;
                    } else {
                        gameBg.style.backgroundImage = 'none';
                    }

                    if (game.image) {
                        gameIconFloating.style.backgroundImage = `url(${game.image})`;
                    } else {
                        gameIconFloating.style.backgroundImage = 'none';
                    }

                    gameDetails.style.opacity = '1';
                    gameDetails.style.transform = 'translateY(0)';
                    gameIconFloating.style.opacity = '1';
                    gameIconFloating.style.transform = 'scale(1) translateY(0)';
                }, 400);
            }
        });
    });

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
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');

    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            if (selectedLanguage === 'en') {
                resetToEnglish();
                localStorage.setItem('selectedLanguage', 'en');
            } else {
                window.translateContent(selectedLanguage);
            }
        });
    }

    window.loadSavedLanguage();
});

function resetToEnglish() {
    if (window.translations && window.translations['en']) {
        window.translateContent('en');
    }
}

let clickCount = 0;
const easterEggTrigger = document.getElementById('triangle-easter-egg');
const clickCounter = document.getElementById('click-counter');
const hackerEggModal = document.getElementById('hacker-egg-modal');

let hackInterval;
let asciiInterval;
let originalTitle = document.title;

easterEggTrigger.addEventListener('click', () => {
    clickCount++;

    const triangle = easterEggTrigger.querySelector('.triangle-easter');
    triangle.style.borderBottomColor = '#ffffff';
    triangle.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';

    setTimeout(() => {
        triangle.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
        triangle.style.filter = 'none';
    }, 400);

    if (clickCount >= 5) {
        showHackerEgg();
        clickCount = 0;
    }
});

function drawLine(p1, p2, buf, w, h) {
    let x1 = Math.round(p1.x); let y1 = Math.round(p1.y);
    let x2 = Math.round(p2.x); let y2 = Math.round(p2.y);
    let dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
    let dy = Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2, e2;
    for (let count = 0; count < 300; count++) {
        if (x1 >= 0 && x1 < w && y1 >= 0 && y1 < h) {
            buf[y1][x1] = '█';
        }
        if (x1 === x2 && y1 === y2) break;
        e2 = err;
        if (e2 > -dx) { err -= dy; x1 += sx; }
        if (e2 < dy) { err += dx; y1 += sy; }
    }
}

function renderASCII(time) {
    const w = Math.min(100, Math.floor(window.innerWidth / 12));
    const h = Math.min(50, Math.floor(window.innerHeight / 20));
    const buf = Array(h).fill().map(() => Array(w).fill(' '));

    const s = Math.min(w / 4, h / 4) * 0.8;
    const cx = w / 2;
    const cy = h / 2;

    let pts = [
        { x: 0, y: -1.2247, z: 0 },      // Topo
        { x: 0, y: 0.4082, z: 1.1547 },  // Base Frente
        { x: 1, y: 0.4082, z: -0.5774 }, // Base Direita
        { x: -1, y: 0.4082, z: -0.5774 } // Base Esquerda
    ];

    let rt = pts.map(p => {
        let x = p.x * Math.cos(time) - p.z * Math.sin(time);
        let z = p.x * Math.sin(time) + p.z * Math.cos(time);
        let y = p.y * Math.cos(time * 0.5) - z * Math.sin(time * 0.5);
        z = p.y * Math.sin(time * 0.5) + z * Math.cos(time * 0.5);
        let f = 3 / (4 + z);
        return {
            x: x * f * s * 2 + cx,
            y: y * f * s + cy
        };
    });

    const edges = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]];
    edges.forEach(e => drawLine(rt[e[0]], rt[e[1]], buf, w, h));

    return buf.map(row => row.join('')).join('\n');
}

function showHackerEgg() {
    hackerEggModal.classList.remove('glitch-out');
    hackerEggModal.classList.add('active');
    document.body.classList.add('hacking-active');
    originalTitle = document.title;
    document.title = "S Y S T E M   C O M P R O M I S E D";

    const matrixBg = document.getElementById('matrix-bg');
    const asciiPyramid = document.getElementById('ascii-pyramid');
    let time = 0;

    if (hackInterval) clearInterval(hackInterval);
    if (asciiInterval) clearInterval(asciiInterval);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;':,./<>?";
    hackInterval = setInterval(() => {
        let str = '';
        const cols = Math.ceil(window.innerWidth / 16);
        const rows = Math.ceil(window.innerHeight / 16);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                str += chars[Math.floor(Math.random() * chars.length)] + ' ';
            }
            str += '\n';
        }
        matrixBg.textContent = str;
    }, 80);

    asciiInterval = setInterval(() => {
        time += 0.1;
        asciiPyramid.textContent = renderASCII(time);
    }, 50);

    setTimeout(() => {
        hackerEggModal.classList.add('glitch-out');
        document.body.classList.remove('hacking-active');
        document.title = originalTitle;
        setTimeout(() => {
            hackerEggModal.classList.remove('active');
            clearInterval(hackInterval);
            clearInterval(asciiInterval);
        }, 1500);
    }, 6000);
}

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

document.querySelectorAll('.tier, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

document.querySelectorAll('.tier').forEach((tier, index) => {
    tier.style.transitionDelay = `${index * 0.15}s`;
});

document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const triangles = document.querySelectorAll('.triangle-float');

    triangles.forEach((triangle, index) => {
        const speed = 0.3 + (index * 0.08);
        triangle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

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

const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

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

document.addEventListener('DOMContentLoaded', () => {
    generateGameButtons();
    initializeHero();

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 200);

    new DeltaBackground();
});

class DeltaBackground {
    constructor() {
        window.deltaBG = this;
        this.canvas = document.getElementById('delta-interactive-bg');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, radius: 200 };
        this.particleCount = 80;
        this.connectDistance = 160;

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY + window.pageYOffset;
        });

        window.addEventListener('mousedown', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY + window.pageYOffset;
            this.explode();
        });

        this.resize();
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.totalHeight = document.body.scrollHeight;
        this.particleCount = 70;
        this.init();
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.totalHeight));
        }
    }

    explode() {
        for (let i = 0; i < 8; i++) {
            const p = new Particle(this.canvas, this.totalHeight);
            p.x = this.mouse.x;
            p.y = this.mouse.y;
            p.speedX = (Math.random() - 0.5) * 12;
            p.speedY = (Math.random() - 0.5) * 12;
            this.particles.push(p);
        }
        if (this.particles.length > 100) this.particles.splice(0, 8);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const scrollY = window.pageYOffset;

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.update(this.mouse, this.particles);

            const drawY = p.y - scrollY;

            if (drawY > -50 && drawY < this.canvas.height + 50) {
                p.draw(this.ctx, drawY);

                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const drawY2 = p2.y - scrollY;

                    if (drawY2 > -50 && drawY2 < this.canvas.height + 50) {
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < this.connectDistance) {
                            const opacity = 1 - (distance / this.connectDistance);
                            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                            this.ctx.lineWidth = 1;
                            this.ctx.beginPath();
                            this.ctx.moveTo(p.x, drawY);
                            this.ctx.lineTo(p2.x, drawY2);
                            this.ctx.stroke();
                        }
                    }
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas, totalHeight) {
        this.canvas = canvas;
        this.totalHeight = totalHeight;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * totalHeight;
        this.size = Math.random() * 5 + 3;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.points = [
            { x: 0, y: -this.size },
            { x: this.size * 0.8, y: this.size * 0.6 },
            { x: -this.size * 0.8, y: this.size * 0.6 }
        ];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = 0;
        this.targetOpacity = 0.4;
        this.isTeleporting = false;
    }

    update(mouse, allParticles) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        const margin = 40;
        const nearLeft = this.x < margin;
        const nearRight = this.x > this.canvas.width - margin;
        const nearTop = this.y < margin;
        const nearBottom = this.y > this.totalHeight - margin;

        if (nearLeft || nearRight || nearTop || nearBottom) {
            this.opacity -= 0.04;
            if (this.opacity <= 0) {
                if (nearLeft) this.x = this.canvas.width - margin + 5;
                else if (nearRight) this.x = margin - 5;
                if (nearTop) this.y = this.totalHeight - margin + 5;
                else if (nearBottom) this.y = margin - 5;
                this.opacity = 0;
            }
        } else {
            if (this.opacity < this.targetOpacity) this.opacity += 0.02;
        }

        const dxMouse = this.x - mouse.x;
        const dyMouse = this.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        const petMouse = window.deltaBG?.petMouse || { x: -1000, y: -1000 };
        const dxPet = this.x - petMouse.x;
        const dyPet = this.y - petMouse.y;
        const distPet = Math.sqrt(dxPet * dxPet + dyPet * dyPet);

        if (distMouse < mouse.radius || distPet < mouse.radius) {
            const forceM = distMouse < mouse.radius ? (mouse.radius - distMouse) / mouse.radius : 0;
            const forceP = distPet < mouse.radius ? (mouse.radius - distPet) / mouse.radius : 0;
            const force = Math.max(forceM, forceP);
            const dx = distMouse < distPet ? dxMouse : dxPet;
            const dy = distMouse < distPet ? dyMouse : dyPet;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            this.speedX += (dx / d) * force * 0.8;
            this.speedY += (dy / d) * force * 0.8;
        } else {
            for (let p2 of allParticles) {
                if (p2 === this) continue;
                const dx = this.x - p2.x;
                const dy = this.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = 150;

                if (dist < minDist) {
                    const force = (minDist - dist) / minDist;
                    this.speedX += (dx / dist) * force * 0.02;
                    this.speedY += (dy / dist) * force * 0.02;
                }
            }
        }

        this.speedX *= 0.97;
        this.speedY *= 0.97;
    }

    draw(ctx, drawY) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        ctx.lineTo(this.points[1].x, this.points[1].y);
        ctx.lineTo(this.points[2].x, this.points[2].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}