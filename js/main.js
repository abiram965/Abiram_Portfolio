(function ($) {
    "use strict";

    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Enhanced Spinner with 3D effects
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                if (typeof gsap !== 'undefined') {
                    gsap.to('#spinner', {
                        duration: 0.8,
                        opacity: 0,
                        scale: 0.8,
                        ease: "power2.inOut",
                        onComplete: function() {
                            $('#spinner').removeClass('show').hide();
                        }
                    });
                } else {
                    $('#spinner').removeClass('show');
                }
            }
        }, 1500); // Increased delay for better effect
    };
    spinner();
    
    
    // Initiate the wowjs with custom settings
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: false,
            live: true
        }).init();
    }

    // Enhanced navbar with glass effect
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Enhanced smooth scrolling with GSAP
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            const target = this.hash;
            const targetOffset = $(target).offset().top - 45;
            
            if (typeof gsap !== 'undefined') {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: targetOffset,
                    ease: "power3.inOut"
                });
            } else {
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 1500, 'easeInOutExpo');
            }
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Enhanced back to top with 3D effects
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: 0,
                ease: "power3.inOut"
            });
        } else {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        }
        return false;
    });
    
    // Enhanced Typed.js with custom cursor
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 60,
            backSpeed: 30,
            smartBackspace: false,
            loop: true,
            cursorChar: '|',
            fadeOut: true,
            onComplete: function(self) {
                // Add glowing effect to cursor
                $('.typed-cursor').addClass('glow-cursor');
            }
        });
    }

    // Modal Video with enhanced effects
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Enhanced Facts counter with GSAP
    $('[data-toggle="counter-up"]').each(function() {
        const $this = $(this);
        const finalValue = parseInt($this.text());
        
        if (typeof gsap !== 'undefined') {
            ScrollTrigger.create({
                trigger: this,
                start: "top 80%",
                onEnter: function() {
                    const obj = { value: 0 };
                    gsap.to(obj, {
                        value: finalValue,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: function() {
                            $this.text(Math.round(obj.value));
                        }
                    });
                }
            });
        } else {
            // Fallback to original counter
            $this.counterUp({
                delay: 10,
                time: 2000
            });
        }
    });

    // Enhanced Skills animation
    $('.skill').each(function() {
        const $skill = $(this);
        const $progressBar = $skill.find('.progress-bar');
        const percentage = $progressBar.attr('aria-valuenow');
        
        if (typeof gsap !== 'undefined') {
            ScrollTrigger.create({
                trigger: $skill[0],
                start: "top 85%",
                onEnter: function() {
                    gsap.from($progressBar, {
                        width: '0%',
                        duration: 1.5,
                        ease: "power2.out"
                    });
                    
                    // Animate percentage number
                    const $percentage = $skill.find('.skill-percentage');
                    if ($percentage.length) {
                        const obj = { value: 0 };
                        gsap.to(obj, {
                            value: parseInt(percentage),
                            duration: 1.5,
                            ease: "power2.out",
                            onUpdate: function() {
                                $percentage.text(Math.round(obj.value) + '%');
                            }
                        });
                    }
                }
            });
        } else {
            // Fallback to waypoints
            $skill.waypoint(function () {
                $progressBar.css("width", percentage + '%');
            }, {offset: '80%'});
        }
    });

    // Enhanced Portfolio isotope with 3D effects
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.6s'
    });
    
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
        
        // Add stagger animation to filtered items
        if (typeof gsap !== 'undefined') {
            gsap.from('.portfolio-item', {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });

    // Enhanced Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn'
    });

    // Intersection Observer for scroll animations (fallback)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Enhanced form interactions
    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });

    // Add magnetic effect to buttons (if GSAP is not available)
    if (typeof gsap === 'undefined') {
        $('.magnetic').on('mouseenter', function() {
            $(this).addClass('hover-effect');
        }).on('mouseleave', function() {
            $(this).removeClass('hover-effect');
        });
    }

    // Page load animation
    $(window).on('load', function() {
        // Hide any remaining loading elements
        $('.loading, .preloader').fadeOut();
        
        // Trigger animations for visible elements
        $('.animate-on-scroll').each(function() {
            const rect = this.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                $(this).addClass('animated');
            }
        });
    });
    
})(jQuery);

