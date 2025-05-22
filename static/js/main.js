/**
 * Main JavaScript file for PluginCrafter website
 * Handles navigation, scrolling, testimonial slider, accordion, and other UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Scroll to the target element with offset for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav item based on scroll position
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        // Get all sections that have an ID
        const sections = document.querySelectorAll('section[id]');
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset to trigger slightly before reaching the section
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Find the corresponding nav link and add active class
                const correspondingLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Add scroll event listener for nav highlighting
    window.addEventListener('scroll', highlightNavOnScroll);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show testimonial by index
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Show the current testimonial
            testimonials[index].style.display = 'block';
            
            // Animate the testimonial
            testimonials[index].style.opacity = '0';
            setTimeout(() => {
                testimonials[index].style.opacity = '1';
            }, 50);
        }
        
        // Event listeners for navigation buttons
        if (prevTestimonialBtn && nextTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', function() {
                currentTestimonial--;
                if (currentTestimonial < 0) {
                    currentTestimonial = testimonials.length - 1;
                }
                showTestimonial(currentTestimonial);
            });
            
            nextTestimonialBtn.addEventListener('click', function() {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            });
            
            // Auto-rotate testimonials every 5 seconds
            const testimonialInterval = setInterval(() => {
                currentTestimonial++;
                if (currentTestimonial >= testimonials.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            }, 10000);
            
            // Stop auto-rotation when user interacts with the slider
            [prevTestimonialBtn, nextTestimonialBtn].forEach(btn => {
                btn.addEventListener('click', () => {
                    clearInterval(testimonialInterval);
                });
            });
        }
    }

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const icon = header.querySelector('i');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Toggle icon
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
            
            // Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    
                    const otherIcon = otherItem.querySelector('.accordion-header i');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });
        });
    });

    // Close flash messages
    const closeFlashBtns = document.querySelectorAll('.close-flash');
    
    closeFlashBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const flashMessage = this.parentElement;
            
            // Add fade-out animation
            flashMessage.style.opacity = '0';
            flashMessage.style.transform = 'translateX(100%)';
            
            // Remove the element after animation completes
            setTimeout(() => {
                flashMessage.remove();
            }, 300);
        });
    });

    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            if (message) {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    if (message.parentNode) {
                        message.remove();
                    }
                }, 300);
            }
        }, 5000);
    });

    // Handle auto play for demo video
    const demoVideo = document.getElementById('demo-video');
    
    if (demoVideo) {
        // This ensures the video plays when it's in viewport
        function handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add autoplay parameters to source
                    const src = demoVideo.getAttribute('src');
                    if (src && !src.includes('autoplay=1')) {
                        demoVideo.setAttribute('src', `${src}&autoplay=1&mute=1`);
                    }
                }
            });
        }
        
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5
        });
        
        observer.observe(demoVideo);
    }
});
