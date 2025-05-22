/**
 * Form Validation
 * Handles validation for contact and other forms
 */

document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!validateContactForm(this)) {
                event.preventDefault();
            }
        });
        
        // Add input listeners for real-time validation
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateField(this, 'Please enter your name', value => value.trim().length > 0);
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateField(this, 'Please enter a valid email address', validateEmail);
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                validateField(this, 'Please enter your message', value => value.trim().length > 10);
            });
        }
    }
    
    // Subscribe form validation
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput || !validateEmail(emailInput.value)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return false;
            }
            
            // If valid, show success message instead of submitting
            removeFormError(emailInput);
            
            // Since this is a demo, just show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'flash-message success';
            successMessage.textContent = 'Thank you for subscribing!';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-flash';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                successMessage.remove();
            });
            
            successMessage.appendChild(closeBtn);
            
            const flashContainer = document.querySelector('.flash-messages');
            
            if (flashContainer) {
                flashContainer.appendChild(successMessage);
            } else {
                const newFlashContainer = document.createElement('div');
                newFlashContainer.className = 'flash-messages';
                newFlashContainer.appendChild(successMessage);
                document.body.appendChild(newFlashContainer);
            }
            
            // Clear the email input
            emailInput.value = '';
            
            // Auto-remove the message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateX(100%)';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }
            }, 5000);
        });
    }
    
    // Validate the contact form before submission
    function validateContactForm(form) {
        let isValid = true;
        
        // Validate name
        const nameInput = form.querySelector('#name');
        if (!nameInput || !validateField(nameInput, 'Please enter your name', value => value.trim().length > 0)) {
            isValid = false;
        }
        
        // Validate email
        const emailInput = form.querySelector('#email');
        if (!emailInput || !validateField(emailInput, 'Please enter a valid email address', validateEmail)) {
            isValid = false;
        }
        
        // Validate message
        const messageInput = form.querySelector('#message');
        if (!messageInput || !validateField(messageInput, 'Please enter a message (at least 10 characters)', value => value.trim().length > 10)) {
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to validate a field with custom validation function
    function validateField(field, errorMessage, validationFn) {
        const value = field.value;
        
        if (!validationFn(value)) {
            showFormError(field, errorMessage);
            return false;
        } else {
            removeFormError(field);
            return true;
        }
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Show error message for a form field
    function showFormError(field, message) {
        // Remove any existing error message
        removeFormError(field);
        
        // Add error class to the field
        field.classList.add('error');
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        
        // Add error styles
        field.style.borderColor = 'var(--error-color)';
    }
    
    // Remove error message for a form field
    function removeFormError(field) {
        // Remove error class
        field.classList.remove('error');
        
        // Remove error style
        field.style.borderColor = '';
        
        // Find and remove any existing error message
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Add CSS for error messages
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: var(--error-color);
            font-size: 0.9rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        input.error, textarea.error, select.error {
            border-color: var(--error-color) !important;
        }
    `;
    document.head.appendChild(style);
});
