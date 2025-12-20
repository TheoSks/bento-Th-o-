// ========================================
// Bento.me Style Portfolio - Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initFollowButtons();
    initGalleryHover();
    initCopyEmail();
    initStatusPulse();
});

// ========================================
// Card Entrance Animations
// ========================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ========================================
// Follow Button Toggle
// ========================================
function initFollowButtons() {
    const followBtns = document.querySelectorAll('.btn-follow');

    followBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isFollowing = btn.classList.toggle('following');

            if (isFollowing) {
                btn.innerHTML = btn.innerHTML.replace('Follow', 'Following');
                btn.style.background = '#10b981';
            } else {
                btn.innerHTML = btn.innerHTML.replace('Following', 'Follow');
                btn.style.background = '';
            }
        });
    });
}

// ========================================
// Gallery Thumbnail Hover
// ========================================
function initGalleryHover() {
    const thumbs = document.querySelectorAll('.behance-thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                cursor: pointer;
            `;

            const img = document.createElement('div');
            img.style.cssText = `
                width: 80%;
                max-width: 800px;
                height: 60vh;
                background-image: ${thumb.style.backgroundImage};
                background-size: cover;
                background-position: center;
                border-radius: 16px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });

            lightbox.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    });
}

// ========================================
// Copy Email on Click
// ========================================
function initCopyEmail() {
    const emailCard = document.querySelector('.card-email');

    if (emailCard) {
        emailCard.addEventListener('click', async (e) => {
            e.preventDefault();

            const email = 'theo@gaggio.fr';

            try {
                await navigator.clipboard.writeText(email);
                showToast('Email copié !');
            } catch (err) {
                window.location.href = `mailto:${email}`;
            }
        });
    }
}

// ========================================
// Toast Notification
// ========================================
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1d1d1f;
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ========================================
// Status Pulse Animation
// ========================================
function initStatusPulse() {
    const statusDot = document.querySelector('.status-dot');
    if (!statusDot) return;

    const hours = new Date().getHours();
    const isAvailable = hours >= 9 && hours < 18;

    if (!isAvailable) {
        statusDot.style.background = '#f59e0b';
        const label = statusDot.closest('.card-small')?.querySelector('.small-label');
        if (label) label.textContent = 'Away';
    }
}

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
});

// ========================================
// Subtle Tilt Effect on Cards
// ========================================
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Console welcome
console.log('%c👋 Théo Gaggio Portfolio', 'font-size: 16px; font-weight: bold; color: #0a66c2;');
