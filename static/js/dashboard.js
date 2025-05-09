/**
 * Shows a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success' or 'error')
 * @param {number} duration - How long to show the notification in milliseconds
 */
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    // Remove any existing type classes
    notification.classList.remove('success', 'error');
    // Add the new type class
    notification.classList.add(type);
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

/**
 * Handles the form submission
 * @param {Event} event - The form submission event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = formData.get('data');
    
    if (!data.trim()) {
        showNotification('Please enter some data for the block', 'error', 4000);
        return;
    }
    
    // Disable the submit button while processing
    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showNotification('✅ Block added successfully to the blockchain!', 'success');
            form.reset();
            // Reload the page after a short delay to show the new block
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showNotification('❌ Error: ' + (data.message || 'Failed to add block'), 'error', 5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('❌ Error: Could not connect to the server', 'error', 5000);
    })
    .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
    });
}

/**
 * Redirects to the transaction history page
 */
function goToHistory() {
    window.location.href = '/history';
}

// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addBlockForm');
    form.addEventListener('submit', handleFormSubmit);
});