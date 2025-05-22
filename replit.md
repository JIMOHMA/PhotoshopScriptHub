# PluginCrafter - Photoshop Plugin Developer Website

## Overview
This project is a Flask-based website for a Photoshop plugin developer called "PluginCrafter". The website showcases custom Photoshop plugins and automation services, featuring pages for showcasing services, a shop to purchase plugins, tutorials, and a booking system for consultations. The site is designed to help digital artists, creators, print shops, and eCommerce sellers optimize their Photoshop workflows.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application follows a simple monolithic architecture built with Flask. It currently uses in-memory data structures for storing form submissions and product information, but is set up to potentially integrate with a SQL database in the future (SQLAlchemy is included in dependencies).

### Key architectural decisions:

1. **Frontend-Backend Integration**: The application uses Flask's templating system to render HTML pages, with static assets for styling and JavaScript for interactivity.

2. **Data Storage**: Currently using in-memory Python lists (`contact_submissions` and `bookings`) for storing user data. The application is set up to potentially use SQLAlchemy with PostgreSQL in the future (dependencies are included).

3. **UI/UX**: Clean, modern UI with responsive design, following a blue/white color scheme with accent colors.

## Key Components

### Backend Components
1. **Flask Application (app.py)**: Main application entry point that handles routes, form submissions, and page rendering.
2. **Main Module (main.py)**: Simple wrapper that runs the Flask application.

### Frontend Components
1. **Templates**: HTML templates for different pages:
   - `index.html`: Homepage with hero section, services, portfolio
   - `shop.html`: Shop page for browsing and purchasing plugins
   - `tutorials.html`: Page for tutorial content
   - `booking.html`: Consultation booking page

2. **Static Assets**:
   - CSS: `styles.css` for styling all pages
   - JavaScript modules:
     - `main.js`: Handle navigation, scrolling, and UI interactions
     - `modal.js`: Plugin details modal functionality
     - `form-validation.js`: Client-side form validation
     - `booking.js`: Date/time selection and booking form validation
   - Images and SVG icons for services and UI elements

### Data Models
The application currently uses simple in-memory data structures:
1. `contact_submissions`: List to store contact form submissions
2. `plugins`: Array of plugin objects containing product information

## Data Flow
1. **Page Requests**:
   - User requests a page → Flask routes to the appropriate handler → Template is rendered with necessary data

2. **Form Submissions**:
   - Contact form: User submits → Data validated → Stored in `contact_submissions` list
   - Booking form: User submits → Data validated → Stored in `bookings` list

3. **Shop Interaction**:
   - Plugin details: User clicks "View Details" → JavaScript fetches plugin data → Populates and displays the modal

## External Dependencies
1. **Frontend Libraries**:
   - Font Awesome (CDN): For icons
   - Google Fonts (CDN): For Roboto font family

2. **Backend Dependencies** (from pyproject.toml):
   - Flask: Web framework
   - Flask-SQLAlchemy: ORM for database interactions
   - email-validator: For validating email addresses
   - gunicorn: WSGI HTTP server for production deployment
   - psycopg2-binary: PostgreSQL adapter

## Deployment Strategy
The application is configured for deployment on Replit with:

1. **Server Configuration**:
   - Gunicorn as the WSGI server, binding to 0.0.0.0:5000
   - Automatic reloading for development

2. **Dependencies**:
   - Python 3.11 as the primary runtime
   - OpenSSL and PostgreSQL packages available through Nix

3. **Environment Setup**:
   - Secret key for session management (configurable via environment variables)
   - PostgreSQL support included in dependencies (not yet implemented in the code)

4. **Scaling Configuration**:
   - Set up for autoscaling deployment in Replit

## Future Enhancements
1. **Database Integration**: Replace in-memory data structures with proper database tables using Flask-SQLAlchemy and PostgreSQL.
2. **Authentication**: Add user authentication for purchasing plugins and accessing premium tutorials.
3. **Payment Processing**: Integrate a payment gateway for the shop functionality.
4. **Advanced Booking System**: Implement a calendar with real-time availability checking for consultation bookings.
5. **Content Management**: Add an admin interface for managing plugins, tutorials, and other content.