/**
 * Advanced Animations using GSAP
 * Handles scroll-triggered animations, text reveals, and interactive effects
 */

class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        this.initLoadingAnimation();
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initSkillsAnimations();
        this.initProjectsAnimations();
        this.initTextAnimations();
    }

    initLoadingAnimation() {
        // Enhanced loading animation
        const tl = gsap.timeline();
        
        tl.to('#spinner', {
            duration: 0.5,
            opacity: 0,
            scale: 0.8,
            ease: "power2.inOut",
            delay: 1
        })
        .set('#spinner', { display: 'none' })
        .from('.hero-content', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: "power3.out"
        }, '-=0.3')
        .from('.hero-image', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            rotation: 10,
            ease: "elastic.out(1, 0.8)"
        }, '-=0.8');
    }

    initHeroAnimations() {
        // Animated text reveal for hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            const chars = heroTitle.textContent.split('');
            heroTitle.innerHTML = chars.map(char => 
                char === ' ' ? ' ' : `<span class="char">${char}</span>`
            ).join('');

            gsap.from('.char', {
                duration: 0.8,
                opacity: 0,
                y: 50,
                rotateX: 90,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: heroTitle,
                    start: "top 80%"
                }
            });
        }

        // Floating animation for hero elements
        gsap.to('.hero-image', {
            y: 20,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // Parallax effect for hero background
        gsap.to('.hero-bg', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    initScrollAnimations() {
        // Fade in animations for sections
        gsap.utils.toArray('.animate-on-scroll').forEach(element => {
            gsap.from(element, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Slide in animations
        gsap.utils.toArray('.slide-in-left').forEach(element => {
            gsap.from(element, {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%"
                }
            });
        });

        gsap.utils.toArray('.slide-in-right').forEach(element => {
            gsap.from(element, {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%"
                }
            });
        });
    }

    initSkillsAnimations() {
        // Animated progress bars
        gsap.utils.toArray('.progress-bar').forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            
            gsap.from(bar, {
                width: '0%',
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%"
                }
            });

            // Add glowing effect
            gsap.to(bar, {
                boxShadow: '0 0 20px rgba(98, 68, 197, 0.6)',
                duration: 0.3,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%"
                }
            });
        });

        // Skill percentage counter animation
        gsap.utils.toArray('.skill-percentage').forEach(element => {
            const endValue = parseInt(element.textContent);
            const obj = { value: 0 };
            
            gsap.to(obj, {
                value: endValue,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    element.textContent = Math.round(obj.value) + '%';
                },
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                }
            });
        });
    }

    initProjectsAnimations() {
        // 3D card hover effects
        gsap.utils.toArray('.portfolio-item').forEach(card => {
            const image = card.querySelector('img');
            const overlay = card.querySelector('.portfolio-btn');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(overlay, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(overlay, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Staggered project cards animation
        gsap.from('.portfolio-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.portfolio-container',
                start: "top 80%"
            }
        });
    }

    initTextAnimations() {
        // Typewriter effect for specific elements
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            gsap.to(element, {
                duration: text.length * 0.05,
                ease: "none",
                onUpdate: function() {
                    const progress = this.progress();
                    const currentLength = Math.round(progress * text.length);
                    element.textContent = text.substring(0, currentLength);
                },
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%"
                }
            });
        });

        // Text splitting and animation
        gsap.utils.toArray('.split-text').forEach(element => {
            const words = element.textContent.split(' ');
            element.innerHTML = words.map(word => 
                `<span class="word">${word}</span>`
            ).join(' ');

            gsap.from('.word', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                }
            });
        });
    }

    // Method to create magnetic button effects
    createMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.2;
            const deltaY = (e.clientY - centerY) * 0.2;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new AdvancedAnimations();
    
    // Apply magnetic effect to buttons
    document.querySelectorAll('.btn, .magnetic').forEach(btn => {
        animations.createMagneticEffect(btn);
    });
});