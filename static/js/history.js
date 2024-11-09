// Function to show block details when clicked
function showBlockDetails(blockIndex) {
    // Get all the blocks and remove the 'active' class from all blocks
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block) {
        block.classList.remove('active');
    });

    // Add the 'active' class to the clicked block
    var selectedBlock = document.getElementById('block-' + blockIndex);
    selectedBlock.classList.add('active');

    // Fetch the block details dynamically from the page (or use actual data)
    var blockElement = selectedBlock;
    var blockData = `
        <p><strong>Block #${blockIndex}</strong></p>
        <p><strong>Hash:</strong> ${blockElement.querySelector('.block-hash').innerText}</p>
        <p><strong>Previous Hash:</strong> ${blockElement.querySelector('.block-previous-hash').innerText}</p>
        <p><strong>Data:</strong> ${blockElement.querySelector('.block-data').innerText}</p>
        <p><strong>Timestamp:</strong> ${blockElement.querySelector('.block-timestamp').innerText}</p>
    `;

    // Inject block details into the details container
    document.getElementById('block-detail-content').innerHTML = blockData;

    // Display the block details section
    document.getElementById('block-details').style.display = 'block';
}

// Function to close the block details view and unhighlight the block
function closeBlockDetails() {
    // Hide the block details section
    document.getElementById('block-details').style.display = 'none';

    // Remove the 'active' class from all blocks
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block) {
        block.classList.remove('active');
    });
}

function goToDashboard() {
    // Redirect to the history page
    window.location.href = '/';  // Adjust the URL to match your route
}
