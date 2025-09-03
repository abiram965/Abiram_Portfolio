// GSAP Animations for Modern Portfolio
class PortfolioAnimations {
    constructor() {
        this.initScrollTrigger();
        this.initLoaderAnimation();
        this.initHeroAnimations();
        this.initSectionAnimations();
        this.initSkillAnimations();
        this.initProjectAnimations();
    }
    
    initScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Smooth scrolling with Lenis
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                smoothTouch: false,
                touchMultiplier: 2
            });
            
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            
            // Update ScrollTrigger on scroll
            lenis.on('scroll', () => {
                ScrollTrigger.update();
            });
        }
    }
    
    initLoaderAnimation() {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
    }
    
    initHeroAnimations() {
        const heroTimeline = gsap.timeline({ delay: 1.5 });
        
        // Animate hero content
        heroTimeline
            .from('.hero-title', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .from('.typed-text-output', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.3")
            .from('.hero-buttons .btn', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.2")
            .from('.social-links .social-link', {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.2");
        
        // Parallax effect for hero image
        gsap.to('.hero-image', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    initSectionAnimations() {
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Animate cards with stagger
        gsap.utils.toArray('.fade-in').forEach(element => {
            gsap.from(element, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        gsap.utils.toArray('.slide-in-left').forEach(element => {
            gsap.from(element, {
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        gsap.utils.toArray('.slide-in-right').forEach(element => {
            gsap.from(element, {
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
    
    initSkillAnimations() {
        // Animate skill progress bars
        gsap.utils.toArray('.skill-progress-bar').forEach(bar => {
            const width = bar.dataset.width || bar.getAttribute('aria-valuenow');
            
            gsap.from(bar, {
                width: '0%',
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
            
            gsap.to(bar, {
                width: width + '%',
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Animate circular progress
        this.animateCircularProgress();
    }
    
    animateCircularProgress() {
        gsap.utils.toArray('.progress-circle').forEach(circle => {
            const progressBar = circle.querySelector('.progress-bar');
            const percentage = parseInt(circle.dataset.percentage || 75);
            const circumference = 283; // 2 * PI * 45 (radius)
            const offset = circumference - (percentage / 100) * circumference;
            
            gsap.set(progressBar, {
                strokeDashoffset: circumference
            });
            
            gsap.to(progressBar, {
                strokeDashoffset: offset,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: circle,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
            
            // Animate the percentage text
            const textElement = circle.querySelector('.progress-text');
            if (textElement) {
                gsap.from({value: 0}, {
                    value: percentage,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                        textElement.textContent = Math.round(this.targets()[0].value) + '%';
                    },
                    scrollTrigger: {
                        trigger: circle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
    }
    
    initProjectAnimations() {
        // 3D hover effect for project cards
        gsap.utils.toArray('.project-card').forEach(card => {
            const cardContent = card.querySelector('.project-content');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    rotateX: 10,
                    rotateY: 5,
                    z: 50,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(cardContent, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(cardContent, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Mouse move parallax effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(card, {
                    rotateX: (y / rect.height) * 10,
                    rotateY: -(x / rect.width) * 10,
                    duration: 0.1,
                    ease: "power1.out"
                });
            });
        });
        
        // Stagger animation for project grid
        gsap.from('.project-card', {
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".project-grid",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }
    
    // Utility method for creating magnetic buttons
    createMagneticEffect(selector) {
        gsap.utils.toArray(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.1,
                    ease: "power1.out"
                });
            });
        });
    }
    
    // Text reveal animation
    animateTextReveal(selector) {
        gsap.utils.toArray(selector).forEach(element => {
            const text = element.textContent;
            element.innerHTML = text.split('').map(char => 
                `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
            
            gsap.from(element.children, {
                y: 100,
                opacity: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
}

// Initialize animations when DOM is loaded
let portfolioAnimations;

function initPortfolioAnimations() {
    portfolioAnimations = new PortfolioAnimations();
    
    // Add magnetic effect to buttons
    portfolioAnimations.createMagneticEffect('.btn-modern, .btn-outline-modern');
    
    // Add text reveal to specific elements
    portfolioAnimations.animateTextReveal('.animate-text');
}