// Function to handle dynamic block layout (alternating directions)
function handleBlockLayout() {
    const container = document.getElementById("blockchain-container");
    const blocks = container.children; // Get all the block elements

    let rowCount = 0; // Keeps track of the row
    let blockCountInRow = 0; // Keeps track of blocks in the current row
    let blocksInRow = 6; // Number of blocks per row

    // Loop through all blocks
    Array.from(blocks).forEach((block, index) => {
        if (blockCountInRow === blocksInRow) {
            // Start a new row after 6 blocks
            rowCount++;
            blockCountInRow = 0;
        }

        // Alternate layout for rows
        if (rowCount % 2 === 0) {
            // Left to right
            block.style.marginTop = (rowCount * 160) + 'px'; // Add extra space between rows
            block.style.marginLeft = (blockCountInRow * 140) + 'px'; // Adjust horizontal position
        } else {
            // Right to left
            block.style.marginTop = (rowCount * 160) + 'px'; // Add extra space between rows
            block.style.marginLeft = ((blocksInRow - blockCountInRow - 1) * 140) + 'px'; // Reverse horizontal position
        }

        blockCountInRow++; // Move to the next position in the row
    });
}

// Function to show block details when clicked
function showBlockDetails(blockIndex) {
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block) {
        block.classList.remove('active');
    });

    var selectedBlock = document.getElementById('block-' + blockIndex);
    selectedBlock.classList.add('active');

    var blockElement = selectedBlock;
    var blockData = `
        <p><strong>Block #${blockIndex}</strong></p>
        <p><strong>Hash:</strong> ${blockElement.querySelector('.block-hash').innerText}</p>
        <p><strong>Previous Hash:</strong> ${blockElement.querySelector('.block-previous-hash').innerText}</p>
        <p><strong>Data:</strong> ${blockElement.querySelector('.block-data').innerText}</p>
        <p><strong>Timestamp:</strong> ${blockElement.querySelector('.block-timestamp').innerText}</p>
    `;

    document.getElementById('block-detail-content').innerHTML = blockData;
    document.getElementById('block-details').style.display = 'block';
}

// Function to close block details view
function closeBlockDetails() {
    document.getElementById('block-details').style.display = 'none';
    var blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block) {
        block.classList.remove('active');
    });
}

// Function to go back to the home page (Dashboard)
function goToDashboard() {
    window.location.href = '/';
}

// Run layout handler after the page has loaded
window.onload = function() {
    handleBlockLayout();  // Call function to arrange the blocks in the layout
};
