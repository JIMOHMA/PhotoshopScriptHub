import os
import logging
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

# Mock database for storing contact form submissions and bookings
contact_submissions = []
bookings = []

# Sample plugin data
plugins = [
    {
        "id": 1,
        "name": "BatchMaster Pro",
        "description": "Automate batch processing of images with advanced options",
        "image": "https://pixabay.com/get/gf571073485536450c7dcdc09bd805a6357f1bdea128308eb3c75d93c26dee46e4e6b6ad90b1e177968cbe23e18c9a226f965dc6b1cc69d1c77858a7104921f0a_1280.jpg",
        "price": "$49.99",
        "features": ["Batch processing", "Smart object manipulation", "Export presets", "Action recording"],
        "suitable_for": ["Digital artists", "Print shops", "eCommerce sellers"]
    },
    {
        "id": 2,
        "name": "MockupWizard",
        "description": "Instantly apply your designs to hundreds of mockup templates",
        "image": "https://pixabay.com/get/g12d56ef0709b8e9d315b8bad94489cdcd20f68a0d05caa0d189b8dbb42f317dc1af11308f36b1aad39f6bb78691f71a363bef2526cadf7f41a23d8379c28e0ea_1280.jpg",
        "price": "$39.99",
        "features": ["200+ mockup templates", "Smart object targeting", "Batch processing", "Custom export options"],
        "suitable_for": ["Etsy sellers", "Product designers", "Print-on-demand businesses"]
    },
    {
        "id": 3,
        "name": "LayerGenius",
        "description": "Organize and manage complex layer structures with ease",
        "image": "https://pixabay.com/get/gbb3d844f477429e28e2c983a390460139ff7bcad5c062552d2321ea5b41c52938f3e3c1b9a870d41fda81dd6bc4490af3d2eebe9492bd6407dd07169cfff280d_1280.jpg",
        "price": "$29.99",
        "features": ["Smart layer grouping", "Layer search", "Layer effects management", "Layer export"],
        "suitable_for": ["Digital artists", "UI/UX designers", "Photo editors"]
    },
    {
        "id": 4,
        "name": "ColorMatch",
        "description": "Advanced color matching and palette generation tool",
        "image": "https://pixabay.com/get/gdcdbb36868748ba62f9de9765a0eb7a5e64a4ad14e43fd83f0cec618efab1bd972816914ebd03e858c0ff743247e94ae960f52244a25c9cec29a66f94759dc8e_1280.jpg",
        "price": "$24.99",
        "features": ["Color extraction", "Palette generation", "Color harmonies", "Brand color management"],
        "suitable_for": ["Brand designers", "Digital artists", "Print shops"]
    }
]

# Sample tutorials data
tutorials = [
    {
        "id": 1,
        "title": "Building Your First Photoshop Plugin",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Learn how to set up your development environment and create a simple Photoshop plugin"
    },
    {
        "id": 2,
        "title": "Advanced UXP Techniques for Photoshop",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Dive deep into UXP architecture and advanced plugin development"
    },
    {
        "id": 3,
        "title": "Creating Custom UI Panels in Photoshop",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Learn how to design and implement custom UI panels for your Photoshop plugins"
    },
    {
        "id": 4,
        "title": "Automating Image Processing with Scripts",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Create powerful scripts to automate repetitive image processing tasks"
    },
    {
        "id": 5,
        "title": "Extending Photoshop with JavaScript",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Master JavaScript techniques for extending Photoshop functionality"
    },
    {
        "id": 6,
        "title": "Building Plugins for Photoshop Batch Processing",
        "youtube_id": "dQw4w9WgXcQ",  # This is a placeholder YouTube ID
        "description": "Learn how to create plugins that can process multiple files at once"
    }
]

# Routes
@app.route('/')
def index():
    return render_template('index.html', plugins=plugins[:4], tutorials=tutorials)

@app.route('/shop')
def shop():
    return render_template('shop.html', plugins=plugins)

@app.route('/tutorials')
def tutorial_page():
    return render_template('tutorials.html', tutorials=tutorials)

@app.route('/booking')
def booking_page():
    return render_template('booking.html')

@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        contact_data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'message': request.form.get('message'),
            'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        contact_submissions.append(contact_data)
        flash('Thank you for your message! I\'ll get back to you within 24 hours.', 'success')
        return redirect(url_for('index', _anchor='contact'))
    except Exception as e:
        app.logger.error(f"Error submitting contact form: {str(e)}")
        flash('There was an error submitting your message. Please try again.', 'error')
        return redirect(url_for('index', _anchor='contact'))

@app.route('/book-appointment', methods=['POST'])
def book_appointment():
    try:
        booking_data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'date': request.form.get('date'),
            'time': request.form.get('time'),
            'project_type': request.form.get('project_type'),
            'details': request.form.get('details'),
            'booked_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        bookings.append(booking_data)
        flash('Your appointment has been scheduled! I\'ll send you a confirmation email shortly.', 'success')
        return redirect(url_for('booking_page'))
    except Exception as e:
        app.logger.error(f"Error booking appointment: {str(e)}")
        flash('There was an error scheduling your appointment. Please try again.', 'error')
        return redirect(url_for('booking_page'))

@app.route('/get-plugin/<int:plugin_id>', methods=['GET'])
def get_plugin(plugin_id):
    plugin = next((p for p in plugins if p['id'] == plugin_id), None)
    if plugin:
        return jsonify(plugin)
    return jsonify({'error': 'Plugin not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
