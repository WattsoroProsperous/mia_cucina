/**
 * Mia Cucina - Menu Page JavaScript
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
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    // ===================================
    // MOBILE MENU
    // ===================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
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

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // MENU CATEGORY FILTER
    // ===================================
    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            menuNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter categories
            menuCategories.forEach(cat => {
                const catCategory = cat.dataset.category;

                if (category === 'all') {
                    cat.style.display = 'block';
                    setTimeout(() => {
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 50);
                } else if (catCategory === category || catCategory === 'all') {
                    cat.style.display = 'block';
                    setTimeout(() => {
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        cat.style.display = 'none';
                    }, 300);
                }
            });

            // Refresh AOS
            setTimeout(() => {
                AOS.refresh();
            }, 350);
        });
    });

    // Add transition to categories
    menuCategories.forEach(cat => {
        cat.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // ===================================
    // CURRENT YEAR IN FOOTER
    // ===================================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ===================================
    // SCROLL REVEAL FOR MENU ITEMS
    // ===================================
    const revealMenuItems = () => {
        const menuCards = document.querySelectorAll('.menu-card:not(.revealed)');

        menuCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.9;

            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('revealed');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 30);
            }
        });
    };

    // Initial setup for menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    window.addEventListener('scroll', revealMenuItems);
    setTimeout(revealMenuItems, 300);

    // ===================================
    // KEYBOARD NAVIGATION
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    console.log('%c Mia Cucina - Menu ', 'background: #2c3e3a; color: #d4a84b; font-size: 16px; padding: 8px;');
});
