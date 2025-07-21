// HTTP Conexión - JavaScript Interactivo

// Crear partículas animadas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Colores aleatorios para las partículas
        const colors = ['#00d4ff', '#7b2ff7', '#ff416c', '#4ecdc4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Animaciones de scroll - aparición progresiva
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100); // Retraso escalonado para efecto cascada
        }
    });
}

// Navegación suave entre secciones
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efecto de header transparente que cambia al hacer scroll
function setupHeaderEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
}

// Animación de conteo para estadísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(target.replace(/[^\d]/g, ''));
        
        if (isNumber) {
            const finalNumber = parseInt(target.replace(/[^\d]/g, ''));
            const suffix = target.replace(/[\d]/g, '');
            let current = 0;
            const increment = finalNumber / 50;
            const duration = 2000; // 2 segundos
            const stepTime = duration / 50;
            
            stat.textContent = '0' + suffix;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    stat.textContent = finalNumber + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        }
    });
}

// Efecto de typing para el título principal
function typingEffect() {
    const title = document.querySelector('.hero h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #00d4ff';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Quitar el cursor después de terminar
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Iniciar el efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// Efectos de hover mejorados para tarjetas
function setupCardEffects() {
    // Efecto para feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Efecto para protocol cards
    document.querySelectorAll('.protocol-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.borderLeftWidth = '8px';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.borderLeftWidth = '4px';
            this.style.boxShadow = '';
        });
    });
}

// Efecto de parallax suave
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const appIcon = document.querySelector('.hero-app-icon');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (appIcon) {
            appIcon.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.1}deg)`;
        }
    });
}

// Detector de visibilidad para animaciones
function setupVisibilityDetector() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar stats cuando sea visible
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Preloader simple
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #0a0a0f, #1a1a2e);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border: 3px solid rgba(0, 212, 255, 0.3);
                border-top: 3px solid #00d4ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(preloader);
    
    // Ocultar preloader cuando la página esté cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Efectos de botones mejorados
function setupButtonEffects() {
    document.querySelectorAll('.btn, .store-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Efecto de click
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

// Función de inicialización principal
function initializeApp() {
    showPreloader();
    createParticles();
    setupSmoothScroll();
    setupHeaderEffect();
    setupCardEffects();
    setupParallax();
    setupVisibilityDetector();
    setupButtonEffects();
    
    // Efecto typing solo en desktop
    if (window.innerWidth > 768) {
        typingEffect();
    }
    
    // Manejo de scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    console.log('🚀 HTTP Conexión website loaded successfully!');
    console.log('💫 Developed by EL CRIS DEV');
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Manejo de redimensionamiento de ventana
window.addEventListener('resize', () => {
    // Recrear partículas si es necesario
    if (window.innerWidth > 768) {
        const particles = document.getElementById('particles');
        if (particles.children.length < 30) {
            createParticles();
        }
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activado
        document.body.style.filter = 'hue-rotate(180deg)';
        alert('🎉 Easter Egg Activado! Tema Invertido por EL CRIS DEV');
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
        konamiCode = [];
    }
});

// Función para compartir en redes sociales
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'HTTP Conexión - VPN Futurista',
            text: 'Descubre la mejor VPN con diseño futurista y protocolos SSH/SSL/TLS',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('HTTP Conexión - La mejor VPN futurista');
        
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    }
}

// Exportar funciones para uso global
window.shareApp = shareApp;