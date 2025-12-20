// ========================================
// Bento.me Style Portfolio - Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initFollowButtons();
    initGalleryHover();
    initCopyEmail();
    initStatusPulse();
    initEditMode();
    initDragAndDrop();
    initMarqueeCustomization();
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
            // Don't open lightbox in edit mode
            if (document.body.classList.contains('edit-mode')) return;

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
            // Don't copy in edit mode
            if (document.body.classList.contains('edit-mode')) return;

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
        bottom: 80px;
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
// Edit Mode Toggle
// ========================================
let sortableInstances = [];

function initEditMode() {
    const editToggle = document.getElementById('edit-mode-toggle');

    if (editToggle) {
        editToggle.addEventListener('click', () => {
            document.body.classList.toggle('edit-mode');
            const isEditMode = document.body.classList.contains('edit-mode');

            if (isEditMode) {
                showToast('Mode édition activé - Glissez les cartes !');
                enableDragAndDrop();
            } else {
                showToast('Mode édition désactivé');
                disableDragAndDrop();
                saveLayout();
            }
        });
    }

    // Keyboard shortcut (E key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'e' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
            editToggle?.click();
        }
    });
}

// ========================================
// Drag and Drop with SortableJS
// ========================================
function initDragAndDrop() {
    // Load saved layout
    loadLayout();
}

function enableDragAndDrop() {
    const containers = document.querySelectorAll('.sortable-cards');

    containers.forEach(container => {
        const sortable = new Sortable(container, {
            animation: 200,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            handle: '.drag-handle',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            forceFallback: true,
            fallbackClass: 'sortable-fallback',
            fallbackOnBody: true,
            swapThreshold: 0.65,

            // Allow dragging between different sections
            group: 'cards',

            onStart: function(evt) {
                document.body.style.cursor = 'grabbing';
            },

            onEnd: function(evt) {
                document.body.style.cursor = '';

                // Visual feedback
                const item = evt.item;
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = 'dropBounce 0.3s ease';

                setTimeout(() => {
                    item.style.animation = '';
                }, 300);
            }
        });

        sortableInstances.push(sortable);
    });

    // Add drop animation keyframe
    if (!document.getElementById('drop-animation-style')) {
        const style = document.createElement('style');
        style.id = 'drop-animation-style';
        style.textContent = `
            @keyframes dropBounce {
                0% { transform: scale(1.05); }
                50% { transform: scale(0.98); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function disableDragAndDrop() {
    sortableInstances.forEach(instance => {
        instance.destroy();
    });
    sortableInstances = [];
}

// ========================================
// Save and Load Layout
// ========================================
function saveLayout() {
    const layout = {};
    const containers = document.querySelectorAll('.sortable-cards');

    containers.forEach(container => {
        const section = container.dataset.section;
        const cardIds = Array.from(container.querySelectorAll('.card')).map(card => card.dataset.id);
        layout[section] = cardIds;
    });

    localStorage.setItem('bento-layout', JSON.stringify(layout));
    showToast('Layout sauvegardé !');
}

function loadLayout() {
    const savedLayout = localStorage.getItem('bento-layout');
    if (!savedLayout) return;

    try {
        const layout = JSON.parse(savedLayout);

        Object.entries(layout).forEach(([section, cardIds]) => {
            const container = document.querySelector(`[data-section="${section}"]`);
            if (!container) return;

            cardIds.forEach(cardId => {
                const card = document.querySelector(`[data-id="${cardId}"]`);
                if (card && card.parentElement === container) {
                    container.appendChild(card);
                }
            });
        });
    } catch (e) {
        console.error('Error loading layout:', e);
    }
}

// ========================================
// Marquee Customization
// ========================================
function initMarqueeCustomization() {
    const marqueeTexts = document.querySelectorAll('.marquee-text');

    // Double-click to edit
    marqueeTexts.forEach(text => {
        text.addEventListener('dblclick', (e) => {
            e.preventDefault();

            const currentText = text.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.style.cssText = `
                background: transparent;
                border: none;
                color: white;
                font-size: inherit;
                font-weight: inherit;
                width: 100%;
                min-width: 300px;
                outline: none;
                padding: 0;
            `;

            // Pause animation
            const marqueeContent = text.closest('.marquee-content');
            marqueeContent.style.animationPlayState = 'paused';

            text.textContent = '';
            text.appendChild(input);
            input.focus();
            input.select();

            const saveText = () => {
                const newText = input.value || currentText;
                text.textContent = newText;

                // Update all marquee texts
                marqueeTexts.forEach(t => {
                    t.textContent = newText;
                });

                // Resume animation
                marqueeContent.style.animationPlayState = '';

                // Save to localStorage
                localStorage.setItem('bento-marquee-text', newText);
                showToast('Bandeau mis à jour !');
            };

            input.addEventListener('blur', saveText);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                } else if (e.key === 'Escape') {
                    text.textContent = currentText;
                    marqueeContent.style.animationPlayState = '';
                }
            });
        });
    });

    // Load saved text
    const savedText = localStorage.getItem('bento-marquee-text');
    if (savedText) {
        marqueeTexts.forEach(text => {
            text.textContent = savedText;
        });
    }
}

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close lightbox
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        // Exit edit mode
        if (document.body.classList.contains('edit-mode')) {
            document.getElementById('edit-mode-toggle')?.click();
        }
    }
});

// ========================================
// Subtle Tilt Effect on Cards
// ========================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Don't tilt in edit mode
            if (document.body.classList.contains('edit-mode')) return;

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
}

// Initialize tilt effect
initTiltEffect();

// ========================================
// Map Card Interaction
// ========================================
document.querySelectorAll('.card-map').forEach(mapCard => {
    mapCard.addEventListener('click', (e) => {
        // Don't interact in edit mode
        if (document.body.classList.contains('edit-mode')) return;

        // If clicking on the map itself, let it handle the event
        if (e.target.tagName === 'IFRAME') return;

        // Open Google Maps in new tab
        window.open('https://www.google.com/maps/place/Bordeaux,+France', '_blank');
    });
});

// Console welcome
console.log('%c👋 Théo Gaggio Portfolio', 'font-size: 16px; font-weight: bold; color: #0a66c2;');
console.log('%c💡 Press "E" to toggle edit mode and drag cards!', 'font-size: 12px; color: #86868b;');
