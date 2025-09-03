/**
 * Fallback JavaScript for Modern Portfolio
 * Provides core functionality without external dependencies
 */

class ModernPortfolioFallback {
    constructor() {
        this.init();
    }

    init() {
        this.setupCSSCursor();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupFormEnhancements();
        this.setupPortfolioFilters();
        this.setupSkillAnimations();
        this.setupTypewriterEffect();
        this.setupMagneticEffects();
        this.addCSSParticles();
    }

    setupCSSCursor() {
        // Only on desktop
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'css-cursor';
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            document.addEventListener('mousedown', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });

            document.addEventListener('mouseup', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        }
    }

    setupScrollAnimations() {
        // Add CSS classes for animations
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el, index) => {
            el.style.setProperty('--delay', `${index * 0.1}s`);
            el.classList.add('css-fade-up');
        });

        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        slideLeftElements.forEach((el, index) => {
            el.style.setProperty('--delay', `${index * 0.1}s`);
            el.classList.add('css-slide-left');
        });

        const slideRightElements = document.querySelectorAll('.slide-in-right');
        slideRightElements.forEach((el, index) => {
            el.style.setProperty('--delay', `${index * 0.1}s`);
            el.classList.add('css-slide-right');
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 60;
                    
                    // Smooth scroll fallback
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Easing function
                        const easeInOutCubic = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;

                        window.scrollTo(0, startPosition + distance * easeInOutCubic);

                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    }

                    window.requestAnimationFrame(step);
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('progress-bar')) {
                        this.animateProgressBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.animate-on-scroll, .skill, .portfolio-item, [data-counter]').forEach(el => {
            observer.observe(el);
        });
    }

    setupFormEnhancements() {
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', () => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('#portfolio-flters li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach((item, index) => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.classList.add('css-fade-up');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupSkillAnimations() {
        document.querySelectorAll('.skill').forEach(skill => {
            const progressBar = skill.querySelector('.progress-bar');
            const percentage = skill.querySelector('.skill-percentage');
            
            if (progressBar && percentage) {
                const targetValue = parseInt(progressBar.getAttribute('aria-valuenow'));
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateProgressBar(progressBar, targetValue);
                            this.animateCounter(percentage, targetValue);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(skill);
            }
        });
    }

    animateProgressBar(progressBar, targetValue = null) {
        const target = targetValue || parseInt(progressBar.getAttribute('aria-valuenow'));
        progressBar.style.width = '0%';
        progressBar.classList.add('css-progress-bar');
        
        setTimeout(() => {
            progressBar.style.width = `${target}%`;
        }, 100);
    }

    animateCounter(element, targetValue = null) {
        const target = targetValue || parseInt(element.textContent);
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, stepTime);
    }

    setupTypewriterEffect() {
        document.querySelectorAll('.typewriter').forEach(element => {
            if (!element.classList.contains('typed-text-output')) {
                element.classList.add('css-typewriter');
            }
        });
    }

    setupMagneticEffects() {
        document.querySelectorAll('.magnetic, .btn').forEach(element => {
            element.classList.add('css-magnetic');
            
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.05)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    addCSSParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'css-particles';
        document.body.appendChild(particleContainer);

        // Add multiple particle elements
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(98, 68, 197, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: float-particles ${15 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Enhanced spinner
    enhanceSpinner() {
        const spinner = document.querySelector('#spinner .spinner-border');
        if (spinner) {
            spinner.classList.add('enhanced-spinner');
        }
    }

    // Navbar scroll effect
    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar.fixed-top');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                navbar.style.display = 'flex';
                navbar.style.opacity = '1';
            } else {
                navbar.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        navbar.style.display = 'none';
                    }
                }, 300);
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Initialize page load animations
    initPageLoad() {
        setTimeout(() => {
            document.body.classList.add('loaded');
            
            // Hide spinner
            const spinner = document.querySelector('#spinner');
            if (spinner) {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new ModernPortfolioFallback();
    portfolio.handleNavbarScroll();
    portfolio.enhanceSpinner();
    portfolio.initPageLoad();
    
    // Add CSS animations stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/css-animations.css';
    document.head.appendChild(link);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize cursor on desktop
    if (window.innerWidth <= 768) {
        const cursor = document.querySelector('.css-cursor');
        if (cursor) {
            cursor.remove();
        }
    }
});