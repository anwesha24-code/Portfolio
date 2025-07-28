// Initialize EmailJS
(function() {
    emailjs.init("user_YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    updateThemeIcon() {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScroll();
        this.handleActiveLink();
        
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('scroll', () => this.handleActiveLink());
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = this.getNavbarBackground(0.95);
        } else {
            this.navbar.style.background = this.getNavbarBackground(0.95);
        }
    }
    
    getNavbarBackground(opacity) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark 
            ? `rgba(26, 32, 44, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity})`;
    }
    
    handleMobileMenu() {
        if (this.mobileMenuToggle && this.navMenu) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.mobileMenuToggle.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.mobileMenuToggle.classList.remove('active');
                });
            });
        }
    }
    
    handleSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }
    
    init() {
        if (this.element) {
            this.type();
        }
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.animateElements();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);
    }
    
    animateElements() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .certification-card, .stat-item');
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
            this.observer.observe(element);
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.formMessage = document.getElementById('form-message');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
    }
    
    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = `${this.capitalizeFirst(fieldName)} is required.`;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }
        
        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }
        
        this.showError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (message) {
            field.style.borderColor = '#e53e3e';
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    }
    
    clearError(field) {
        this.showError(field, '');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showFormMessage('Please correct the errors above.', 'error');
            return;
        }
        
        this.setLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'anweshapal2006@gmail.com'
            };
            
            // Replace with your EmailJS service ID and template ID
            const result = await emailjs.send(
                'service_YOUR_SERVICE_ID', // Replace with your service ID
                'template_YOUR_TEMPLATE_ID', // Replace with your template ID
                templateParams
            );
            
            this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Email send error:', error);
            this.showFormMessage('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    setLoading(isLoading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showFormMessage(message, type) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        this.formMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Particle Background
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
        }
    }
    
    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
    
    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        if (this.isReducedMotion) {
            this.disableAnimations();
        }
        
        // Monitor performance and adjust accordingly
        this.monitorPerformance();
    }
    
    disableAnimations() {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is too low, reduce animations
                if (fps < 30) {
                    this.reducedPerformanceMode();
                }
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }
    
    reducedPerformanceMode() {
        // Disable particle background
        const particleBackground = document.querySelector('.hero-particles canvas');
        if (particleBackground) {
            particleBackground.style.display = 'none';
        }
        
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
}

// Error Handler
class ErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
    }
    
    handleError(error) {
        console.error('Application Error:', error);
        
        // Show user-friendly error message for critical errors
        if (error.filename && error.filename.includes('main.js')) {
            this.showErrorMessage('Something went wrong. Please refresh the page.');
        }
    }
    
    handlePromiseRejection(event) {
        console.error('Promise Rejection:', event.reason);
        
        // Handle specific promise rejections
        if (event.reason && event.reason.toString().includes('EmailJS')) {
            this.showErrorMessage('Email service is temporarily unavailable. Please try again later.');
        }
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #fed7d7;
                color: #742a2a;
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #fc8181;
                z-index: 9999;
                max-width: 300px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            ">
                ${message}
                <button onclick="this.parentNode.parentNode.remove()" style="
                    background: none;
                    border: none;
                    color: #742a2a;
                    float: right;
                    margin-left: 10px;
                    cursor: pointer;
                    font-size: 18px;
                ">&times;</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Analytics Helper
class Analytics {
    constructor() {
        this.events = [];
        this.init();
    }
    
    init() {
        this.trackPageLoad();
        this.trackUserInteractions();
    }
    
    trackPageLoad() {
        this.trackEvent('page_load', {
            url: window.location.href,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        });
    }
    
    trackUserInteractions() {
        // Track contact form submissions
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackEvent('contact_form_submit', {
                    timestamp: Date.now()
                });
            });
        }
        
        // Track resume downloads
        const resumeLinks = document.querySelectorAll('a[href*="resume"]');
        resumeLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('resume_download', {
                    timestamp: Date.now()
                });
            });
        });
        
        // Track social media clicks
        const socialLinks = document.querySelectorAll('.hero-social a, .social-icons a');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('social_link_click', {
                    platform: this.extractPlatform(link.href),
                    timestamp: Date.now()
                });
            });
        });
    }
    
    trackEvent(eventName, data) {
        this.events.push({
            event: eventName,
            data: data
        });
        
        // In a real application, you would send this to your analytics service
        console.log('Analytics Event:', eventName, data);
    }
    
    extractPlatform(url) {
        if (url.includes('github')) return 'github';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('mailto')) return 'email';
        if (url.includes('tel')) return 'phone';
        return 'unknown';
    }
}

// Application Initializer
class App {
    constructor() {
        this.components = {};
        this.init();
    }
    
    async init() {
        try {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Initialize components
            this.components.themeManager = new ThemeManager();
            this.components.navigationManager = new NavigationManager();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.contactFormHandler = new ContactFormHandler();
            this.components.errorHandler = new ErrorHandler();
            this.components.analytics = new Analytics();
            this.components.performanceMonitor = new PerformanceMonitor();
            
            // Initialize typing animation
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
                this.components.typingAnimation = new TypingAnimation(
                    typingElement,
                    [
                        'Software Engineer',
                        'Frontend Developer',
                        'React Developer',
                        'Mobile App Developer',
                        'Problem Solver'
                    ]
                );
            }
            
            // Initialize particle background (only if not reduced motion)
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.components.particleBackground = new ParticleBackground();
            }
            
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.components.errorHandler = new ErrorHandler();
            this.components.errorHandler.handleError(error);
        }
    }
    
    destroy() {
        // Clean up components
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
    }
}

// Initialize application when script loads
const app = new App();

// Export for potential external use
window.PortfolioApp = app;
