// Ripple Effect on Click
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', function(e) {
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

// Video Hover Effects
const videoBlocks = document.querySelectorAll('.video-block');
videoBlocks.forEach(block => {
    const video = block.querySelector('.bento-video');

    if (video) {
        block.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Video play failed:', e));
        });

        block.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// Intersection Observer for Entrance Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all bento items with staggered animation
const bentoItems = document.querySelectorAll('.bento-item');
bentoItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(item);
});

// Parallax Effect on Mouse Move
const header = document.querySelector('.header');
if (header) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        header.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    });
}

// Tilt Effect on Bento Items
bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});

// Smooth Link Clicks
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

// Dynamic Gradient Animation on Hover
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];

        const randomGradient = colors[Math.floor(Math.random() * colors.length)];
        this.style.background = randomGradient;
    });

    skill.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
});

// Gallery Image Click Handler
const imageItems = document.querySelectorAll('.image-item');
imageItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: ${this.style.background};
            width: 80%;
            max-width: 800px;
            height: 60vh;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            font-weight: 700;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        content.textContent = this.querySelector('span').textContent;

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Trigger animations
        setTimeout(() => {
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);

        // Close on click
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            setTimeout(() => overlay.remove(), 300);
        });
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any overlays
        document.querySelectorAll('[style*="z-index: 1000"]').forEach(el => el.remove());
    }
});

// Performance: Lazy Load Videos
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
                videoObserver.unobserve(video);
            }
        });
    });

    document.querySelectorAll('video[data-src]').forEach(video => {
        videoObserver.observe(video);
    });
}

// Add Custom Cursor Effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
});

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .bento-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(99, 102, 241, 0.2)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});

// Update Status Indicator
function updateStatus() {
    const statusText = document.querySelector('.status h3');
    const hours = new Date().getHours();

    if (hours >= 9 && hours < 18) {
        if (statusText) statusText.textContent = 'En ligne';
    } else {
        if (statusText) statusText.textContent = 'Hors ligne';
    }
}

updateStatus();
setInterval(updateStatus, 60000); // Update every minute

// Log initialization
console.log('%c🎨 Bento Portfolio Loaded', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with ❤️', 'color: #ec4899; font-size: 14px;');
