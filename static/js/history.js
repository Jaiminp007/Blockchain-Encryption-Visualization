/**
 * Shows the details of a clicked block
 * @param {number} blockIndex - The index of the clicked block
 */
function showBlockDetails(blockIndex) {
    const selectedBlock = document.getElementById('block-' + blockIndex);
    const blockDetails = document.getElementById('block-details');
    
    // Add active class to the selected block
    selectedBlock.classList.add('active');

    const blockData = `
        <p><strong>Block #${blockIndex}</strong></p>
        <p><strong>Hash:</strong><br>${selectedBlock.querySelector('.block-hash').innerText}</p>
        <p><strong>Previous Hash:</strong><br>${selectedBlock.querySelector('.block-previous-hash').innerText}</p>
        <p><strong>Data:</strong><br>${selectedBlock.querySelector('.block-data').innerText}</p>
        <p><strong>Timestamp:</strong><br>${selectedBlock.querySelector('.block-timestamp').innerText}</p>
    `;

    document.getElementById('block-detail-content').innerHTML = blockData;
    blockDetails.style.display = 'block';
}

/**
 * Closes the block details view and removes active state from blocks
 */
function closeBlockDetails() {
    document.getElementById('block-details').style.display = 'none';
    
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => block.classList.remove('active'));
}

/**
 * Redirects to the dashboard (home) page
 */
function goToDashboard() {
    window.location.href = '/';
}

/**
 * Smoothly scrolls the blockchain container to the right
 */
function scrollRight() {
    document.getElementById('blockchain').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}

/**
 * Smoothly scrolls the blockchain container to the left
 */
function scrollLeft() {
    document.getElementById('blockchain').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}
