// Fallback JavaScript for when external libraries are blocked
class PortfolioFallback {
    constructor() {
        this.initFallbacks();
        this.initScrollAnimations();
        this.initParticleSystem();
        this.initFormHandling();
        this.initNavigation();
    }
    
    initFallbacks() {
        // Check if external libraries loaded
        this.hasGSAP = typeof gsap !== 'undefined';
        this.hasThree = typeof THREE !== 'undefined';
        this.hasLenis = typeof Lenis !== 'undefined';
        
        console.log('Fallback System:', {
            GSAP: this.hasGSAP,
            Three: this.hasThree,
            Lenis: this.hasLenis
        });
        
        // Initialize fallback animations if GSAP is not available
        if (!this.hasGSAP) {
            this.initCSSAnimations();
        }
        
        // Initialize CSS particle system if Three.js is not available
        if (!this.hasThree) {
            this.initCSSParticles();
        }
        
        // Initialize smooth scroll if Lenis is not available
        if (!this.hasLenis) {
            this.initSmoothScroll();
        }
    }
    
    initCSSAnimations() {
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special handling for different element types
                    if (entry.target.classList.contains('skill-progress-bar')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('progress-circle')) {
                        this.animateCircularProgress(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress-bar, .progress-circle').forEach(el => {
            observer.observe(el);
        });
    }
    
    initCSSParticles() {
        // Enhanced CSS particle system
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-fallback';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
                animation-delay: ${Math.random() * 10}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-10vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    initSmoothScroll() {
        // Basic smooth scroll implementation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    this.smoothScrollTo(offsetTop, 1000);
                }
            });
        });
    }
    
    smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;
        
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const ease = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startY + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    initScrollAnimations() {
        // Enhanced scroll animations
        window.addEventListener('scroll', () => {
            this.updateScrollEffects();
        });
    }
    
    updateScrollEffects() {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('.floating, .floating-delayed');
        parallaxElements.forEach((element, index) => {
            const speed = (index % 2 === 0 ? 0.3 : 0.5);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update active navigation
        this.updateActiveNavigation();
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
    
    initParticleSystem() {
        // Mouse interaction particles
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trailing particles
            if (Math.random() < 0.1) {
                this.createMouseParticle(mouseX, mouseY);
            }
        });
    }
    
    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: mouseParticle 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Add animation styles if not already added
        if (!document.getElementById('mouse-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'mouse-particle-styles';
            style.textContent = `
                @keyframes mouseParticle {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) translateY(-50px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    animateSkillBar(progressBar) {
        const width = progressBar.dataset.width || progressBar.getAttribute('aria-valuenow');
        
        let currentWidth = 0;
        const targetWidth = parseInt(width);
        const duration = 2000;
        const increment = targetWidth / (duration / 16);
        
        const animate = () => {
            currentWidth += increment;
            progressBar.style.width = Math.min(currentWidth, targetWidth) + '%';
            
            if (currentWidth < targetWidth) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    animateCircularProgress(circle) {
        const percentage = parseInt(circle.dataset.percentage || 75);
        const circumference = 283; // 2 * PI * 45
        const progressBar = circle.querySelector('.progress-bar');
        const textElement = circle.querySelector('.progress-text');
        
        if (!progressBar || !textElement) return;
        
        const targetOffset = circumference - (percentage / 100) * circumference;
        let currentOffset = circumference;
        let currentPercentage = 0;
        
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);
            
            currentOffset = circumference - (circumference - targetOffset) * eased;
            currentPercentage = percentage * eased;
            
            progressBar.style.strokeDashoffset = currentOffset;
            textElement.textContent = Math.round(currentPercentage) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        // Set initial values
        progressBar.style.strokeDasharray = circumference;
        progressBar.style.strokeDashoffset = circumference;
        
        requestAnimationFrame(animate);
    }
    
    initFormHandling() {
        const form = document.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
            
            // Add form validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        this.validateField(input);
                    }
                });
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        // Update field styling
        field.classList.remove('is-valid', 'is-invalid');
        if (value) {
            field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
        
        return isValid;
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the form errors', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            
            // Remove validation classes
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }, 2000);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    initNavigation() {
        // Enhanced navigation interactions
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
        
        // Mobile menu handling
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                }
            });
        }
    }
}

// Initialize fallback system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Initialize fallback system
    const portfolioFallback = new PortfolioFallback();
    
    // Add some enhanced interactions
    document.querySelectorAll('.btn-modern, .btn-outline-modern').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add 3D tilt effect to cards
    document.querySelectorAll('.glass-card, .service-card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 5;
            const rotateY = -(x / rect.width) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});