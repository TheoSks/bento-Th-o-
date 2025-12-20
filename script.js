// ====================================
// Bento Portfolio - Interactive Effects
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initRippleEffect();
    initScrollAnimations();
    initTiltEffect();
    initVideoHover();
    initGalleryModal();
    initParallaxEffect();
    initButtonEffects();
    initStatusUpdate();
    initKeyboardNavigation();

    console.log('%c🎨 Bento Portfolio Loaded', 'color: #0a66c2; font-size: 20px; font-weight: bold;');
});

// ====================================
// Ripple Effect on Click
// ====================================
function initRippleEffect() {
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't create ripple if clicking on a button inside
            if (e.target.closest('button')) return;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ====================================
// Scroll Animations with Intersection Observer
// ====================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on position
                const delay = index * 50;

                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const animatedElements = document.querySelectorAll('.section, .bento-card');
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.03}s`;
        observer.observe(el);
    });
}

// ====================================
// 3D Tilt Effect on Cards
// ====================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// ====================================
// Video Hover Effects
// ====================================
function initVideoHover() {
    const deviceCard = document.querySelector('.device-card');
    const video = document.querySelector('.showcase-video');

    if (deviceCard && video) {
        deviceCard.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Video autoplay blocked:', e));
        });

        deviceCard.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
}

// ====================================
// Gallery Modal for Behance Items
// ====================================
function initGalleryModal() {
    const behanceItems = document.querySelectorAll('.behance-item');

    behanceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();

            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.className = 'gallery-modal';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(10px);
            `;

            // Create modal content
            const content = document.createElement('div');
            const bgStyle = this.style.background;
            const title = this.querySelector('.behance-overlay span')?.textContent || 'Project';

            content.style.cssText = `
                background: ${bgStyle};
                width: 80%;
                max-width: 900px;
                height: 70vh;
                border-radius: 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                position: relative;
                overflow: hidden;
            `;

            content.innerHTML = `
                <h2 style="font-size: 3rem; font-weight: 800; margin-bottom: 20px;">${title}</h2>
                <p style="font-size: 1.2rem; opacity: 0.8;">Cliquez pour fermer</p>
            `;

            overlay.appendChild(content);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            // Trigger animations
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                content.style.transform = 'scale(1)';
            });

            // Close modal
            const closeModal = () => {
                overlay.style.opacity = '0';
                content.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 300);
            };

            overlay.addEventListener('click', closeModal);
        });
    });
}

// ====================================
// Parallax Effect on Profile
// ====================================
function initParallaxEffect() {
    const profile = document.querySelector('.profile-content');
    const sidebar = document.querySelector('.profile-sidebar');

    if (profile && sidebar) {
        sidebar.addEventListener('mousemove', (e) => {
            const rect = sidebar.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            profile.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });

        sidebar.addEventListener('mouseleave', () => {
            profile.style.transform = '';
            profile.style.transition = 'transform 0.5s ease';
        });
    }
}

// ====================================
// Button Interaction Effects
// ====================================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.follow-btn, .login-btn, .settings-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });

        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Prevent card click when clicking follow buttons
    const followBtns = document.querySelectorAll('.follow-btn');
    followBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Toggle follow state
            if (btn.textContent.includes('Follow')) {
                btn.innerHTML = btn.innerHTML.replace('Follow', 'Following');
                btn.style.background = '#10b981';
            } else {
                btn.innerHTML = btn.innerHTML.replace('Following', 'Follow');
                btn.style.background = '';
            }
        });
    });
}

// ====================================
// Status Update Based on Time
// ====================================
function initStatusUpdate() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    function updateStatus() {
        if (!statusDot || !statusText) return;

        const hours = new Date().getHours();
        const isWorkingHours = hours >= 9 && hours < 18;

        if (isWorkingHours) {
            statusDot.style.background = '#10b981';
            statusText.textContent = 'Disponible pour de nouveaux projets';
        } else {
            statusDot.style.background = '#f59e0b';
            statusText.textContent = 'Hors ligne - De retour demain 9h';
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000);
}

// ====================================
// Keyboard Navigation
// ====================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.gallery-modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        }
    });

    // Make cards focusable for accessibility
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// Magnetic Effect on Social Icons
// ====================================
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.linkedin-logo, .behance-logo, .figma-logo, .contact-icon');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// Initialize magnetic effect
initMagneticEffect();

// ====================================
// Performance: Lazy Load Images
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// Copy Email on Click
// ====================================
const emailCard = document.querySelector('.contact-card.email');
if (emailCard) {
    emailCard.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = emailCard.querySelector('.contact-value')?.textContent;

        if (email) {
            try {
                await navigator.clipboard.writeText(email);

                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copié !';
                tooltip.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #1d1d1f;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    z-index: 9999;
                    animation: slideUp 0.3s ease;
                `;

                document.body.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            } catch (err) {
                // Fallback: open mail client
                window.location.href = `mailto:${email}`;
            }
        }
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================================
// Easter Egg: Konami Code
// ====================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});
