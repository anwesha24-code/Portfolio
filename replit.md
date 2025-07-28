# Anwesha Pal - Portfolio Website

## Overview

This is a personal portfolio website for Anwesha Pal, a third-year Computer Science student at VIT Chennai. The website showcases skills, projects, experience, and provides contact functionality. It's built as a modern, responsive single-page application with a clean, professional design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML5, CSS3, and JavaScript
- **Component-based JavaScript**: Uses ES6 classes for modular functionality (ThemeManager, NavigationManager)
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced features added via JS

### Styling Strategy
- **CSS Custom Properties**: Comprehensive theming system supporting light/dark modes
- **Modern CSS**: Utilizes CSS Grid, Flexbox, and custom properties for maintainable styling
- **External Dependencies**: Google Fonts (Poppins, Fira Code) and Font Awesome icons

## Key Components

### Theme Management System
- **Problem**: Provide user preference for light/dark mode with persistence
- **Solution**: ThemeManager class with localStorage persistence
- **Features**: Automatic theme detection, smooth transitions, icon updates

### Navigation System
- **Problem**: Responsive navigation across devices
- **Solution**: NavigationManager class handling mobile menu toggle and smooth scrolling
- **Features**: Sticky navigation, mobile hamburger menu, section highlighting

### Contact Integration
- **Problem**: Enable visitors to send messages without backend infrastructure
- **Solution**: EmailJS integration for client-side email functionality
- **Benefits**: No server required, secure email delivery, form validation

## Data Flow

### Theme Persistence
1. User toggles theme → ThemeManager updates DOM attributes
2. Theme preference saved to localStorage
3. On page reload, saved theme applied automatically

### Navigation Flow
1. User clicks navigation link → Smooth scroll to section
2. Mobile menu toggle → Show/hide navigation menu
3. Scroll events → Update active navigation states

### Contact Form
1. User submits form → EmailJS processes request
2. Form validation → Client-side validation before submission
3. Success/error handling → User feedback via UI updates

## External Dependencies

### CDN Resources
- **Google Fonts**: Typography (Poppins, Fira Code)
- **Font Awesome**: Icons and visual elements
- **EmailJS**: Contact form email delivery service

### Third-party Services
- **EmailJS**: Handles contact form submissions without requiring a backend server
- **Google Fonts**: Provides consistent typography across browsers

## Deployment Strategy

### Static Hosting Ready
- **Architecture**: Pure frontend application, no backend dependencies
- **Hosting Options**: Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- **Performance**: Optimized for fast loading with external CDN resources
- **SEO**: Semantic HTML structure with proper meta tags for search engine optimization

### Configuration Requirements
- **EmailJS Setup**: Requires EmailJS account and service configuration
- **API Keys**: EmailJS user ID needs to be configured in main.js
- **Domain Setup**: No special server configuration required

### Scalability Considerations
- **Static Nature**: Highly scalable due to static file serving
- **CDN Friendly**: All assets can be cached effectively
- **Mobile Performance**: Responsive design ensures good performance across devices

## Development Notes

### Code Organization
- **Separation of Concerns**: HTML structure, CSS styling, and JavaScript functionality clearly separated
- **Modular JavaScript**: Class-based architecture for maintainable code
- **CSS Architecture**: Custom properties system allows easy theme customization

### Browser Compatibility
- **Modern Standards**: Uses ES6+ features, requires modern browser support
- **Graceful Degradation**: Core content accessible even without JavaScript
- **Cross-browser**: CSS uses well-supported modern features