/* =============================================
   Dr. Prerna Golekar Gopale — Main Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // Sticky Navbar with shadow
    // =============================================
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }


    // =============================================
    // Mobile Hamburger Menu
    // =============================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }


    // =============================================
    // Hero Social Buttons Touch Glow (Mobile)
    // =============================================
    const heroSocialButtons = document.querySelectorAll('.hero-social-btn');
    const isTouchViewport = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (heroSocialButtons.length && isTouchViewport) {
        heroSocialButtons.forEach((btn) => {
            const addGlow = () => btn.classList.add('touch-glow');
            const removeGlow = () => btn.classList.remove('touch-glow');

            btn.addEventListener('touchstart', addGlow, { passive: true });
            btn.addEventListener('touchend', removeGlow, { passive: true });
            btn.addEventListener('touchcancel', removeGlow, { passive: true });
        });
    }


    // =============================================
    // Mobile Touch Feedback for CTA Buttons
    // =============================================
    if (isTouchViewport) {
        const touchFeedbackTargets = document.querySelectorAll(
            '.mobile-cta, .hero-cta-btn, .btn-sage, .cta-btn, .form-submit, .clinic-action-btn, .contact-pill-btn, .filter-btn'
        );

        touchFeedbackTargets.forEach((el) => {
            const addTouchActive = () => el.classList.add('touch-active');
            const removeTouchActive = () => {
                setTimeout(() => el.classList.remove('touch-active'), 120);
            };

            el.addEventListener('touchstart', addTouchActive, { passive: true });
            el.addEventListener('touchend', removeTouchActive, { passive: true });
            el.addEventListener('touchcancel', removeTouchActive, { passive: true });
        });
    }


    // =============================================
    // Home Programs Mobile Auto-Slider
    // =============================================
    const homeProgramsGrid = document.querySelector('#programs .programs-grid');
    if (homeProgramsGrid) {
        let autoSlideTimer = null;
        const homeProgramCards = homeProgramsGrid.querySelectorAll('.program-card');

        const isMobileViewport = () => window.matchMedia('(max-width: 900px)').matches;

        const applyProgramsMobileLayout = () => {
            if (isMobileViewport()) {
                homeProgramsGrid.style.display = 'grid';
                homeProgramsGrid.style.gridAutoFlow = 'column';
                homeProgramsGrid.style.gridAutoColumns = 'minmax(250px, 82vw)';
                homeProgramsGrid.style.gap = '14px';
                homeProgramsGrid.style.overflowX = 'auto';
                homeProgramsGrid.style.overscrollBehaviorX = 'contain';
                homeProgramsGrid.style.scrollSnapType = 'x mandatory';
                homeProgramsGrid.style.scrollBehavior = 'smooth';
                homeProgramsGrid.style.padding = '4px 2px 12px';
                homeProgramsGrid.style.webkitOverflowScrolling = 'touch';

                homeProgramCards.forEach((card) => {
                    card.style.scrollSnapAlign = 'start';
                    card.style.borderRadius = '18px';
                    card.style.minWidth = '250px';
                    card.style.maxWidth = '320px';

                    const image = card.querySelector('.card-image');
                    const body = card.querySelector('.card-body');
                    const title = card.querySelector('.card-title');
                    const desc = card.querySelector('.card-desc');
                    const cta = card.querySelector('.card-cta');

                    if (image) image.style.height = '180px';
                    if (body) body.style.padding = '18px';
                    if (title) {
                        title.style.fontSize = '24px';
                        title.style.marginBottom = '10px';
                    }
                    if (desc) {
                        desc.style.fontSize = '14px';
                        desc.style.lineHeight = '1.65';
                        desc.style.minHeight = '0';
                        desc.style.marginBottom = '14px';
                    }
                    if (cta) cta.style.fontSize = '15px';
                });
            } else {
                homeProgramsGrid.removeAttribute('style');
                homeProgramCards.forEach((card) => {
                    card.removeAttribute('style');

                    const image = card.querySelector('.card-image');
                    const body = card.querySelector('.card-body');
                    const title = card.querySelector('.card-title');
                    const desc = card.querySelector('.card-desc');
                    const cta = card.querySelector('.card-cta');

                    if (image) image.removeAttribute('style');
                    if (body) body.removeAttribute('style');
                    if (title) title.removeAttribute('style');
                    if (desc) desc.removeAttribute('style');
                    if (cta) cta.removeAttribute('style');
                });
            }
        };

        const startProgramsAutoSlide = () => {
            if (!isMobileViewport() || autoSlideTimer) return;

            autoSlideTimer = setInterval(() => {
                const firstCard = homeProgramsGrid.querySelector('.program-card');
                if (!firstCard) return;

                const gap = 16;
                const step = firstCard.getBoundingClientRect().width + gap;
                const maxScrollLeft = homeProgramsGrid.scrollWidth - homeProgramsGrid.clientWidth;

                if (homeProgramsGrid.scrollLeft + step >= maxScrollLeft - 4) {
                    homeProgramsGrid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    homeProgramsGrid.scrollBy({ left: step, behavior: 'smooth' });
                }
            }, 2800);
        };

        const stopProgramsAutoSlide = () => {
            if (!autoSlideTimer) return;
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        };

        homeProgramsGrid.addEventListener('touchstart', stopProgramsAutoSlide, { passive: true });
        homeProgramsGrid.addEventListener('mouseenter', stopProgramsAutoSlide);
        homeProgramsGrid.addEventListener('mouseleave', startProgramsAutoSlide);

        window.addEventListener('resize', () => {
            applyProgramsMobileLayout();
            stopProgramsAutoSlide();
            startProgramsAutoSlide();
        });

        applyProgramsMobileLayout();
        startProgramsAutoSlide();
    }


    // =============================================
    // Testimonials Mobile Sliders (Reviews + Videos)
    // =============================================
    const reviewCardsRow = document.querySelector('#testimonials .review-cards-row');
    const videoTopRow = document.querySelector('#testimonials .video-testimonials-top');
    const videoBottomRow = document.querySelector('#testimonials .video-testimonials-bottom');

    const setupMobileHorizontalSlider = (row, config = {}) => {
        if (!row) return;

        let autoSlideTimer = null;
        const cards = row.querySelectorAll(config.cardSelector || '.review-card, .video-card');
        const isMobileViewport = () => window.matchMedia('(max-width: 900px)').matches;
        const gap = config.gap || 14;

        const applyMobileLayout = () => {
            if (isMobileViewport()) {
                row.style.display = 'grid';
                row.style.gridAutoFlow = 'column';
                row.style.gridAutoColumns = config.autoColumns || 'minmax(250px, 84vw)';
                row.style.gap = `${gap}px`;
                row.style.overflowX = 'auto';
                row.style.overscrollBehaviorX = 'contain';
                row.style.scrollSnapType = 'x mandatory';
                row.style.scrollBehavior = 'smooth';
                row.style.padding = '4px 2px 12px';
                row.style.maxWidth = '100%';
                row.style.margin = '0';
                row.style.webkitOverflowScrolling = 'touch';

                cards.forEach((card) => {
                    card.style.scrollSnapAlign = 'start';
                    card.style.minWidth = config.minWidth || '250px';
                    card.style.maxWidth = config.maxWidth || '340px';
                    card.style.width = '100%';

                    if (config.type === 'review') {
                        card.style.padding = '20px';
                        card.style.minHeight = '0';
                    }

                    if (config.type === 'video') {
                        const thumbnail = card.querySelector('.video-thumbnail');
                        if (thumbnail) thumbnail.style.height = config.videoHeight || '200px';
                    }
                });
            } else {
                row.removeAttribute('style');
                cards.forEach((card) => {
                    card.removeAttribute('style');

                    if (config.type === 'video') {
                        const thumbnail = card.querySelector('.video-thumbnail');
                        if (thumbnail) thumbnail.removeAttribute('style');
                    }
                });
            }
        };

        const startAutoSlide = () => {
            if (!isMobileViewport() || autoSlideTimer) return;

            autoSlideTimer = setInterval(() => {
                const firstCard = row.querySelector(config.cardSelector || '.review-card, .video-card');
                if (!firstCard) return;

                const step = firstCard.getBoundingClientRect().width + gap;
                const maxScrollLeft = row.scrollWidth - row.clientWidth;

                if (row.scrollLeft + step >= maxScrollLeft - 4) {
                    row.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    row.scrollBy({ left: step, behavior: 'smooth' });
                }
            }, config.interval || 3000);
        };

        const stopAutoSlide = () => {
            if (!autoSlideTimer) return;
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        };

        row.addEventListener('touchstart', stopAutoSlide, { passive: true });
        row.addEventListener('mouseenter', stopAutoSlide);
        row.addEventListener('mouseleave', startAutoSlide);

        window.addEventListener('resize', () => {
            applyMobileLayout();
            stopAutoSlide();
            startAutoSlide();
        });

        applyMobileLayout();
        startAutoSlide();
    };

    setupMobileHorizontalSlider(reviewCardsRow, {
        type: 'review',
        cardSelector: '.review-card',
        autoColumns: 'minmax(250px, 84vw)',
        minWidth: '250px',
        maxWidth: '340px',
        gap: 14,
        interval: 3200
    });

    setupMobileHorizontalSlider(videoTopRow, {
        type: 'video',
        cardSelector: '.video-card',
        autoColumns: 'minmax(260px, 86vw)',
        minWidth: '260px',
        maxWidth: '360px',
        videoHeight: '200px',
        gap: 14,
        interval: 3400
    });

    setupMobileHorizontalSlider(videoBottomRow, {
        type: 'video',
        cardSelector: '.video-card',
        autoColumns: 'minmax(260px, 86vw)',
        minWidth: '260px',
        maxWidth: '360px',
        videoHeight: '200px',
        gap: 14,
        interval: 3400
    });


    // =============================================
    // Floating Contact Buttons
    // =============================================
    const floatingButtons = document.getElementById('floating-contact-buttons');
    const heroSection = document.getElementById('hero');
    if (floatingButtons) {
        if (heroSection) {
            const updateHomeFloatingVisibility = () => {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                floatingButtons.classList.toggle('visible', heroBottom < 120);
            };

            // Home page: show buttons only after hero section scrolls out of view.
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    floatingButtons.classList.toggle('visible', !entry.isIntersecting);
                });
            }, { threshold: 0.08 });
            heroObserver.observe(heroSection);

            // Scroll fallback keeps behavior consistent across browsers.
            updateHomeFloatingVisibility();
            window.addEventListener('scroll', updateHomeFloatingVisibility, { passive: true });
            window.addEventListener('resize', updateHomeFloatingVisibility);
        } else {
            // Inner pages: keep buttons visible by default.
            floatingButtons.classList.add('visible');
        }
    }


    // =============================================
    // Stats Count-Up Animation
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }


    // =============================================
    // Scroll Reveal Animations
    // =============================================
    const revealElements = document.querySelectorAll(
        '.stat-block, .logo-card, .benefit-item, .timeline-step, ' +
        '.program-card, .resource-card, .review-card, .video-card, ' +
        '.wyg-content, .wyg-image, .founder-content, .founder-image, ' +
        '.cta-inner, .footer-col, .qual-card, .offer-card, .gallery-item, ' +
        '.contact-card, .contact-form-card, .faq-item, .diet-program-card, ' +
        '.about-story-content, .about-story-image, .page-hero-content, .page-hero-image, ' +
        '.program-tag, .service-detail'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 60;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // =============================================
    // Heading + Eyebrow reveals
    // =============================================
    const headings = document.querySelectorAll(
        '.section-heading, .section-heading-lg, .section-heading-xl, ' +
        '.media-heading, .cta-heading, .page-hero-heading, .form-title, ' +
        '.gallery-sub, .service-detail-title'
    );
    headings.forEach(h => { h.classList.add('reveal'); revealObserver.observe(h); });

    document.querySelectorAll('.eyebrow').forEach(e => {
        e.classList.add('reveal');
        revealObserver.observe(e);
    });


    // =============================================
    // Logo stagger fade-in
    // =============================================
    const logoCards = document.querySelectorAll('.logo-card');
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.parentElement.querySelectorAll('.logo-card').forEach((logo, i) => {
                    setTimeout(() => { logo.style.opacity = '1'; logo.style.transform = 'translateY(0)'; }, i * 100);
                });
                logoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    logoCards.forEach(card => {
        card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    if (logoCards.length > 0) logoObserver.observe(logoCards[0]);


    // =============================================
    // Timeline step pop-in
    // =============================================
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.timeline-step').forEach((step, i) => {
                    setTimeout(() => { step.style.opacity = '1'; step.style.transform = 'translateY(0) scale(1)'; }, i * 200);
                });
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    timelineSteps.forEach(step => {
        step.style.opacity = '0'; step.style.transform = 'translateY(30px) scale(0.9)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    if (timelineSteps.length > 0) tlObserver.observe(timelineSteps[0]);


    // =============================================
    // Benefit list slide-in
    // =============================================
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.benefit-item').forEach((item, i) => {
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, i * 150);
                });
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    benefitItems.forEach(item => {
        item.style.opacity = '0'; item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    if (benefitItems.length > 0) benefitObserver.observe(benefitItems[0]);


    // =============================================
    // Gallery Filters
    // =============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0'; item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });


    // =============================================
    // Gallery Lightbox
    // =============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentLightboxIndex = 0;
    let visibleItems = [];

    function openLightbox(index) {
        visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
        currentLightboxIndex = index;
        updateLightboxImage();
        if (lightbox) { lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
    }

    function closeLightbox() {
        if (lightbox) { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
    }

    function updateLightboxImage() {
        if (visibleItems[currentLightboxIndex]) {
            const item = visibleItems[currentLightboxIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            if (lightboxImg) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
            if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
        }
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', e => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxImage();
    });
    if (lightboxNext) lightboxNext.addEventListener('click', e => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
        updateLightboxImage();
    });
    document.addEventListener('keydown', e => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') { currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length; updateLightboxImage(); }
            if (e.key === 'ArrowRight') { currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length; updateLightboxImage(); }
        }
    });


    // =============================================
    // FAQ Accordion
    // =============================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (btn) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                    const q = faq.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });


    // =============================================
    // Contact Form Handling
    // =============================================
    const consultationForm = document.getElementById('consultation-form');
    const formSuccess = document.getElementById('form-success');
    if (consultationForm) {
        consultationForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const program = document.getElementById('program');
            if (!name.value.trim() || !phone.value.trim() || !program.value) {
                const submitBtn = document.getElementById('form-submit');
                submitBtn.style.animation = 'shake 0.5s ease';
                setTimeout(() => { submitBtn.style.animation = ''; }, 500);
                return;
            }
            consultationForm.style.display = 'none';
            if (formSuccess) formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }


    // =============================================
    // Services Page — Sidebar Navigation
    // =============================================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const serviceDetails = document.querySelectorAll('.service-detail');

    if (sidebarLinks.length > 0 && serviceDetails.length > 0) {
        // Click handler
        sidebarLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offset = 120;
                    const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Scroll spy — highlight sidebar link based on visible service section
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    sidebarLinks.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('data-target') === id);
                    });
                }
            });
        }, { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 });

        serviceDetails.forEach(section => serviceObserver.observe(section));

        // Handle hash links from other pages
        if (window.location.hash) {
            setTimeout(() => {
                const hash = window.location.hash.substring(1);
                const target = document.getElementById(hash);
                if (target) {
                    const offset = 120;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                    sidebarLinks.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('data-target') === hash);
                    });
                }
            }, 300);
        }
    }


    // =============================================
    // Diet program cards stagger
    // =============================================
    const dietCards = document.querySelectorAll('.diet-program-card');
    const dietObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dietCards.forEach((card, i) => {
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)'; }, i * 60);
                });
                dietObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    dietCards.forEach(card => {
        card.style.opacity = '0'; card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    if (dietCards.length > 0) dietObserver.observe(dietCards[0]);


    // =============================================
    // Qualification + Offer card stagger animations
    // =============================================
    function setupStagger(selector) {
        const cards = document.querySelectorAll(selector);
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach((card, i) => {
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, i * 100);
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        cards.forEach(card => {
            card.style.opacity = '0'; card.style.transform = 'translateY(25px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        if (cards.length > 0) obs.observe(cards[0]);
    }

    setupStagger('.qual-card');
    setupStagger('.offer-card');

});

/* Shake animation for form validation */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}`;
document.head.appendChild(shakeStyle);
