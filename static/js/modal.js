/**
 * Plugin Details Modal Functionality
 * Handles opening, closing, and populating the plugin details modal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('plugin-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalPluginImage = document.getElementById('modal-plugin-image');
    const modalPluginName = document.getElementById('modal-plugin-name');
    const modalPluginDescription = document.getElementById('modal-plugin-description');
    const modalPluginPrice = document.getElementById('modal-plugin-price');
    const modalPluginFeatures = document.getElementById('modal-plugin-features');
    const modalPluginSuitable = document.getElementById('modal-plugin-suitable');
    
    // Get all "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-plugin-details');
    
    // Function to open modal with plugin data
    function openPluginModal(pluginId) {
        // Fetch plugin data from the server
        fetch(`/get-plugin/${pluginId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Plugin data not found');
                }
                return response.json();
            })
            .then(plugin => {
                // Populate modal with plugin data
                modalPluginImage.src = plugin.image;
                modalPluginImage.alt = plugin.name;
                modalPluginName.textContent = plugin.name;
                modalPluginDescription.textContent = plugin.description;
                modalPluginPrice.textContent = plugin.price;
                
                // Clear and populate features list
                modalPluginFeatures.innerHTML = '';
                plugin.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalPluginFeatures.appendChild(li);
                });
                
                // Clear and populate suitable for list
                modalPluginSuitable.innerHTML = '';
                plugin.suitable_for.forEach(suitableFor => {
                    const li = document.createElement('li');
                    li.textContent = suitableFor;
                    modalPluginSuitable.appendChild(li);
                });
                
                // Show the modal with a fade-in effect
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            })
            .catch(error => {
                console.error('Error fetching plugin details:', error);
                alert('Could not load plugin details. Please try again later.');
            });
    }
    
    // Add click event listeners to all "View Details" buttons
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pluginCard = this.closest('.plugin-card');
            const pluginId = pluginCard.getAttribute('data-plugin-id');
            openPluginModal(pluginId);
        });
    });
    
    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing the Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Function to close the modal
    function closeModal() {
        // Add fade-out effect
        modal.style.opacity = '0';
        
        // After animation completes, hide the modal
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Re-enable body scrolling
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Handle plugin cards in the shop
    const pluginCards = document.querySelectorAll('.plugin-card');
    
    pluginCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Only open modal if the whole card is clicked, not buttons inside it
            if (!event.target.closest('.btn')) {
                const pluginId = this.getAttribute('data-plugin-id');
                openPluginModal(pluginId);
            }
        });
    });
});
