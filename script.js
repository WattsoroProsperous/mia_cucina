/**
 * Mia Cucina - Modern Restaurant Website
 * Advanced JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Elements
    const preloader = document.getElementById('preloader');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // ===================================
    // PRELOADER
    // ===================================
    function hidePreloader() {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 800);
        }
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }

    // Fallback: hide preloader after 3 seconds max
    setTimeout(hidePreloader, 3000);

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ===================================
    // MOBILE MENU
    // ===================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ===================================
    // ACTIVE NAV LINK ON SCROLL
    // ===================================
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // MENU PREVIEW CARDS ANIMATION
    // ===================================
    const menuPreviewCards = document.querySelectorAll('.menu-preview-card');
    menuPreviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ===================================
    // GALLERY LIGHTBOX
    // ===================================
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ===================================
    // PARALLAX EFFECT ON HERO
    // ===================================
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroVideo.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===================================
    // MENU CARDS HOVER EFFECT
    // ===================================
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-item, .hours-row, .contact-item').forEach(el => {
        animationObserver.observe(el);
    });

    // ===================================
    // CURRENT YEAR IN FOOTER
    // ===================================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ===================================
    // CHEF VIDEO PLAYER
    // ===================================
    const chefVideo = document.getElementById('chefVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoProgressBar = document.getElementById('videoProgressBar');

    if (chefVideo && videoPlayBtn) {
        // Play/Pause toggle
        videoPlayBtn.addEventListener('click', () => {
            if (chefVideo.paused) {
                chefVideo.play();
                videoPlayBtn.classList.add('playing');
                videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                chefVideo.pause();
                videoPlayBtn.classList.remove('playing');
                videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Click on video to toggle play/pause
        chefVideo.addEventListener('click', () => {
            videoPlayBtn.click();
        });

        // Update progress bar
        chefVideo.addEventListener('timeupdate', () => {
            const progress = (chefVideo.currentTime / chefVideo.duration) * 100;
            if (videoProgressBar) {
                videoProgressBar.style.width = progress + '%';
            }
        });

        // Reset when video ends
        chefVideo.addEventListener('ended', () => {
            videoPlayBtn.classList.remove('playing');
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (videoProgressBar) {
                videoProgressBar.style.width = '0%';
            }
        });

        // Pause video when not in viewport
        const chefVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !chefVideo.paused) {
                    chefVideo.pause();
                    videoPlayBtn.classList.remove('playing');
                    videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }, { threshold: 0.25 });

        chefVideoObserver.observe(chefVideo);
    }

    // ===================================
    // VIDEO OPTIMIZATION (Hero)
    // ===================================
    // heroVideo already defined above in PARALLAX section
    if (heroVideo) {
        const heroVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.25 });

        heroVideoObserver.observe(heroVideo);
    }

    // ===================================
    // PHONE NUMBER CLICK TRACKING
    // ===================================
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone call initiated');
            // Add analytics tracking here if needed
        });
    });

    // ===================================
    // SCROLL REVEAL FOR MENU ITEMS
    // ===================================
    const revealMenuItems = () => {
        const menuCardsToReveal = document.querySelectorAll('.menu-card:not(.revealed)');

        menuCardsToReveal.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.85;

            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('revealed');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    };

    // Initial setup for menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', revealMenuItems);
    window.addEventListener('load', () => {
        setTimeout(revealMenuItems, 500);
    });

    // ===================================
    // RESERVATION BUTTON PULSE
    // ===================================
    const phoneCta = document.querySelector('.phone-cta');
    if (phoneCta) {
        setInterval(() => {
            phoneCta.style.transform = 'scale(1.05)';
            setTimeout(() => {
                phoneCta.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ===================================
    // IMAGE LAZY LOADING
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    // ===================================
    // KEYBOARD NAVIGATION
    // ===================================
    document.addEventListener('keydown', (e) => {
        // ESC closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    // Debounce scroll events
    let scrollTimeout;
    const debouncedScroll = () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            handleNavbarScroll();
            handleBackToTop();
            highlightNavOnScroll();
        });
    };

    window.removeEventListener('scroll', handleNavbarScroll);
    window.removeEventListener('scroll', handleBackToTop);
    window.removeEventListener('scroll', highlightNavOnScroll);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // ===================================
    // TOUCH DEVICE DETECTION
    // ===================================
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    console.log('%c Mia Cucina ', 'background: #2c3e3a; color: #d4a84b; font-size: 20px; padding: 10px;');
    console.log('%c Restaurant - Pizzeria ', 'color: #666; font-size: 14px;');
});