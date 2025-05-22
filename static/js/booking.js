/**
 * Booking Form Functionality
 * Handles date/time selection, form validation, and availability checking
 */

document.addEventListener('DOMContentLoaded', function() {
    // Booking form elements
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const projectTypeSelect = document.getElementById('project_type');
    const detailsTextarea = document.getElementById('details');
    const termsCheckbox = document.getElementById('terms');
    
    if (bookingForm) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        const todayFormatted = `${yyyy}-${mm}-${dd}`;
        if (dateInput) {
            dateInput.setAttribute('min', todayFormatted);
        }
        
        // Validate form on submission
        bookingForm.addEventListener('submit', function(event) {
            if (!validateBookingForm()) {
                event.preventDefault();
            }
        });
        
        // Add input listeners for real-time validation
        if (dateInput) {
            dateInput.addEventListener('change', function() {
                validateField(this, 'Please select a date', validateDate);
                
                // Simulate checking availability and updating time slots
                if (validateDate(this.value)) {
                    updateAvailableTimeSlots(this.value);
                }
            });
        }
        
        if (timeSelect) {
            timeSelect.addEventListener('change', function() {
                validateField(this, 'Please select a time', value => value.trim().length > 0);
            });
        }
        
        if (projectTypeSelect) {
            projectTypeSelect.addEventListener('change', function() {
                validateField(this, 'Please select a project type', value => value.trim().length > 0);
            });
        }
        
        if (detailsTextarea) {
            detailsTextarea.addEventListener('blur', function() {
                validateField(this, 'Please provide project details (at least 20 characters)', value => value.trim().length >= 20);
            });
        }
        
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', function() {
                validateField(this, 'You must agree to the terms and conditions', value => this.checked);
            });
        }
    }
    
    // Validate the booking form before submission
    function validateBookingForm() {
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (!nameInput || !validateField(nameInput, 'Please enter your name', value => value.trim().length > 0)) {
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        if (!emailInput || !validateField(emailInput, 'Please enter a valid email address', validateEmail)) {
            isValid = false;
        }
        
        // Validate date
        if (!dateInput || !validateField(dateInput, 'Please select a valid date', validateDate)) {
            isValid = false;
        }
        
        // Validate time
        if (!timeSelect || !validateField(timeSelect, 'Please select a time', value => value.trim().length > 0)) {
            isValid = false;
        }
        
        // Validate project type
        if (!projectTypeSelect || !validateField(projectTypeSelect, 'Please select a project type', value => value.trim().length > 0)) {
            isValid = false;
        }
        
        // Validate details
        if (!detailsTextarea || !validateField(detailsTextarea, 'Please provide project details (at least 20 characters)', value => value.trim().length >= 20)) {
            isValid = false;
        }
        
        // Validate terms checkbox
        if (!termsCheckbox || !validateField(termsCheckbox, 'You must agree to the terms and conditions', value => termsCheckbox.checked)) {
            isValid = false;
        }
        
        return isValid;
    }
    
    // Simulate updating available time slots based on selected date
    function updateAvailableTimeSlots(selectedDate) {
        if (!timeSelect) return;
        
        // Clear current options except the placeholder
        while (timeSelect.options.length > 1) {
            timeSelect.remove(1);
        }
        
        // Determine which time slots are "available" based on the day of week
        // This is just a simulation - in a real app, you would fetch availability from the server
        const date = new Date(selectedDate);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        
        const allTimeSlots = [
            { value: '09:00', text: '9:00 AM' },
            { value: '10:00', text: '10:00 AM' },
            { value: '11:00', text: '11:00 AM' },
            { value: '12:00', text: '12:00 PM' },
            { value: '13:00', text: '1:00 PM' },
            { value: '14:00', text: '2:00 PM' },
            { value: '15:00', text: '3:00 PM' },
            { value: '16:00', text: '4:00 PM' }
        ];
        
        // Weekends have fewer available slots (simulation)
        let availableSlots = allTimeSlots;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            // On weekends, only morning slots are "available"
            availableSlots = allTimeSlots.slice(0, 4);
        }
        
        // Random unavailable slots (simulation)
        const unavailableIndices = [];
        if (dayOfWeek % 2 === 0) {
            unavailableIndices.push(1, 3); // Make some slots unavailable on even days
        } else {
            unavailableIndices.push(2, 4); // Make different slots unavailable on odd days
        }
        
        // Add available time slots to the select
        availableSlots.forEach((slot, index) => {
            if (!unavailableIndices.includes(index)) {
                const option = document.createElement('option');
                option.value = slot.value;
                option.textContent = slot.text;
                timeSelect.appendChild(option);
            }
        });
        
        // Also add "booked" time slots as disabled options
        unavailableIndices.forEach(index => {
            if (index < availableSlots.length) {
                const slot = availableSlots[index];
                const option = document.createElement('option');
                option.value = slot.value;
                option.textContent = `${slot.text} (Booked)`;
                option.disabled = true;
                timeSelect.appendChild(option);
            }
        });
        
        // Sort the options by time
        sortSelectOptions(timeSelect);
    }
    
    // Helper function to sort select options
    function sortSelectOptions(selectElement) {
        const options = Array.from(selectElement.options);
        
        // Keep the placeholder as the first option
        const placeholder = options.shift();
        
        // Sort the remaining options
        options.sort((a, b) => {
            if (a.disabled && !b.disabled) return 1;
            if (!a.disabled && b.disabled) return -1;
            return a.value.localeCompare(b.value);
        });
        
        // Clear and rebuild the select
        selectElement.innerHTML = '';
        selectElement.appendChild(placeholder);
        
        options.forEach(option => {
            selectElement.appendChild(option);
        });
    }
    
    // Date validation function
    function validateDate(dateStr) {
        if (!dateStr) return false;
        
        const selectedDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to beginning of day
        
        return selectedDate >= today;
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
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
    
    // Show error message for a form field
    function showFormError(field, message) {
        // Remove any existing error message
        removeFormError(field);
        
        // Add error class to the field
        field.classList.add('error');
        
        // For checkboxes, find the parent label
        let targetElement = field;
        if (field.type === 'checkbox') {
            targetElement = field.parentNode;
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message after the field or its label
        targetElement.parentNode.insertBefore(errorDiv, targetElement.nextSibling);
        
        // Add error styles
        field.style.borderColor = 'var(--error-color)';
    }
    
    // Remove error message for a form field
    function removeFormError(field) {
        // Remove error class
        field.classList.remove('error');
        
        // Remove error style
        field.style.borderColor = '';
        
        // For checkboxes, find the parent label
        let targetElement = field;
        if (field.type === 'checkbox') {
            targetElement = field.parentNode;
        }
        
        // Find and remove any existing error message
        const errorDiv = targetElement.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
});
