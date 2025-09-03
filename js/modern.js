// Modern Portfolio JavaScript Module
class ModernPortfolio {
    constructor() {
        this.isLoaded = false;
        this.threeScene = null;
        this.animations = null;
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        this.setupLoadingScreen();
        this.initializeComponents();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.createParticleBackground();
        this.enhanceNavigation();
        this.enhanceSkillsSection();
        this.enhanceProjectSection();
        this.enhanceContactSection();
    }
    
    setupLoadingScreen() {
        // Create loading overlay if it doesn't exist
        if (!document.querySelector('.loading-overlay')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="loader"></div>';
            document.body.appendChild(loadingOverlay);
        }
        
        // Hide loading screen after everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.querySelector('.loading-overlay');
                if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }
                this.isLoaded = true;
            }, 1000);
        });
    }
    
    initializeComponents() {
        // Initialize Three.js scene
        this.initThreeScene();
        
        // Initialize animations after a short delay
        setTimeout(() => {
            this.initAnimations();
        }, 500);
    }
    
    initThreeScene() {
        try {
            // Create container for Three.js canvas
            if (!document.getElementById('three-container')) {
                const container = document.createElement('div');
                container.id = 'three-container';
                document.body.appendChild(container);
            }
            
            // Initialize Three.js scene (assuming ThreeScene class is available)
            if (typeof ThreeScene !== 'undefined') {
                this.threeScene = new ThreeScene();
            }
        } catch (error) {
            console.warn('Three.js scene initialization failed:', error);
        }
    }
    
    initAnimations() {
        try {
            // Initialize GSAP animations (assuming PortfolioAnimations class is available)
            if (typeof PortfolioAnimations !== 'undefined') {
                this.animations = new PortfolioAnimations();
            }
        } catch (error) {
            console.warn('Animation initialization failed:', error);
        }
    }
    
    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Smooth scroll for navigation links
        this.setupSmoothScroll();
        
        // Enhanced form validation
        this.setupFormValidation();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Theme toggle (if needed)
        this.setupThemeToggle();
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        // Add scrolled class to navbar
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        this.updateActiveNavigation();
        
        // Parallax effects
        this.updateParallaxEffects(scrollY);
    }
    
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    updateParallaxEffects(scrollY) {
        // Hero parallax
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const parallaxSpeed = scrollY * 0.3;
            heroImage.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        // Background elements parallax
        const bgElements = document.querySelectorAll('.floating');
        bgElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
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
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('skill-progress-bar')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress-bar, .counter').forEach(el => {
            observer.observe(el);
        });
    }
    
    createParticleBackground() {
        // Create CSS particle background as fallback
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particleContainer.appendChild(particle);
        }
    }
    
    enhanceNavigation() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('glass-nav');
        }
        
        // Add hover effects to navigation links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }
    
    enhanceSkillsSection() {
        // Convert progress bars to modern style
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const parent = bar.closest('.skill');
            if (parent) {
                parent.classList.add('skill-card', 'fade-in');
                bar.classList.add('skill-progress-bar');
                bar.dataset.width = bar.getAttribute('aria-valuenow');
            }
        });
        
        // Create circular progress indicators
        this.createCircularProgress();
    }
    
    createCircularProgress() {
        const skills = [
            { name: 'Python', percentage: 90, color: '#3776ab' },
            { name: 'Machine Learning', percentage: 85, color: '#ff6b35' },
            { name: 'Web Design', percentage: 95, color: '#61dafb' },
            { name: 'MySQL', percentage: 85, color: '#f29111' }
        ];
        
        const skillsContainer = document.querySelector('#skill .row');
        if (skillsContainer) {
            const circularContainer = document.createElement('div');
            circularContainer.className = 'col-12 text-center mt-5';
            circularContainer.innerHTML = '<h3 class="mb-4">Technical Proficiency</h3>';
            
            const circularGrid = document.createElement('div');
            circularGrid.className = 'row justify-content-center';
            
            skills.forEach(skill => {
                const skillCol = document.createElement('div');
                skillCol.className = 'col-md-3 col-sm-6 mb-4';
                skillCol.innerHTML = `
                    <div class="progress-circle fade-in" data-percentage="${skill.percentage}">
                        <svg viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="gradient-${skill.name}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:${skill.color};stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:${skill.color};stop-opacity:0.6" />
                                </linearGradient>
                            </defs>
                            <circle class="progress-bg" cx="50" cy="50" r="45"></circle>
                            <circle class="progress-bar" cx="50" cy="50" r="45" stroke="url(#gradient-${skill.name})"></circle>
                        </svg>
                        <div class="progress-text">0%</div>
                    </div>
                    <h6 class="mt-3">${skill.name}</h6>
                `;
                circularGrid.appendChild(skillCol);
            });
            
            circularContainer.appendChild(circularGrid);
            skillsContainer.appendChild(circularContainer);
        }
    }
    
    enhanceProjectSection() {
        // Add modern classes to project cards
        const projectItems = document.querySelectorAll('.portfolio-item');
        projectItems.forEach(item => {
            item.classList.add('project-card', 'fade-in');
            
            const img = item.querySelector('img');
            if (img) {
                img.classList.add('project-image');
            }
            
            // Add project overlay
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            overlay.innerHTML = `
                <a href="#" class="btn btn-modern">View Project</a>
                <a href="#" class="btn btn-outline-modern">Live Demo</a>
            `;
            item.appendChild(overlay);
        });
        
        // Add 3D tilt effect
        this.add3DTiltEffect('.project-card');
    }
    
    add3DTiltEffect(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const rotateX = (y / rect.height) * 10;
                const rotateY = -(x / rect.width) * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    enhanceContactSection() {
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.classList.add('contact-form');
            
            // Add floating labels
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.add('form-control');
                
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }
    
    setupFormValidation() {
        const form = document.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const required = ['name', 'email', 'subject', 'message'];
        const errors = [];
        
        required.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors.push(`${field} is required`);
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Invalid email format');
        }
        
        if (errors.length > 0) {
            this.showNotification('Please fix the following errors: ' + errors.join(', '), 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Message sent successfully!', 'success');
        form.reset();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--secondary)' : type === 'error' ? '#ef4444' : 'var(--primary)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Press 'H' to go to home
            if (e.key === 'h' || e.key === 'H') {
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Press 'P' to go to projects
            if (e.key === 'p' || e.key === 'P') {
                document.querySelector('#project')?.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Press 'C' to go to contact
            if (e.key === 'c' || e.key === 'C') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    setupThemeToggle() {
        // Theme toggle functionality (if needed)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            cursor: pointer;
            font-size: 1.2rem;
        `;
        
        // document.body.appendChild(themeToggle);
    }
    
    animateSkillBar(progressBar) {
        const width = progressBar.dataset.width || progressBar.getAttribute('aria-valuenow');
        progressBar.style.width = width + '%';
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.dataset.target || counter.textContent);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    destroy() {
        // Cleanup method
        if (this.threeScene && this.threeScene.destroy) {
            this.threeScene.destroy();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        
        // Remove particles
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.remove();
        }
    }
}

// Initialize when DOM is loaded
let modernPortfolio;

document.addEventListener('DOMContentLoaded', () => {
    modernPortfolio = new ModernPortfolio();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (modernPortfolio) {
        modernPortfolio.destroy();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
}